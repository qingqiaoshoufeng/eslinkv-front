import request, { headers } from './request'

// 登陆
export function login(data) {
	return request({
		url: '/user/login',
		method: 'post',
		headers,
		data,
	})
}

// 登出
export function logout() {
	return request({
		url: '/user/logout',
		method: 'post',
		headers,
	})
}

// 修改密码
export function update(data) {
	return request({
		url: '/user/update',
		method: 'post',
		headers,
		data,
	})
}

// 个人信息详情
export function detail() {
	return request({
		url: '/user/detail',
		method: 'post',
		headers,
	})
}

// 获取子账号列表
export function childList() {
	return request({
		url: '/user/child/all',
		method: 'post',
		headers,
	})
}
