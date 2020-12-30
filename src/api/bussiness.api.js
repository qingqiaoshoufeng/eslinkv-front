import request from './request'

const HANGRANURL = '/server'
const DATAURL = '/data'

// 获取行业用气量对比类型
export function businessAnalysisType(data) {
	return request({
		url:  `${HANGRANURL}/businessAnalysis/type`,
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取杭燃当前时间
export function year(data) {
	return request({
		url: `${HANGRANURL}/businessAnalysis/year`,
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取一级分类列表
export function getLevel0() {
	return request({
		url:`${DATAURL}/componentType/getLevel0`,
		method: 'get',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取所有组件列表
export function getCompListAll(data) {
	return request({
		url:`${DATAURL}/comp/list`,
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取组件列表
export async function getCompList(data) {
	const res = await request({
		url: `${DATAURL}/componentType/list`,
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
	res.forEach(v => {
		v.label = v.componentTypeName
		v.type = v.componentTypeEnName
		v.widgets.forEach(w => {
			w.label = w.componentTitle
			w.type = w.componentEnTitle
			w.config =  {
				layout: {
					size: {
						width: 480,
						height: 226
					},
					position: {
						value: 'relative'
					}
				}
			}
		})
	})
	return res
}
