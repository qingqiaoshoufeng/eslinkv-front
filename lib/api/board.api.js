import request, {baseURL} from './request'
import qs from 'qs'
import commonConfigValue from '../views/core/widgets/parts/lib/common-config-value'

function getAttr (o, str) {
	const arr = str.split('.')
	let res = o
	arr.forEach(v => {
		res = res[v]
	})
	return res
}
function setDefault (o, str = '', defaultConfig) {
	for (const key in o) {
		const prop = str ? str + '.' + key : key
		if (Object.prototype.toString.call(o[key]) === '[object Object]') {
			setDefault(o[key], prop, defaultConfig)
		} else if (o[key] === 'default') {
			o[key] = JSON.parse(JSON.stringify(getAttr(defaultConfig, prop)))
		}
	}
}

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
	const defaultConfig = commonConfigValue() // 读取默认配置
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
		setDefault(v.value, '', defaultConfig)
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

