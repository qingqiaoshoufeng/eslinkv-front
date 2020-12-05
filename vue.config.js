const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// 引入等比适配插件
// const px2rem = require('postcss-px2rem-include');
// 配置基本大小
// const postcss = px2rem({
//     // 基准大小 baseSize，需要和rem.js中相同
//     remUnit: 16,
//     include: 'src/pages/Map'
// });
const needReport = false
module.exports = {
	transpileDependencies:['@simonwep','vue-draggable-resizable-gorkys2','swiper','dom7'],
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: true,
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        disableHostCheck: true,
        proxy: {
            '^/hangran': {
                target: 'http://ebp-pc.hzrq.local:15003',
                changeOrigin: true,
                headers: {
                    Cookie: 'SESSION=b3b8b8a6-0794-4fb3-88a1-d9654d66d417'
                },
                pathRewrite: {
                    '^/hangran': '/'
                }
            },
            '^/api': {
                target: 'http://ebp-pc.hzrq.local:15003',
                changeOrigin: true,
                headers: {
                    Cookie: 'SESSION=b3b8b8a6-0794-4fb3-88a1-d9654d66d417'
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
        // loaderOptions: {
        //     postcss: {
        //         plugins: [postcss],
        //     },
        // },
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
            // config.optimization = {
            //     runtimeChunk: 'single',
            //     splitChunks: {
            //         chunks: 'all',
            //         maxInitialRequests: Infinity,
            //         minSize: 20000,
            //         cacheGroups: {
            //             vendor: {
            //                 test: /[\\/]node_modules[\\/]/,
            //                 name(module) {
            //                     // get the name. E.g. node_modules/packageName/not/this/part.js
            //                     // or node_modules/packageName
            //                     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            //                     // npm package names are URL-safe, but some servers don't like @ symbols
            //                     return `npm.${packageName.replace('@', '')}`
            //                 }
            //             }
            //         }
            //     }
            // }
        }
		config.entry.app = ["babel-polyfill", "./src/main.ts"];
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
		config.entry.app = ["babel-polyfill", "./src/main.ts"];

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



