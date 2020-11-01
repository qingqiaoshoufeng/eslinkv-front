<template>
	<!-- 操作区 -->
	<div
		ref="canvas-wrapper"
		:class="{ fullscreen: isFullscreen }"
		class="center"
		@click="hideSubPanels"
		@mousemove.capture="setMousePosition"
		@mouseleave.self="stopUpdateMousePosition"
		@select.prevent.stop
		@contextmenu.stop.prevent
	>
		<!-- 遮罩层 -->
		<div :class="{ active: refilling }" class="refill-mask">
			<div class="mask-content">
				<div class="mask-title">组件渲染中，请稍后…</div>
				<Progress :percent="refillPercent" :stroke-width="20" text-inside
						  :stroke-color="['#108ee9', '#87d068']"/>
			</div>
		</div>
		<!-- 底部信息栏 -->
		<div v-show="!hideEditTools" :class="{ active: isCanvasConfigShow }" class="bottom-bar">
			<label v-if="canvasConfigValue.info" :class="{ active: isCanvasConfigShow }" class="canvas-config-button"
				   @click.stop.self="toggleCanvasConfig($event)">
				<Icon type="md-information-circle" size="20" style="margin-top: -4px"/>
				{{ canvasConfigValue.info.name }} / {{ canvasConfigValue.size.width }}×{{ canvasConfigValue.size.height
				}}{{ canvasConfigValue.size.unit }}
			</label>
			<label ref="canvasConfigButton" :class="{ active: isCanvasConfigShow }" class="canvas-config-button"
				   @click.stop.self="toggleCanvasConfig($event)">
				<Icon type="ios-cog" size="22" style="margin-top: -4px"/>
				看板配置
			</label>
			<hot-keys/>
			<label class="auto-align-guide-switcher">
				<input type="checkbox" v-model="autoAlignGuide" checked style="vertical-align: text-top"/>
				自动贴靠参考线
			</label>
		</div>
		<!-- 标尺容器 -->
		<ruler-canvas
			v-model="guides"
			:guide-step="moveStep"
			ref="rulerCanvas"
			@zoom="handleZoomChange"
			@update-tools-visible="(result) => (hideEditTools = !result)"
			@content-move="(moving) => (rulerCanvasMoving = moving)"
		>
			<!-- 大屏 -->
			<section
				id="kanban"
				:style="canvasStyle"
				:class="['canvas-wrapper', { preview: hideEditTools }]"
				@dragenter="isDragIn = true"
				@dragleave.self="isDragIn = false"
				@drop="drop"
				@dragover.prevent
				@mousedown.self="deactivateWidget(activatedWidgetId)"
			>
				<!-- 小工具清单 -->
				<template v-for="item in ordinaryWidgets">
					<vdr
						v-if="showParts(item)"
						:key="item.id"
						:ref="`widget_${item.id}`"
						:parent="true"
						:parent-size="canvasSize"
						:scale-ratio="canvasZoom"
						:draggable="widgetEditable(item)"
						:resizable="widgetEditable(item)"
						:active="item.id === activatedWidgetId && widgetEditable(item)"
						:prevent-deactivation="true"
						:w="sizeMap[item.id].w"
						:h="sizeMap[item.id].h"
						:x="positionMap[item.id].x"
						:y="positionMap[item.id].y"
						:z="item.config.layout.zIndex"
						:snap="autoAlignGuide"
						:snap-tolerance="10"
						:class="[{
              'no-pointer': (isDragIn && item.type !== 'combination') || rulerCanvasMoving,
              'content-moving': item.type === 'combination' && rulerCanvasMoving,
              locked: item.config.widget.locked,
              preview: hideEditTools,
              'widget-hide': item.config.widget.hide
            }, `widget-${item.id}`]"
						:widget-info="`${item.id} ${item.config.widget.name || ''}`"
						snap-to-target="guide-line"
						class-name="vdr-custom-style"
						@refLineParams="getRefLineParams"
						@activated="handleActivated(item, widgetEditable(item) && !item.config.widget.innerEditing)"
						@deactivated="handleDeactivated(item)"
						@dragging="dragging"
						@resizing="resizing"
						@dragstop="(left, top) => {
              dragging(left, top)
              updatePanelPosition()
              updatePosition(item.id)
            }"
						@resizestop="(left, top) => {
              dragging(left, top)
              updatePanelPosition()
              updatePosition(item.id)
              updateSize(item.id)
            }"
						@contextmenu.native="showRightMenu($event, item)"
					>
						<parts
							:ref="item.id"
							:type="item.type"
							:config="item.config"
							@combination-drop="handleCombinationDrop"
							@widget-config-update="(data) => handleWidgetConfig(data, item)"
						>
							<!-- 组合小工具 - 子小工具 -->
							<template v-if="shouldBeShow(item)">
								<template v-for="child in getItemChildren(item, 'widget')">
									<vdr
										v-if="showParts(child)"
										:key="child.id"
										:ref="`widget_${child.id}`"
										:parent="true"
										:parent-size="{ width: sizeMap[item.id].w, height: sizeMap[item.id].h }"
										:scale-ratio="canvasZoom"
										:draggable="widgetEditable(child) && item.config.widget.innerEditing"
										:resizable="widgetEditable(child) && item.config.widget.innerEditing"
										:active="child.id === activatedWidgetId && widgetEditable(child) && item.config.widget.innerEditing"
										:prevent-deactivation="true"
										:w="sizeMap[child.id].w"
										:h="sizeMap[child.id].h"
										:x="positionMap[child.id].x"
										:y="positionMap[child.id].y"
										:z="child.config.layout.zIndex"
										:snap="autoAlignGuide"
										:snap-tolerance="5"
										:class="[
                      `group-item group-item-${child.id}`, `widget-${child.id}`,
                      {
                        'no-pointer': isDragIn || !item.config.widget.innerEditing,
                        locked: child.config.widget.locked,
                        preview: hideEditTools,
                        'slide-hide': calcSlideHide(item.config, child.id),
                        'widget-hide': child.config.widget.hide
                      },
                    ]"
										:widget-info="`${child.id} ${child.config.widget.name || ''}`"
										snap-to-target="guide-line"
										class-name="vdr-custom-style"
										@refLineParams="getInnerRefLineParams"
										@activated="handleActivated(child, item.config.widget.innerEditing || false)"
										@deactivated="handleDeactivated(child)"
										@dragging="dragging"
										@resizing="resizing"
										@dragstop="
                      updatePanelPosition()
                      updatePosition(child.id)
                    "
										@resizestop="
                      updatePanelPosition()
                      updatePosition(child.id)
                      updateSize(child.id)
                    "
										@contextmenu.native.prevent="item.config.widget.innerEditing && showRightMenu($event, child)"
									>
										<parts
											:ref="child.id" :type="child.type" :config="child.config"
											@widget-config-update="(data) => handleWidgetConfig(data, child)"/>

									</vdr>
								</template>
								<!-- 组合小工具内部辅助线 -->
								<template v-if="item.config.widget.innerEditing">
									<!--辅助线-->
									<span
										v-for="(item, index) in vInnerLine"
										v-show="item.display"
										:style="{ left: item.position, top: item.origin, height: item.lineLength }"
										:key="`v-${index}`"
										class="ref-line v-line"
									/>
									<span
										v-for="(item, index) in hInnerLine"
										v-show="item.display"
										:style="{ top: item.position, left: item.origin, width: item.lineLength }"
										:key="`h-${index}`"
										class="ref-line h-line"
									/>
									<!--辅助线END-->
								</template>
							</template>
						</parts>
					</vdr>
				</template>
				<!-- 布局格子 -->
				<template v-for="grid in ordinaryGrids">
					<grid-item
						:key="grid.id"
						v-bind="grid"
						@embed-drop="handleEmbedDrop"
						@embed-widget-drop="handleWidgetGridDrop"
						@grid-drag-move="handleGridDragMove"
						@delete="handleGridDelete"
						@copy="handleGridCopy"
						@update-config="handleGridUpdate"
						@active-change="handleGridActive"
						@widget-config-update="handleGridWidgetConfig"
						@contextmenu="(data) => showRightMenu(data)"
					/>
				</template>
				<!--辅助线-->
				<span
					v-for="(item, index) in vLine"
					v-show="item.display"
					:style="{ left: item.position, top: item.origin, height: item.lineLength }"
					:key="`v-${index}`"
					class="ref-line v-line"
				/>
				<span
					v-for="(item, index) in hLine"
					v-show="item.display"
					:style="{ top: item.position, left: item.origin, width: item.lineLength }"
					:key="`h-${index}`"
					class="ref-line h-line"
				/>
				<!--辅助线END-->
				<!--				<div v-show="isWidgetProcessing" :style="widgetProcessingStyle" class="widget-processing">正在初始化配置…</div>-->
			</section>
		</ruler-canvas>
		<!-- 右键菜单 -->
		<right-menu
			ref="rightMenu"
			:hideWidget="hideWidget"
			:zIndexMap="zIndexMap"
			:updateWidgetZIndex="updateWidgetZIndex"
			:isWidgetLocked="isWidgetLocked"
			:rightMenuGrid="rightMenuGrid"
			:rightMenuBindWidgetId="rightMenuBindWidgetId"
			:toggleWidgetLock="toggleWidgetLock"
			:copyWidget="copyWidget"
			:deactivateWidget="deactivateWidget"
			:activatedWidgetId="activatedWidgetId"
			:deleteWidget="deleteWidget"/>
		<!-- 小工具配置面板 -->
		<transition name="fade">
			<div
				ref="configPanelWrapper"
				id="tools-menu"
				v-show="showConfigPanel"
				:style="configPanelStyle"
				class="config-panel-wrapper"
				@keyup.stop
				@contextmenu="(e) => {e.preventDefault();return false}"
			>
				<config-panel
					v-show="widgetSource && !configPanelValueFreshing"
					ref="configPanel"
					v-model="currentWidgetValue"
					:source="widgetSource"
					:style="{pointerEvents: startPanelDrag ? 'none' : ''}"
					@config-database="handleDatabaseConfig"
					@config-process-body="handleProcessConfig"
				/>
				<div v-if="configPanelValueFreshing" class="config-value-updating">
					<div class="dot"></div>
				</div>
				<div class="top-toolbar">
					<div class="close-panel" @click="deactivateWidget(activatedWidgetId)">&#10005;</div>
					<div class="drag-panel" @mousedown.stop.prevent="setPanelDrag"></div>
					<div :class="{ active: fixPanelPosition }" class="fix-panel"
						 @click="fixPanelPosition = !fixPanelPosition"></div>
				</div>
				<!-- todo 拖动修改配置面板尺寸 -->
				<div class="resize-handle horizontal" @mousedown.self.stop="setPanelHorizontalResizeStart"></div>
				<div class="resize-handle vertical" @mousedown.self.stop="setPanelVerticalResizeStart"></div>
			</div>
		</transition>
		<!-- 布局格子配置面板 -->
		<transition name="fade">
			<div ref="gridConfigPanelWrapper" v-show="showGridConfigPanel" :style="gridConfigPanelStyle"
				 class="grid-config-panel-wrapper" @keyup.stop>
				<config-panel ref="gridConfigPanel" v-model="currentGridValue" :source="gridConfigSource"/>
				<div class="top-toolbar">
					<div>{{ !isGridConfig ? '小工具配置' : '布局格子配置' }}</div>
				</div>
			</div>
		</transition>
		<!-- 看板配置 -->
		<div ref="canvasConfigPanel" :class="{ active: isCanvasConfigShow }" class="canvas-config-wrapper" @click.stop
			 @keyup.stop>
			<div class="panel-body">
				<config-panel v-model="canvasConfigValue" :source="layoutSource" class="canvas-config-panel"/>
			</div>
			<div class="top-toolbar">
				<div class="close-panel" @click="isCanvasConfigShow = false">&#10005;</div>
				<div>看板配置</div>
				<div class="fix-panel placeholder"></div>
			</div>
		</div>
		<!-- 数仓配置面板 -->
		<database-config
			ref="dataBaseConfig"
			:showModal="showDatabaseConfigModal"
			@close="showDatabaseConfigModal = false"
			@update="updateApiSystem"
			@keyup.native.stop
		/>
		<!-- 数据加工 js 编辑器 -->
		<js-editor-modal ref="jsEditorModal" :showModal="showJsEditorModal" @close="showJsEditorModal = false"
						 @update="updateProcessBody" @keyup.native.stop/>
		<sidebar-tools ref="sidebarTools" :isFullscreen="isFullscreen" :layerWidgets="layerWidgets"/>
		<!-- 小工具导入 -->
		<transition name="fade">
			<import-widgets v-if="showWidgetsImport" @close="showWidgetsImport = false"
							@import-widgets="handleImportWidgets"/>
		</transition>
		<!-- 全局 api 执行器 -->
		<api-executor v-for="api in apis" :key="api.variable" :api="api"
					  @api-data-update="(data) => handleApiDataUpdate(api.variable, data)"/>
	</div>
