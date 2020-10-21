import request from './request'
import qs from 'qs'

// 查询看板列表
export function list (data) {
	return request({
		method: 'post',
		url: '/board/page',
		data:  qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function publish (data) {
	return request({
		method: 'post',
		url: '/board/publish',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
