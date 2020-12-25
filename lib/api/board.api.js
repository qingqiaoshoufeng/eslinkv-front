import request, {baseURL} from './request'
import qs from 'qs'
import {setDefault} from '../utils'

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

export async function detail(data) {
	let originData = await request({
		url: `${baseURL}/board/detail`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	const res = JSON.parse(originData.attribute)
	res.widgets.forEach(v => {
		setDefault(v.value)
	})
	return {
		...originData,
		attribute: JSON.stringify(res)
	}
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

