import request, { headers } from './request'

export function list(data) {
	return request({
		url: '/screen/list',
		method: 'post',
		headers,
		data,
	})
}

export function destroy(data) {
	return request({
		url: '/screen/destroy',
		method: 'post',
		headers,
		data,
	})
}
