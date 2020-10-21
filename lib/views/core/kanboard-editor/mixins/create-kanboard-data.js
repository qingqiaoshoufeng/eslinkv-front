import copy from 'fast-copy'
import isObjectString from '../../../../vendor/is-object-string'
import JSONStringify from '../../../../vendor/JSONStringify'
import format from 'date-fns/format'

export default {
	methods: {
		prepareKanboardData() {
			const kanboard = copy(this.canvasConfigValue)

			const {size, info: {name, remark}} = kanboard
			delete size.preset
			if (size.range && !Object.values(size.range).find(item => item !== 0 && item !== '%')) {
				delete size.range
			}

			const widgetsAdded = copy(this.widgetsAdded)

			const widgets = Object.values(widgetsAdded).map(({id, type, config}) => {
				const api = config.api
				if (api && api.data) {
					if (isObjectString(api.data)) {
						try {
							api.data = JSON.stringify(JSON.parse(api.data))
						} catch (e) {
						}
					}
				}
				return {
					id,
					type,
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
					// 看板画布配置
					kanboard,
					// 小工具配置
					widgets,
					// 全局数据源配置
					apis,
					// 布局格子
					grids,
					// 参考线
					guides
				})
			}
		}
	}
}
