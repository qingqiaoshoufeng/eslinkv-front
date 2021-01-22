const path = require('path')
const pkg = require('./package.json')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false

module.exports = {
	transpileDependencies: [
		'@simonwep',
		'vue-draggable-resizable-gorkys2',
		'swiper',
		'dom7',
	],
	assetsDir: 'static',
	publicPath: isProduction ? `./${pkg.version}` : './',
	outputDir: `dist/${pkg.version}`,
	indexPath: '../index.html',
	productionSourceMap: false,
	lintOnSave: false,
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		disableHostCheck: true,
		proxy: {
			'^/hangran': {
				// target: 'http://ebp-pc.hw-qa.eslink.net.cn',
				target: 'http://ebp-pc.hzrq.local:15003',
				changeOrigin: true,
				headers: {
					// Cookie: 'SESSION=d6c83c5e-dc12-4a22-95be-95045bfa4ffb'
					Cookie: 'SESSION=951dde65-40c7-4afc-ad9e-f28a68a0dcac',
				},
				pathRewrite: {
					'^/hangran': '/',
				},
			},
			'^/api': {
				// target: 'http://ebp-pc.hw-qa.eslink.net.cn',
				target: 'http://ebp-pc.hzrq.local:15003',
				changeOrigin: true,
				headers: {
					// Cookie: 'SESSION=d6c83c5e-dc12-4a22-95be-95045bfa4ffb'
					Cookie: 'SESSION=951dde65-40c7-4afc-ad9e-f28a68a0dcac',
				},
				pathRewrite: {
					'^/api': '/',
				},
			},
			'^/data': {
				target: 'http://127.0.0.1:7001',
				changeOrigin: true,
				pathRewrite: {
					'^/data': '/',
				},
			},
			'^/cdn': {
				target: 'http://127.0.0.1:7001',
				changeOrigin: true,
				pathRewrite: {
					'^/cdn': '/',
				},
			},
			'^/server': {
				target: 'http://192.168.1.33:9082',
				changeOrigin: true,
				pathRewrite: {
					'^/server': '/',
				},
			},
			'^/pipenetwork': {
				target: 'http://192.168.1.104:6080',
				changeOrigin: true,
				pathRewrite: {
					'^/pipenetwork': '/',
				},
			},
		},
	},
	css: {
		extract: false,
		sourceMap: false,
		modules: false,
	},
	configureWebpack: (config) => {
		if (isProduction) {
			config.mode = 'production'
			config.plugins.push(
				new CompressionWebpackPlugin({
					algorithm: 'gzip',
					test: /.js|\.html|.json$|.css/,
					threshold: 10240,
					minRatio: 0.8,
				})
			)
		}
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
		config.externals = [
			{
				vue: 'Vue',
				'vue-router': 'VueRouter',
				'vue-class-component': 'VueClassComponent',
				echarts: 'echarts',
			},
		]
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.staticPath': JSON.stringify(isProduction ? `/${pkg.version}` : ''),
				'process.env.staticVuePath': JSON.stringify(isProduction ? 'vue.min.js' : 'vue.js')
			})
		)
	},
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('iview')
			.loader('iview-loader')
			.options({prefix: false})
		config.resolve.alias.set('@lib', path.resolve(__dirname, './lib'))
		if (isProduction) {
			if (needReport) {
				config
					.plugin('webpack-bundle-analyzer')
					.use(
						require('webpack-bundle-analyzer').BundleAnalyzerPlugin
					)
					.end()
			}
			config.plugins.delete('prefetch')
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
