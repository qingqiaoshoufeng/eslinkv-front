const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false
module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: true,
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://ebp-pc.hw-qa.eslink.net.cn',
                changeOrigin: true,
                headers: {
                    Cookie: 'SESSION=d6c83c5e-dc12-4a22-95be-95045bfa4ffb'
                },
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/hangran': {
                target: 'http://192.168.1.33:9082',
                changeOrigin: true,
                pathRewrite: {
                    '^/hangran': '/'
                }
            },
            '/data': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': '/'
                }
            },
            '/cdn': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/cdn': '/'
                }
            }

        }
    },
    css: {
        extract: false,
        sourceMap: false,
        loaderOptions: {},
        modules: false
    },
    configureWebpack: config => {
        if (isProduction) {
            config.mode = 'production'
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: /.js|\.html|.json$|.css/,
                threshold: 10240,
                minRatio: 0.8
            }))
            config.optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                }
            }
        }
        config.resolve.extensions = [".js", ".vue", ".json", ".ts", ".tsx"]
        config.externals = [
            {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'echarts': 'echarts'
            }
        ]
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('iview')
            .loader('iview-loader')
            .options({ prefix: false })
        config.resolve.alias
            .set('@lib', path.resolve(__dirname, './lib'));
        if (isProduction) {
            if (needReport) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end()
            }
            config.plugins.delete('prefetch')
        } else {
            config.resolve.symlinks(true)
        }
    },
}
