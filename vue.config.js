const pkg = require('./package.json')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	publicPath: isProduction ? `https://cdn.shenzhepei.com/VF/prod/${pkg.version}/` : `/`,
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
		config.plugins.push(new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'node_modules/esvcp-pc-ui/esvcp-pc-ui/assets'),
					to: 'esvcp-pc-ui/assets'
				}
			]
		}))
	},
	chainWebpack: config => {
		if (isProduction) {
			if (needReport) {
				config
					.plugin('webpack-bundle-analyzer')
					.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
					.end()
			}
			config.plugins.delete('prefetch')
		}
	},
}
