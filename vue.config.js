const pkg = require('./package.json')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	transpileDependencies: ['@simonwep', 'dom7'],
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
			'^/etbc': {
				target: 'http://ebp-pc.hzrq.local:15003',
				headers: {
					Cookie: 'SESSION=96312c36-26ad-4f3f-8f25-cb690f3a9edb',
				},
				changeOrigin: true,
				pathRewrite: {
					'^/etbc': '/',
				},
			},
			'^/node': {
				// target: 'http://127.0.0.1:7001',
				target: 'http://eslinkv.eslink.cc',
				// target: 'http://192.168.1.44:2000',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/node': '/',
				// },
			},
			'^/cdn': {
				// target: 'http://127.0.0.1:7001',
				target: 'http://eslinkv.eslink.cc',
				// target: 'http://192.168.1.44:2000',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/cdn': '/',
				// },
			},
			'^/server': {
				target: 'http://eslinkv.eslink.cc',
				// target: 'http://192.168.1.44:2000',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/server': '/',
				// },
			},
			'^/pipenetwork': {
				// target: 'http://192.168.1.104:6080',
				target: 'http://192.168.1.44:2000',
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
					isProduction ? '.min.js' : '.js',
				),
				'process.env.BUILD_MODE': JSON.stringify(
					process.env.BUILD_MODE,
				),
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
