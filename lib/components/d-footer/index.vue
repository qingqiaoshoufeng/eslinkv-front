<template lang="pug">
	.d-detail
		.d-footer.fn-flex(v-if="show")
			.d-footer-left.fn-flex
				span.d-footer-title {{ platform.info ? platform.info.name : '' }}
			.d-footer-right.fn-flex
				i-button(@click="exit") 返回
				i-button(@click="preview") 预览
				i-button(type="primary" @click="editBoard" :loading="loading") 保存
				i-button(@click="publishBoard" :loading="loading" v-if="!isNew") 发布
				i-button(@click="handleExport" :loading="loading") 导出
				i-button(@click="importModal=true" :loading="loading") 导入
			load-mask(:show="saving") 正在保存数据…
			Modal(v-model="importModal")
				Form
					FormItem
						label(for="originFile" class="style-file-input") 全覆盖导入
						input.fn-hide#originFile(type="file" accept="application/json" @change="handleFile")
</template>
<script lang="ts">
	import {Component, Prop} from 'vue-property-decorator'
	import {Icon, Button, Modal, Form, FormItem} from 'view-design'
	import copy from 'fast-copy'
	import format from 'date-fns/format'
	import {mixins} from 'vue-class-component'
	import platform from '../../store/platform.store'
	import scene from '../../store/scene.store'
	import commonConfigValue from '../../views/core/widgets/parts/lib/common-config-value'
	import {isObjectString} from '../../utils'
	import loadMask from '../load-mask'
	import importMx from './import.mx'
	import exportMx from './export.mx'
	import publishMx from './publish.mx'
	import detailMx from './detail.mx'
	import saveMx from './save.mx'

	@Component({
		components: {
			'i-icon': Icon,
			'i-button': Button,
			loadMask,
			Modal,
			Form,
			FormItem,
		},
	})
	export default class DFooter extends mixins(exportMx, detailMx, saveMx, importMx, publishMx) {
		@Prop(Boolean) kanboardEdited: boolean
		@Prop({default: true}) show: boolean  // detail,full,local 隐藏该模块
		@Prop({default: 0}) type: number  // 数据类型：0:看板, 1:小工具模板, 2:参考线模板

		platform = platform.state
		scene = scene.state
		saving: boolean = false
		loading = false
		isNew = true

		preview() {
			document.body.requestFullscreen()
			this.$router.push('/preview')
		}

		exit() {
			if (this.kanboardEdited) {
				this.$Modal.confirm({
					title: '提示',
					content: '看板已编辑，关闭窗口将丢失未保存的数据，确认关闭吗？',
					onOk: () => {
						this.$router.replace({name: 'big-data-list'})
					}
				})
				return
			}
			this.$router.go(-1)
		}

		getAttr(o, str) {
			const arr = str.split('.')
			let res = o
			arr.forEach(v => {
				res = res[v]
			})
			return res
		}

		checkAttr(o, str = '', defaultConfig) {
			for (const key in o) {
				const prop = str ? str + '.' + key : key
				if (Array.isArray(o[key]) && o[key].length > 0) {
					if (JSON.stringify(o[key]) === JSON.stringify(this.getAttr(defaultConfig, prop))) {
						o[key] = 'default'
					}
				} else if (Object.prototype.toString.call(o[key]) === '[object Object]') {
					if (JSON.stringify(o[key]) === JSON.stringify(this.getAttr(defaultConfig, prop))) {
						o[key] = 'default'
					} else {
						this.checkAttr(o[key], prop, defaultConfig)
					}
				}
			}
		}

		platFormData() {
			const defaultConfig = commonConfigValue() // 读取默认配置
			const panelConfig = this.platform.panelConfig
			const {size, info: {name, remark}} = panelConfig
			delete size.preset
			if (size.range && !Object.values(size.range).find(item => item !== 0 && item !== '%')) {
				delete size.range
			}
			const widgetAdded = copy(this.platform.widgetAdded)
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
				this.checkAttr(config, '', defaultConfig)
				return {
					id,
					scene,
					type,
					market,
					value: {...config}
				}
			})

			// todo 参考线数据放入store，获取store中的数据
			// const guides = this.guides
			const guides = []
			return {
				name,
				remark,
				createTime: format(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
				attribute: JSON.stringify({
					kanboard: panelConfig, // 看板画布配置
					widgets, // 小工具配置
					apis: [], // 全局数据源配置
					grids: {}, // 布局格子
					scene: this.scene.obj, // 场景
					guides // 参考线
				})
			}
		}

		mounted() {
			const {params: {id}} = this.$route
			this.isNew = !id
			// todo 通过name/id 判断是否是new/edit/local/full/detail 显示不同的button
		}
	}
</script>
<style lang="scss" scoped>
	.d-footer {
		width: 100%;
		height: 50px;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;

		/deep/ button {
			margin-left: 10px;
		}

		.d-footer-left, .d-footer-right {
			align-items: center;

			.return {
				margin-left: 0;
			}
		}

		.doc-link {
			align-items: center;
		}

		.d-footer-left {
			.d-footer-title {
				font-size: 15px;
				padding: 0 15px 0 0;
			}
		}
	}
</style>