</template>
<script>
	import {store} from '../../../store'
	import rightMenu from '../../../components/right-menu'
	import rulerCanvas from '../ruler-canvas/ruler-canvas.vue'
	import configPanel from '../config-panel'
	import fields from '../config-panel/components/fields'
	import Vue from 'vue'
	import vdr from 'vue-draggable-resizable-gorkys2/src/components/vue-draggable-resizable'
	import 'vue-draggable-resizable-gorkys2/src/components/vue-draggable-resizable.css'
	import parts from '../widgets/parts/index'
	import hotKeys from '../../../components/hot-keys'
	import rulerGuides from './mixins/ruler-guides'
	import widgetOperation from './mixins/widget-operation'
	import panelOperation from './mixins/panel-operation'
	import canvasOperation from './mixins/canvas-operation'
	import refill from './mixins/refill'
	import createKanboardData from './mixins/create-kanboard-data'
	import template from './mixins/template.js'
	import editorEventHandler from './mixins/editor-event-handler'
	import configEventHandler from './mixins/config-event-handler'
	import layoutGridMixin from './layout-grid/mixin'
	import combination from './mixins/combination'
	import positionSize from './mixins/position-size'
	import layerOperation from '../../../components/widget-layers/mixin'
	import globalApi from './global-api/mixin'
	import widgetShareData from './mixins/widget-share-data'
	import crossFrameMessageParamBind from './mixins/cross-frame-message-param-bind'
	import importWidgets from '../../../components/widget-layers/import-widgets'
	import databaseConfig from './data-warehouse/index.vue'
	import jsEditorModal from './js-editor-modal.vue'
	import gridItem from './layout-grid/grid.vue'
	import sidebarTools from './sidebar-tools.vue'
	import 'animate.css/animate.min.css'
	import {Icon} from 'view-design'
	// config-panel 与 fields 互相引用，须提前注册为 Vue 组件
	Vue.component('config-panel', configPanel)
	Vue.component('fields', fields)

	export default {
		name: 'kanboard-editor',
		mixins: [
			template, widgetOperation, panelOperation,
			canvasOperation, refill, createKanboardData,
			configEventHandler, editorEventHandler, layoutGridMixin,
			positionSize, layerOperation, globalApi,
			widgetShareData, crossFrameMessageParamBind,
			rulerGuides, combination, importWidgets
		],
		components: {
			Icon,
			parts,
			rulerCanvas,
			configPanel,
			vdr,
			hotKeys,
			databaseConfig,
			jsEditorModal,
			gridItem,
			sidebarTools,
			rightMenu
		},
		provide() {
			return {kanboardEditor: this}
		},
		data() {
			return {
				widgetsAdded: {},
				hideEditTools: false,
			}
		},
		methods: {
			/**
			 * @description 解锁/锁定
			 */
			toggleWidgetLock() {
				if (!this.rightMenuGrid) {
					const id = this.rightMenuBindWidgetId
					if (!id) return
					const widget = this.widgetsAdded[id].config.widget
					widget.locked = !widget.locked
					this.deactivateWidget(id)
				} else {
					const widget = this.rightMenuGrid.config.widget
					widget.locked = !widget.locked
					this.rightMenuGrid = null
				}
			},
			/**
			 * @description 复制组件
			 */
			copyWidget() {
				if (!this.rightMenuGrid) {
					this.copyTargetWidget()
				} else {
					this.copyTargetGrid(this.rightMenuGrid)
					this.rightMenuGrid = null
				}
			},
			/**
			 * @description 隐藏组件
			 */
			hideWidget() {
				const id = this.rightMenuBindWidgetId
				if (!id) return
				const widget = this.widgetsAdded[id].config.widget
				widget.hide = !widget.hide
				this.deactivateWidget(id)
			},
			deleteWidget() {
				this.$Modal.confirm({
					title: '提示',
					content: '是否删除当前组件？',
					onOk: () => {
						if (!this.rightMenuGrid) {
							const id = this.rightMenuBindWidgetId
							this.removeCombinationChild(id)
							this.$delete(this.widgetsAdded, id)
							this.$delete(this.zIndexMap, id)
							this.$delete(this.sizeMap, id)
							this.$delete(this.positionMap, id)
							this.activatedWidgetId = this.rightMenuBindWidgetId = null
						} else {
							this.handleGridDelete(this.rightMenuGrid.chainedId, true)
							this.rightMenuGrid = null
						}
					}
				});
			},
			hideSubPanels(e) {
				if (e) {
					const classPath = e.path.map(ele => ele.className).join(',')
					const excludeClass = [
						'config-panel-wrapper',
						'color-input-pop'
					]
					if (excludeClass.findIndex(c => classPath.indexOf(c) > -1) > -1) return
				}
				this.$refs.rightMenu && this.$refs.rightMenu.$el.classList.remove('active')
				this.activeGridId = null
				this.isCanvasConfigShow = false
				this.sidebarTools.hideSidebarTools()
			}
		},
		computed: {
			showParts() {
				return (item) => {
					if (item.scene === store.scene.index) {
						return true
					}
					return false
				}
			},
			isWidgetLocked() {
				if (this.rightMenuGrid) return this.rightMenuGrid.config.widget.locked
				const id = this.rightMenuBindWidgetId
				return id && this.widgetsAdded[id] && this.widgetsAdded[id].config.widget.locked
			},
			ordinaryWidgets() {
				const ordinaryWidgets = {}
				Object.keys(this.widgetsAdded).forEach(id => {
					const widget = this.widgetsAdded[id]
					if (widget.type && !widget.config.widget.combinationTo) ordinaryWidgets[id] = widget
				})
				return ordinaryWidgets
			},
			sidebarTools() {
				return this.$refs.sidebarTools
			}
		},
		watch: {
			hideEditTools() {
				this.activatedWidgetId && this.deactivateWidget(this.activatedWidgetId)
			},
			widgetsAdded() {
				if (this.refilling) return
				this.$emit('kanboard-edited')
			},
			gridsAdded() {
				if (this.refilling) return
				this.$emit('kanboard-edited')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>

<style lang="scss">
	.canvas-background-select {
		width: 640px !important;
		height: 420px !important;
		top: 50% !important;
		left: 50% !important;
		background-color: #777777 !important;
		transform: translate3d(-50%, -50%, 0) !important;
		border-radius: 5px;
		padding: 0 5px 5px 0;
		filter: drop-shadow(0 4px 7px #2d8cf094);

		.background-item {
			width: calc(50% - 5px) !important;
			max-height: 180px;
			margin: 5px 0 0 5px !important;
			padding: 0 !important;
			background-color: #cde0f5 !important;
			cursor: pointer;

			&:hover {
				img {
					transform: scale(1.1) !important;
				}
			}
		}
	}
</style>
