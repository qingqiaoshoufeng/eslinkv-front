import ESVHttpUtil from './httpUtil'

export function http(params, method = 'post', url, cancelRequest) {
	method = method.toLowerCase()
	let requestObj = {}
	requestObj.url = url
	requestObj.method = method
	requestObj.params = params
	requestObj.cancelRequest = cancelRequest || false
	let result
	switch (method) {
		case 'post':
			result = ESVHttpUtil.post(requestObj)
			break
		case 'postpaging':
			result = ESVHttpUtil.postPaging(requestObj)
			break
		case 'get':
			result = ESVHttpUtil.get(requestObj)
			break
		case 'request':
			result = ESVHttpUtil.request(requestObj)
			break
		default:
			break
	}
	return result
}
