<template>
	<!-- 操作区 -->
	<div
		ref="canvas-wrapper"
		:class="{ fullscreen: platform.fullscreen }"
		class="center"
		@click="hideSubPanels"
		@select.prevent.stop
		@contextmenu.stop.prevent
	>
		<!-- 底部信息栏 -->
		<d-bottom-bar/>
		<!-- 标尺容器 -->
		<ruler-canvas
			v-model="guides"
			:guide-step="moveStep"
			ref="rulerCanvas"
			@zoom="handleZoomChange"
			@content-move="(moving) => (rulerCanvasMoving = moving)"
		>
			<!-- 大屏 -->
			<section
				id="kanban"
				:style="canvasStyle"
				:class="['canvas-wrapper', { preview: !platform.ruler.rulerVisible }]"
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
						:w="vdrItem([item.id]).w"
						:h="vdrItem([item.id]).h"
						:x="vdrItem([item.id]).x"
						:y="vdrItem([item.id]).y"
						:z="item.config.layout.zIndex"
						:snap="platform.autoAlignGuide"
						:snap-tolerance="10"
						:class="[{
              'no-pointer': (isDragIn && item.type !== 'combination') || rulerCanvasMoving,
              'content-moving': item.type === 'combination' && rulerCanvasMoving,
              locked: item.config.widget.locked,
              preview: !platform.ruler.rulerVisible,
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
              updatePosition(item.id)
            }"
						@resizestop="(left, top) => {
              dragging(left, top)
              updatePosition(item.id)
              updateSize(item.id)
            }"
						@contextmenu.native="showRightMenu($event, item)"
					>
						<parts
							:ref="item.id"
							:type="item.type"
							:config="item.config"
							:market="item.market"
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
										:parent-size="{ width: vdrItem([item.id]).w, height: vdrItem([item.id]).h }"
										:scale-ratio="canvasZoom"
										:draggable="widgetEditable(child) && item.config.widget.innerEditing"
										:resizable="widgetEditable(child) && item.config.widget.innerEditing"
										:active="child.id === activatedWidgetId && widgetEditable(child) && item.config.widget.innerEditing"
										:prevent-deactivation="true"
										:w="vdrItem([child.id]).w"
										:h="vdrItem([child.id]).h"
										:x="vdrItem([child.id]).x"
										:y="vdrItem([child.id]).y"
										:z="child.config.layout.zIndex"
										:snap="platform.autoAlignGuide"
										:snap-tolerance="5"
										:class="[
                      `group-item group-item-${child.id}`, `widget-${child.id}`,
                      {
                        'no-pointer': isDragIn || !item.config.widget.innerEditing,
                        locked: child.config.widget.locked,
                        preview: !platform.ruler.rulerVisible,
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
                      updatePosition(child.id)
                    "
										@resizestop="
                      updatePosition(child.id)
                      updateSize(child.id)
                    "
										@contextmenu.native.prevent="item.config.widget.innerEditing && showRightMenu($event, child)"
									>
										<parts
											:market="item.market"
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
			:copyWidget="copyWidget"
			:deleteWidget="deleteWidget"/>
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
		<!-- 画布全屏 -->
		<d-right-full-screen/>
		<!-- 看板配置 -->
		<d-right-manage/>
		<!-- 小工具清单 -->
		<d-right-widget/>
		<!-- 编辑器设置 -->
		<d-right-setting/>
		<!-- 全局 api 执行器 -->
		<api-executor v-for="api in apis" :key="api.variable" :api="api"
					  @api-data-update="(data) => handleApiDataUpdate(api.variable, data)"/>
	</div>
</template>
<script>
	import rightMenu from '../../../components/right-menu'
	import rulerCanvas from '../ruler-canvas/ruler-canvas.vue'
	import fields from '../config-panel/components/fields'
	import Vue from 'vue'
	import vdr from 'vue-draggable-resizable-gorkys2/src/components/vue-draggable-resizable'
	import 'vue-draggable-resizable-gorkys2/src/components/vue-draggable-resizable.css'
	import parts from '../widgets/parts/index'
	import dBottomBar from '../../../components/d-bottom-bar'
	import rulerGuides from './mixins/ruler-guides'
	import widgetOperation from './mixins/widget-operation'
	import panelOperation from './mixins/panel-operation'
	import canvasOperation from './mixins/canvas-operation'
	import createKanboardData from './mixins/create-kanboard-data'
	import editorEventHandler from './mixins/editor-event-handler'
	import configEventHandler from './mixins/config-event-handler'
	import layoutGridMixin from './layout-grid/mixin'
	import combination from './mixins/combination'
	import positionSize from './mixins/position-size'
	import layerOperation from '../../../components/widget-layers/mixin'
	import globalApi from './global-api/mixin'
	import widgetShareData from './mixins/widget-share-data'
	import crossFrameMessageParamBind from './mixins/cross-frame-message-param-bind'
	import databaseConfig from './data-warehouse/index.vue'
	import jsEditorModal from './js-editor-modal.vue'
	import gridItem from './layout-grid/grid.vue'
	import dRightFullScreen from '../../../components/d-right-full-screen'
	import dRightManage from '../../../components/d-right-manage'
	import dRightWidget from '../../../components/d-right-widget'
	import dRightSetting from '../../../components/d-right-setting'
	import {Icon} from 'view-design'
	// config-panel 与 fields 互相引用，须提前注册为 Vue 组件
	Vue.component('fields', fields)
	import platform from '../../../store/platform.store'

	export default {
		name: 'kanboard-editor',
		mixins: [
			widgetOperation, panelOperation,
			canvasOperation, createKanboardData,
			configEventHandler, editorEventHandler, layoutGridMixin,
			positionSize, layerOperation, globalApi,
			widgetShareData, crossFrameMessageParamBind,
			rulerGuides, combination
		],
		components: {
			Icon,
			parts,
			rulerCanvas,
			vdr,
			databaseConfig,
			jsEditorModal,
			gridItem,
			dRightFullScreen, dRightManage, dRightWidget, dBottomBar, dRightSetting,
			rightMenu
		},
		provide() {
			return {kanboardEditor: this}
		},
		data() {
			return {
				platform: platform.state,
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
					const widget = this.widgetAdded[id].config.widget
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
				this.copyTargetWidget()
			},
			/**
			 * @description 隐藏组件
			 */
			hideWidget() {
				const id = this.rightMenuBindWidgetId
				if (!id) return
				const widget = this.widgetAdded[id].config.widget
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
							platform.actions.unChooseWidget()
							this.$delete(this.widgetAdded, id)
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
			}
		},
		computed: {
			vdrItem() {
				return (id) => {
					const item = this.platform.widgetAdded[id]
					return {
						x: item.config.layout.position.left,
						y: item.config.layout.position.top,
						h: item.config.layout.size.height,
						w: item.config.layout.size.width,
						zIndex: item.config.layout.zIndex,
					}
				}
			},
			widgetAdded() {
				return this.platform.widgetAdded
			},
			showParts() {
				return (item) => {
					if (item.scene === 0 && window.GoldChart.store.scene.showMainScene) {
						return true
					} else if (item.scene === window.GoldChart.store.scene.index) {
						return true
					}
					return false
				}
			},
			isWidgetLocked() {
				if (this.rightMenuGrid) return this.rightMenuGrid.config.widget.locked
				const id = this.rightMenuBindWidgetId
				return id && this.widgetAdded[id] && this.widgetAdded[id].config.widget.locked
			},
			ordinaryWidgets() {
				const ordinaryWidgets = {}
				Object.keys(this.widgetAdded).forEach(id => {
					const widget = this.widgetAdded[id]
					if (widget.type && !widget.config.widget.combinationTo) ordinaryWidgets[id] = widget
				})
				return ordinaryWidgets
			},
			sidebarTools() {
				return this.$refs.sidebarTools
			}
		},
		mounted() {
			window.GoldChart.mutations.setInstance('kanboard', this)
			window.GoldChart.mutations.setStatus('inEdit')
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
