import copy from 'fast-copy'
import isObjectString from '../../../../vendor/is-object-string'
import JSONStringify from '../../../../vendor/JSONStringify'
import format from 'date-fns/format'
import {store} from '../../../../store'
import commonConfigValue from '../../widgets/parts/lib/common-config-value'

function getAttr(o, str) {
	const arr = str.split('.')
	let res = o
	arr.forEach(v => {
		res = res[v]
	})
	return res
}

function checkAttr(o, str = '', defaultConfig) {
	for (const key in o) {
		const prop = str ? str + '.' + key : key
		if (Array.isArray(o[key]) && o[key].length > 0) {
			if (JSON.stringify(o[key]) === JSON.stringify(getAttr(defaultConfig, prop))) {
				o[key] = 'default'
			}
		} else if (Object.prototype.toString.call(o[key]) === '[object Object]') {
			if (JSON.stringify(o[key]) === JSON.stringify(getAttr(defaultConfig, prop))) {
				o[key] = 'default'
			} else {
				checkAttr(o[key], prop, defaultConfig)
			}
		}
	}
}

export default {
	methods: {
		prepareKanboardData() {
			const defaultConfig = commonConfigValue() // 读取默认配置
			const kanboard = this.platform.panelConfig
			const {size, info: {name, remark}} = kanboard
			delete size.preset
			if (size.range && !Object.values(size.range).find(item => item !== 0 && item !== '%')) {
				delete size.range
			}
			const widgetAdded = copy(this.widgetAdded)
			const widgets = Object.values(widgetAdded).map(({id, market = false, type, config, scene = 0}) => {
				const api = config.api
				if (api && api.data) {
					if (isObjectString(api.data)) {
						try {
							api.data = JSON.stringify(JSON.parse(api.data))
						} catch (e) {
							throw new Error(e)
						}
					}
				}
				checkAttr(config, '', defaultConfig)
				return {
					id,
					scene,
					type,
					market,
					value: {...config}
				}
			})
			const grids = copy(this.gridsAdded)
			const guides = this.guides
			const apis = this.apis
			return {
				name,
				remark,
				createTime: format(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
				attribute: JSONStringify({
					kanboard, // 看板画布配置
					widgets, // 小工具配置
					apis, // 全局数据源配置
					grids, // 布局格子
					scene: store.scene.obj, // 场景
					guides // 参考线
				})
			}
		}
	}
}
