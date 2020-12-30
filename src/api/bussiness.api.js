import request from './request'
const HANGRANURL = '/server'

// 获取行业用气量对比类型
export function businessAnalysisType(data) {
	return request({
		url: HANGRANURL + '/businessAnalysis/type',
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
		url: HANGRANURL + '/businessAnalysis/year',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取组件列表
export async function getCompList (data) {
	const res = await request({
		url: 'http://10.20.9.40:7001/compType/list',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
	res.forEach(v => {
		v.label = v.name
		v.type = '0'
		v.widgets.forEach(w => {
			w.label = w.title
			w.type = w.componentId
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
