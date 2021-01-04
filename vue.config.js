const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false
module.exports = {
    transpileDependencies: ['@simonwep', 'vue-draggable-resizable-gorkys2', 'swiper', 'dom7'],
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        disableHostCheck: true,
        proxy: {
            '^/hangran': {
                target: 'http://ebp-pc.hw-qa.eslink.net.cn',
                // target: 'http://ebp-pc.hzrq.local:15003',
                changeOrigin: true,
                headers: {
                    Cookie: 'SESSION=d6c83c5e-dc12-4a22-95be-95045bfa4ffb'
                    // Cookie: 'SESSION=e27f5a06-e5f2-4af8-aa52-0fcf051f912b'
                },
                pathRewrite: {
                    '^/hangran': '/'
                }
            },
            '^/api': {
                target: 'http://ebp-pc.hw-qa.eslink.net.cn',
                // target: 'http://ebp-pc.hzrq.local:15003',
                changeOrigin: true,
                headers: {
                    Cookie: 'SESSION=d6c83c5e-dc12-4a22-95be-95045bfa4ffb'
                    // Cookie: 'SESSION=e27f5a06-e5f2-4af8-aa52-0fcf051f912b'
                },
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '^/data': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': '/'
                }
            },
            '^/cdn': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/cdn': '/'
                }
            },
            '^/server': {
                target: 'http://192.168.1.33:9082',
                changeOrigin: true,
                pathRewrite: {
                    '^/server': '/'
                }
            }
        }
    },
    css: {
        extract: false,
        sourceMap: false,
        modules: false,
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
        }
        config.resolve.extensions = [".js", ".vue", ".json", ".ts", ".tsx"]
        config.externals = [
            {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vue-class-component': 'VueClassComponent',
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
        config.module
            .rule("view-design")  //  我目前用的是新版本的iview ,旧版本的iview，用iview代替view-design
            .test(/view-design.src.*?js$/)
            .use("babel")
            .loader("babel-loader")
            .end()
    },
}



