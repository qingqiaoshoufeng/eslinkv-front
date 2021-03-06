import request, { headers } from './request'

export function create(data) {
	return request({
		url: '/market/component/create',
		method: 'post',
		data,
		headers,
	})
}

export function update(data) {
	return request({
		url: '/market/component/update',
		method: 'post',
		data,
		headers,
	})
}

export function destroy(data) {
	return request({
		url: '/market/component/destroy',
		method: 'post',
		data,
		headers,
	})
}

export function list(data) {
	return request({
		url: '/market/component/list',
		method: 'post',
		data,
		headers,
	})
}

export function checkList(data) {
	return request({
		url: '/market/component/checkList',
		method: 'post',
		data,
		headers,
	})
}

export function recycleList(data) {
	return request({
		url: '/market/component/recycleList',
		method: 'post',
		data,
		headers,
	})
}

export function checkHistoryList(data) {
	return request({
		url: '/market/component/checkHistoryList',
		method: 'post',
		data,
		headers,
	})
}

export function typeList(data) {
	return request({
		url: '/market/component/typeList',
		method: 'post',
		data,
		headers,
	})
}

export function detail(data) {
	return request({
		url: '/market/component/detail',
		method: 'post',
		data,
		headers,
	})
}

export function checkSuccess(data) {
	return request({
		url: '/market/component/checkSuccess',
		method: 'post',
		data,
		headers,
	})
}

export function checkError(data) {
	return request({
		url: '/market/component/checkError',
		method: 'post',
		data,
		headers,
	})
}

export function getVersionList(data) {
	return request({
		url: '/market/component/version',
		method: 'post',
		data,
		headers,
	})
}

export function use(data) {
	return request({
		url: '/market/component/use',
		method: 'post',
		data,
		headers,
	})
}
