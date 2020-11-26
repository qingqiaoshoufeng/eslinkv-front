import request, {baseURL} from './request'
import qs from "qs";

// 项目列表，不分页
export function getProList() {
	return request({
		url: `${baseURL}/project/list`,
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 查询当前项目下的数据库列表
export function getProDatabaseList(data) {
	return request({
		url: `${baseURL}/project/databaseList`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 查询当前数据库下的数据表列表
export function getDatabaseTableList(data) {
	return request({
		url: `${baseURL}/database/tableList`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 数据表详情
export function getTableDetail(data) {
	return request({
		url: `${baseURL}/table/detail`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 获取数据源列表
export function getSourceList(data) {
	return request({
		url: `${baseURL}/source/list`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 查询以保存的分析列表
export function getAnalyseList(data) {
	return request({
		url: `${baseURL}/analyse/list`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 获取schema列表
export function getSchemaList(data) {
	return request({
		url: `${baseURL}/source/schema/list`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 获取数据源数据表
export function getSourceTableList(data) {
	return request({
		url: `${baseURL}/source/table/list`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 获取数据源表字段详情
export function getSourceTableDetail(data) {
	return request({
		url: `${baseURL}/source/table/detail`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 获取数据源数据库列表
export function getSourceDatabaseList(data) {
	return request({
		url: `${baseURL}/source/database/list`,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function databaseQuery(params, method, url) {
	return request({
		url: `${baseURL}/${url}`,
		method: method,
		data: qs.stringify(params),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}