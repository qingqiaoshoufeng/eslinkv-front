const pkg = require('./package.json')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	transpileDependencies: ['@simonwep', 'swiper', 'dom7'],
	assetsDir: 'static',
	publicPath: '/',
	outputDir: 'dist',
	indexPath: './index.html',
	productionSourceMap: false,
	lintOnSave: false,
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		historyApiFallback: true,
		disableHostCheck: true,
		overlay: {
			warning: false,
			errors: false,
		},
		proxy: {
			'^/node': {
				// target: 'http://127.0.0.1:7001',
				target: 'http://eslinkv.eslink.cc',
				// target: 'http://10.30.3.156:7001',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/node': '/',
				// },
			},
			'^/cdn': {
				// target: 'http://127.0.0.1:7001',
				target: 'http://eslinkv.eslink.cc',
				// target: 'http://10.30.3.156:7001',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/cdn': '/',
				// },
			},
			'^/server': {
				// target: 'http://192.168.1.33:9082',
				// target: 'http://10.20.10.154:3000',
				target: 'http://yapi.eslink.com/mock/674/hangzhouranqi',
				changeOrigin: true,
				pathRewrite: {
					'^/server': '/',
				},
			},
			'^/pipenetwork': {
				// target: 'http://192.168.1.104:6080',
				target: 'http://10.20.10.154:3000',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/pipenetwork': '/',
				// },
			},
		},
	},
	css: {
		sourceMap: false,
		extract: true,
	},
	configureWebpack: config => {
		config.optimization = {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'all',
						test: /node_modules/,
						name: 'vendor',
						minChunks: 1,
						maxInitialRequests: 5,
						minSize: 0,
						maxSize: 1024 * 200,
						priority: 100,
					},
					common: {
						chunks: 'all',
						test: /[\\/]src[\\/]js[\\/]/,
						name: 'common',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 60,
					},
					styles: {
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
						chunks: 'all',
						enforce: true,
					},
					runtimeChunk: {
						name: 'manifest',
					},
				},
			},
		}
		if (isProduction) {
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							drop_debugger: true,
							drop_console: true,
							pure_funcs: ['console.log'],
						},
					},
					sourceMap: false,
					parallel: true,
				}),
			)
		}
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.version': JSON.stringify(pkg.version),
				'process.env.staticVuePath': JSON.stringify(
					isProduction ? 'vue.min.js' : 'vue.js',
				),
				'process.env.BUILD_MODE': JSON.stringify(
					process.env.BUILD_MODE,
				),
				'process.env.staticPath': JSON.stringify(''),
			}),
		)
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
		config.externals = [
			{
				vue: 'Vue',
				'vue-router': 'VueRouter',
				'vue-class-component': 'VueClassComponent',
				echarts: 'echarts',
			},
		]
	},
	chainWebpack: config => {
		config.module
			.rule('vue')
			.use('iview')
			.loader('iview-loader')
			.options({ prefix: false })
		if (isProduction) {
			if (needReport) {
				config
					.plugin('webpack-bundle-analyzer')
					.use(
						require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
					)
					.end()
			}
			config.plugins.delete('prefetch')
			config.plugins.delete('preload')
		} else {
			config.resolve.symlinks(true)
		}
		config.module
			.rule('view-design')
			.test(/view-design.src.*?js$/)
			.use('babel')
			.loader('babel-loader')
			.end()
		config.module
			.rule('md')
			.test(/\.md$/)
			.use('html-loader')
			.loader('html-loader')
			.end()
			.use('markdown-loader')
			.loader('markdown-loader')
			.end()
	},
}
