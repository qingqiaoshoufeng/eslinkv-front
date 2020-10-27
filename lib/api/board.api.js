import request from './request'
import qs from 'qs'

export function add(data) {
	return request({
		url: '/board/save',
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function detail(data) {
	return request({
		url: '/board/detail',
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function update(data) {
	return request({
		url: '/board/update',
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

