import request, {baseURL} from './request'
import qs from 'qs'

export function add(data) {
	return request({
		url: `${baseURL}/board/save`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function detail(data) {
	return request({
		url: `${baseURL}/board/detail`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function update(data) {
	return request({
		url: `${baseURL}/board/update`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function hangran() {
	return request({
		url: `/data/test/hangran`,
		method: 'get',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

