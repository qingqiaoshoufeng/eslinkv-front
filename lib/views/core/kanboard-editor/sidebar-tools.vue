<template>
	<div class="sidebar-tools" @click.stop>
		<!-- 画布全屏 -->
		<div
			:title="!isFullscreen ? '进入全屏' : '退出全屏'"
			class="editor-action request-fullscreen"
			@click="kanboardEditor.toggleFullscreen"
		>
			<img
				:src="`./static/images/${isFullscreen ? 'exit-' : ''}fullscreen.svg`"
				:alt="!isFullscreen ? '进入全屏' : '退出全屏'"/>
		</div>
		<!-- 素材管理按钮 -->
		<div
			:class="{ active: showMaterialManage }"
			class="editor-action open-material-manage"
			title="素材管理"
			@click="toggleSidebarTool('showMaterialManage')"
		>
			<img :src="`./static/images/material-manage.svg`"/>
		</div>
		<!-- 场景 -->
		<d-scene @show="toggleSidebarTool('sceneShow')" ref="scene"/>
		<!-- 组件配置 -->
		<d-manage @show="toggleSidebarTool('manageShow')" ref="manage"/>
		<!-- 小工具清单 -->
		<Icon type="ios-apps" class="editor-icon" size="28" title="小工具清单" @click="toggleSidebarTool('showLayers')" :class="{ active: showLayers }"/>
		<!--    <div-->
		<!--        -->
		<!--       -->
		<!--        -->
		<!--        -->
		<!--    >-->
		<!--      <img :src="`./static/images/layers.svg`"/>-->
		<!--    </div>-->
		<!-- 全局接口配置 -->
		<div
			:class="{ active: showGlobalApi }"
			class="editor-action global-api"
			title="全局数据源配置"
			@click="toggleSidebarTool('showGlobalApi')"
		>
			<img :src="`./static/images/interface.svg`"/>
		</div>
		<!-- 外部脚本嵌入管理 -->
		<div
			:class="{ active: showScriptInject }"
			class="editor-action script-inject hide"
			title="脚本嵌入管理"
			@click="toggleSidebarTool('showScriptInject')"
		>
			<img :src="`./static/images/script.svg`"/>
		</div>

		<!-- 素材管理 -->
		<material-manage :showModal="showMaterialManage" @close="showMaterialManage = false"/>
		<!-- 布局格子按钮 -->
		<!--    <div-->
		<!--      :class="{ active: showLayoutGrid }"-->
		<!--      class="editor-action toggle-layout-grid"-->
		<!--      title="布局格子"-->
		<!--      @click="-->
		<!--        hideSubPanels()-->
		<!--        showLayoutGrid = !showLayoutGrid-->
		<!--      "-->
		<!--    >-->
		<!--      <img :src="`./static/images/layout-grid.svg`" />-->
		<!--    </div>-->
		<transition name="layer-fade-right">
			<layout-grid v-show="showLayoutGrid"></layout-grid>
		</transition>
		<transition name="layer-fade-right">
			<widget-layers
				v-show="showLayers"
				:widgets="layerWidgets"
				@lock-widget="kanboardEditor.handleLayerWidgetLock"
				@delete-widget="kanboardEditor.handleLayerWidgetDelete"
				@hide-widget="kanboardEditor.handleLayerWidgetHide"
				@hover-widget="kanboardEditor.handleLayerWidgetHover"
				@active-widget="kanboardEditor.handleLayerWidgetActive"
				@update-widget-name="kanboardEditor.handleLayerWidgetNameUpdate"
				@update-widget-z-index="kanboardEditor.handleLayerWidgetZIndexUpdate"
				@import-widgets="
          kanboardEditor.showWidgetsImport = true;
          showLayers = false
        "
			></widget-layers>
		</transition>
		<transition name="layer-fade-right">
			<global-api-panel
				v-show="showGlobalApi"
				ref="globalApiPanel"
				@global-api-update="kanboardEditor.handleGlobalApiUpdate"
			/>
		</transition>
		<transition name="layer-fade-right">
			<script-inject-panel
				v-show="showScriptInject"
				@script-inject-update="kanboardEditor.handleGlobalApiUpdate"
			/>
		</transition>
	</div>
</template>
<script>
	import materialManage from '../material-manage/index.vue'
	import layoutGrid from './layout-grid'
	import widgetLayers from '../../../components/widget-layers'
	import globalApiPanel from './global-api/index.vue'
	import scriptInjectPanel from './script-inject/index.vue'
	import dScene from '../../../components/d-scene'
	import dManage from '../../../components/d-manage'
	import {Icon} from 'view-design'

	export default {
		name: 'sidebar-tools',
		components: {
			materialManage,
			layoutGrid,
			widgetLayers,
			globalApiPanel,
			scriptInjectPanel,
			Icon,
			dScene,
			dManage
		},
		props: {
			isFullscreen: {
				type: Boolean,
				default: false
			},
			layerWidgets: {
				type: Array,
				default: () => []
			}
		},
		inject: ['kanboardEditor'],
		data() {
			return {
				showMaterialManage: false,
				showLayoutGrid: false,
				showLayers: false,
				showGlobalApi: false,
				showScriptInject: false
			}
		},
		methods: {
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
				if (key !== 'sceneShow') {
					this.$refs.scene.handleClose()
				}
				if (key !== 'manageShow') {
					this.$refs.manage.handleClose()
				}
				arr.forEach(v => {
					if (v === key) {
						this[key] = !this[key]
					} else {
						this[v] = false
					}
				})
			}
		},
		computed: {
			hideSubPanels(e) {
				return e => {
					this.kanboardEditor.hideSubPanels(e)
					this.hideSidebarTools(e)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.editor-icon {
		position: absolute;
		right: 15px;
		opacity: 0.6;
		z-index: 2;
		width: 24px;
		height: 24px;
		cursor: pointer;
		top: 142px;
		font-size: 32px;
		line-height: 24px;
		justify-content: center;
		padding-left: 1px;

		.ivu-icon {
			width: 100%;
			height: 100%;
		}

		&:hover, &.active {
			opacity: 1;
		}
	}

	.editor-action {
		position: absolute;
		right: 15px;
		top: 33px;
		opacity: 0.4;
		z-index: 2;
		width: 24px;
		height: 24px;
		cursor: pointer;
		mix-blend-mode: exclusion;

		img {
			width: 100%;
			height: 100%;
		}

		&:hover {
			opacity: 0.8;
		}

		&.active {
			opacity: 0.7;
		}
	}

	.open-material-manage {
		right: 14px;
		top: 68px;
		width: 26px;
		height: 26px;
	}

	.toggle-layout-grid {
		top: 105px;
	}

	.toggle-layers {
		top: 142px;
		font-size: 32px;
		color: white;
		line-height: 24px;
		display: flex;
		justify-content: center;
		padding-left: 1px;

		img {
			width: 26px;
			height: 26px;
			margin-left: -1px;
		}
	}

	.global-api {
		top: 179px;
	}

	.script-inject {
		top: 216px;
	}

	.layer-fade-right-enter-active,
	.layer-fade-right-leave-active {
		transition: opacity 0.2s, transform 0.2s;
	}

	.layer-fade-right-enter,
	.layer-fade-right-leave-to {
		opacity: 0;
		transform: translateX(60px);
	}
</style>
