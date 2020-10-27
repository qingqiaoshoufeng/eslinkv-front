import request from './request'

export function post(data) {
	return request.post(
		'/oss/delete',
		data
	)
}
