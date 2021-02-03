<template>
	<div class="sidebar-tools" @click.stop>
		<!-- 画布全屏 -->
		<d-right-full-screen/>
		<!-- 组件配置 -->
		<d-right-manage/>
		<!-- 小工具清单 -->
		<d-right-widget/>
	</div>
</template>
<script>
	import dRightFullScreen from '../../../components/d-right-full-screen'
	import dRightManage from '../../../components/d-right-manage'
	import dRightWidget from '../../../components/d-right-widget'
	import {Icon} from 'view-design'
	import platform from '../../../store/platform.store'

	export default {
		name: 'sidebar-tools',
		components: {
			'i-icon': Icon,
			dRightFullScreen,
			dRightManage,
			dRightWidget
		},
		props: {
			layerWidgets: {
				type: Array,
				default: () => []
			}
		},
		inject: ['kanboardEditor'],
		data() {
			return {
				showLayers: false,
				platform: platform.state,
			}
		},
		methods: {
			handleActivated (id) {
				this.$emit('handleActivated', id)
			},
			hideSidebarTools(e) {
				if (e) {
					const classPath = e.path.map(ele => ele.className).join(',')
					const excludeClass = [
						'config-panel-wrapper',
						'color-input-pop'
					]
					if (excludeClass.findIndex(c => classPath.indexOf(c) > -1) > -1) return
				}
				this.showLayoutGrid = false
				this.showMaterialManage = false
				this.showLayers = false
				this.showGlobalApi = false
				this.showScriptInject = false
			},
			toggleSidebarTool(key) {
				const arr = ['showMaterialManage', 'showLayoutGrid', 'showLayers', 'showGlobalApi', 'showScriptInject']
				arr.forEach(v => {
					if (v === key) {
						this[key] = !this[key]
					} else {
						this[v] = false
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.editor-icon {
		right: 15px;
		opacity: 0.6;
		z-index: 2;
		width: 24px;
		height: 24px;
		top: 142px;
		font-size: 32px;
		line-height: 24px;
		justify-content: center;
		padding-left: 1px;

		.ivu-icon {
			width: 100%;
			height: 100%;
		}


	}
</style>
