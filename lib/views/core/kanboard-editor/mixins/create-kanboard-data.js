import copy from 'fast-copy'
import isObjectString from '../../../../vendor/is-object-string'
import JSONStringify from '../../../../vendor/JSONStringify'
import format from 'date-fns/format'
import {store} from '../../../../store'

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
			const widgets = Object.values(widgetsAdded).map(({id, type, config, scene = 0}) => {
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
				return {
					id,
					scene,
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
