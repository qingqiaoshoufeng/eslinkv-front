<template lang="pug">
	.d-footer.fn-flex
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
	import { Component, Prop} from 'vue-property-decorator'
	import {Icon, Button, Modal, Form, FormItem} from 'view-design'
	import platform from '../../store/platform.store'
	import scene from '../../store/scene.store'
	import commonConfigValue from '../../views/core/widgets/parts/lib/common-config-value'
	import copy from 'fast-copy'
	import format from 'date-fns/format'
	import {isObjectString} from '../../utils'
	import loadMask from '../load-mask'
	import exportMx from './export.mx'
	import detailMx from './detail.mx'
	import {mixins} from 'vue-class-component'

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
	export default class DFooter extends mixins(exportMx,detailMx) {
		@Prop(Boolean) kanboardEdited: boolean
		@Prop({default: true}) show: boolean  // detail,full,local 隐藏该模块

		platform = platform.state
		scene = scene.state
		importModal: boolean = false
		saving: boolean = false
		loading = false
		isNew = true

		handleFile(e) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = e => {
				try {
					this.loading = true;
					const result = JSON.parse(e.target.result);
					const {data, createTime, name} = result;
					this.$parent.renderByDetail({name, attribute: data, createTime});
					this.importModal = false
					this.loading = false;
				} catch (e) {
					this.$Message.error('配置文件识别失败');
				}
			};
			reader.onerror = () => {
				this.$Message.error('配置文件识别失败');
			};
			reader.readAsText(file);
		}

		publishBoard() {
			if (this.kanboardEdited) {
				this.$Message.warning('请先保存看板！')
				return
			}
			this.$Modal.confirm({
				title: '提示',
				content: '确认发布此看板吗？',
				loading: true,
				onOk: () => {
					console.log(this.$parent)
					this.$api.board.publish({id: this.$parent.kanboardId}).then(res => {
						if (res.responseCode == 100000) {
							this.$Message.success('发布成功！')
							this.$emit('update-kanboard-list')
							this.exit()
						}
						this.$Modal.remove()
					}).catch((err) => {
						this.$Modal.remove()
					});
				}
			})
		}

		// 新建看板
		saveBoard(data) {
			this.loading = true;
			this.$api.board
				.add(data)
				.then(res => {
					this.kanboardEdited = false;
					this.$Message.success('保存成功！');
					this.loading = false;
					this.$router.back();
				})
				.catch(() => {
					this.loading = false;
				});
		}

		async addBoard() {
			const data = this.platFormData()
			// 数据类型：0:看板, 1:小工具模板, 2:参考线模板
			data.type = 0;
			this.$Modal.confirm({
				title: '快照',
				content: '是否创建看板快照？',
				onOk: async () => {
					const snapshot = await this.capture({
						selector: '#kanban',
					}).catch(e => {
						console.warn('快照创建失败', e);
					});
					if (snapshot) data.snapshot = snapshot;
					this.saveBoard(data);
				},
				onCancel: () => {
					this.saveBoard(data);
				},
				okText: '创建',
				cancelText: '跳过',
			});
		}

		// 修改看板
		editBoard() {
			if (this.isNew) {
				this.addBoard()
				return
			}
			const data = this.platFormData()
			this.$Modal.confirm({
				title: '快照',
				content: '是否更新看板快照？',
				onOk: async () => {
					const snapshot = await this.capture({selector: '#kanban'}).catch(e => {
						console.warn('快照创建失败', e)
					})
					if (snapshot) data.snapshot = snapshot
					this.submitKanboard(data)
				},
				onCancel: () => {
					this.submitKanboard(data)
				},
				okText: '更新',
				cancelText: '跳过'
			})
		}

		submitKanboard(data) {
			this.saving = true
			const {params: {id}} = this.$route
			data.type = 0 // 数据类型：0:看板, 1:小工具模板, 2:参考线模板
			this.$api.board.update({...data, id}).then((res) => {
				this.kanboardEdited = false
				this.$Message.success('修改成功')
				this.loading = false
				this.saving = false
			}).catch(() => {
				this.loading = false
				this.saving = false
			})
		}

		preview() {
			this.$emit('previewOpen')
			const data = this.platFormData().attribute
			this.$router.push({name: this.isNew ? 'big-data-new-preview' : 'big-data-edit-preview', params: {data}})
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
