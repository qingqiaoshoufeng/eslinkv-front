import {ESVHttpUtil} from 'esvcp-pc'
import {Message} from 'view-design'
// import Vue from 'vue'
import axios from 'axios'
const TIMEOUT = 120 * 1000

axios.defaults.timeout = TIMEOUT
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? '/api' : ''
// 处理展示错误信息
const handleShowErrorMessage = (params, message) => {
	if (!Vue.prototype.$common.getPramVal('hideMessage', params)) {
		Vue.prototype.$Message.error(message)
	}
}

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	(config) => {
		config.data = {
			...config.data
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 返回状态判断(添加响应拦截器)
// 接口异常默认调用 Message.error()，若不需要异常提示，请携带hideMessage参数
axios.interceptors.response.use(
	(res) => {
		let data = res.data
		let code = data.responseCode
		let config = res.config
		// 获取数据流
		if (!code) {
			if (data && data.size > 0) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		} else {
			// 通用请求
			switch (code) {
				case '100000':
					return Promise.resolve(data)
				case '101002':
					Message.error(data.message)
					// if (window.top.host == 'etbc.hw-qa.eslink.net.cn') {
					//   window.top.location.href = process.env.SESSION_INVALID_URL
					// } else {
					//   window.top.location.href = 'http://etbc.hw-qa.eslink.net.cn/#/'
					// }
					return Promise.reject(data)
				default:
					handleShowErrorMessage(config.data, data.message)
					return Promise.reject(data)
			}
		}
	},
	(error) => {
		let config = error.config
		let data = {
			responseCode: '555555',
			args: '',
			result: {},
			message: error.code === 'ECONNABORTED' ? '请求超时，请稍后再试' : '网络异常，请稍后再试'
		}
		handleShowErrorMessage(config.data, data.message)
		return Promise.reject(data)
	}
)
export default ESVHttpUtil
