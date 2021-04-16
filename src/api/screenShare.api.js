import request, { headers } from './request'

export function screenShareUse(data) {
	return request({
		url: '/screenShare/use',
		method: 'post',
		headers,
		data,
	})
}

export function screenShareLogin(data) {
	return request({
		url: '/screenShare/login',
		method: 'post',
		headers,
		data,
	})
}
