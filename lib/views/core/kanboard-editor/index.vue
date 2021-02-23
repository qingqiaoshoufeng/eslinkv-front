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
			ref="rulerCanvas"
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
						:scale-ratio="platform.ruler.zooms[platform.ruler.zoomIndex]"
						:draggable="widgetEditable(item)"
						:resizable="widgetEditable(item)"
						:active="item.id === activatedWidgetId && widgetEditable(item)"
						:prevent-deactivation="true"
						:w="item.config.layout.size.width"
						:h="item.config.layout.size.height"
						:x="item.config.layout.position.left"
						:y="item.config.layout.position.top"
						:z="item.config.layout.zIndex"
						:snap="platform.autoAlignGuide"
						:snap-tolerance="10"
						:class="[{
						  'no-pointer': isDragIn,
						  locked: item.config.widget.locked,
						  preview: !platform.ruler.rulerVisible,
						  'widget-hide': item.config.widget.hide
						}, `widget-${item.id}`]"
						:widget-info="`${item.id} ${item.config.widget.name || ''}`"
						snap-to-target="guide-line"
						class-name="vdr-custom-style"
						@resizing="onResizing"
						@dragging="onDragging"
						@refLineParams="getRefLineParams"
						@activated="handleActivated(item, widgetEditable(item) && !item.config.widget.innerEditing)"
						@deactivated="handleDeactivated(item)"
						@contextmenu.native="showRightMenu($event, item)"
					>
						<parts
							:ref="item.id"
							:type="item.type"
							:config="item.config"
							:market="item.market"
							@widget-config-update="(data) => handleWidgetConfig(data, item)"
						>
						</parts>
					</vdr>
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
			</section>
		</ruler-canvas>
		<!-- 右键菜单 -->
		<right-menu
			ref="rightMenu"
			@deactivateWidget="deactivateWidget"
		/>
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
	</div>
</template>
<script>
	import rightMenu from '../../../components/right-menu'
	import rulerCanvas from '../../../components/d-ruler/index.vue'
	import vdr from 'vue-draggable-resizable-gorkys2/src/components/vue-draggable-resizable'
	import 'vue-draggable-resizable-gorkys2/src/components/vue-draggable-resizable.css'
	import parts from '../../../components/d-widget-part/index'
	import dBottomBar from '../../../components/d-bottom-bar'
	import widgetOperation from './mixins/widget-operation'
	import panelOperation from './mixins/panel-operation'
	import canvasOperation from './mixins/canvas-operation'
	import editorEventHandler from './mixins/editor-event-handler'
	import configEventHandler from './mixins/config-event-handler'
	import databaseConfig from './data-warehouse/index.vue'
	import jsEditorModal from './js-editor-modal.vue'
	import dRightFullScreen from '../../../components/d-right-full-screen'
	import dRightManage from '../../../components/d-right-manage'
	import dRightWidget from '../../../components/d-right-widget'
	import dRightSetting from '../../../components/d-right-setting'
	import {Icon} from 'view-design'
	import platform from '../../../store/platform.store'
	import scene from '../../../store/scene.store'

	export default {
		name: 'kanboard-editor',
		mixins: [
			widgetOperation, panelOperation,
			canvasOperation,
			configEventHandler, editorEventHandler,
		],
		components: {
			Icon,
			parts,
			rulerCanvas,
			vdr,
			databaseConfig,
			jsEditorModal,
			dRightFullScreen, dRightManage, dRightWidget, dBottomBar, dRightSetting,
			rightMenu
		},
		provide() {
			return {kanboardEditor: this}
		},
		data() {
			return {
				platform: platform.state,
				scene: scene.state,
				vLine: [],
				hLine: []
			}
		},
		methods: {
			onDragging(left, top) {
				this.platform.widgetAdded[this.platform.chooseWidgetId].config.layout.position.left = left
				this.platform.widgetAdded[this.platform.chooseWidgetId].config.layout.position.top = top
			},
			onResizing(left, top, width, height) {
				this.platform.widgetAdded[this.platform.chooseWidgetId].config.layout.size.width = width
				this.platform.widgetAdded[this.platform.chooseWidgetId].config.layout.size.height = height
			},
			getRefLineParams({vLine, hLine}) {
				this.vLine = vLine
				this.hLine = hLine
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
			}
		},
		computed: {
			widgetAdded() {
				return this.platform.widgetAdded
			},
			showParts() {
				return (item) => {
					if (item.scene === 0 && this.scene.showMainScene) {
						return true
					} else if (item.scene === this.scene.index) {
						return true
					}
					return false
				}
			},
			ordinaryWidgets() {
				const ordinaryWidgets = {}
				Object.keys(this.widgetAdded).forEach(id => {
					const widget = this.widgetAdded[id]
					if (widget.type) ordinaryWidgets[id] = widget
				})
				return ordinaryWidgets
			},
		},
		mounted() {
			platform.actions.initKanboard()
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
