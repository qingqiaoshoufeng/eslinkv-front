<template>
	<div ref="canvas-wrapper" id="kanban" class="canvas-wrapper" :style="canvasStyle()">
		<load-mask :show="querying">请求看板数据…</load-mask>
		<div :class="{ active: refilling }" class="refill-mask">
			<div class="mask-content">
				<div class="mask-title">加载中，请稍后…</div>
				<Progress :percent="refillPercent" :stroke-width="20" text-inside
						  :stroke-color="['#108ee9', '#87d068']"/>
			</div>
		</div>
		<template v-for="item in widgetAdded">
			<template v-if="!item.config.widget.combinationTo">
				<parts v-if="showParts(item)" :key="item.id" :type="item.type" :config="item.config"
					   :ref="item.id"
					   :style="item.config.widget.hide ? 'display: none' : ''" readonly>
					<template v-if="shouldBeShow(item)">
						<template v-for="child in getItemChildren(item, 'widget')">
							<parts
								v-if="showParts(child)"
								:key="child.id"
								:ref="child.id"
								:class="[
								  `group-item group-item-${child.id}`,
								  {
									'slide-hide': calcSlideHide(item.config, child.id)
								  },
								]"
								:type="child.type"
								:config="child.config"
								:style="child.config.widget.hide ? 'display: none' : ''"
								readonly
							/>
						</template>
					</template>
				</parts>
			</template>
		</template>
		<api-executor v-for="api in apis" :key="api.variable" :api="api"
					  @api-data-update="(data) => handleApiDataUpdate(api.variable, data)"/>
	</div>
</template>
<script>
	import parts from '../core/widgets/parts/index'
	import styleParser from '../core/widgets/parts/lib/style-parser'
	import widgetOperation from '../core/kanboard-editor/mixins/widget-operation'
	import refill from '../core/kanboard-editor/mixins/refill'
	import combination from '../core/kanboard-editor/mixins/combination'
	import globalApi from '../core/kanboard-editor/global-api/mixin'
	import widgetShareData from '../core/kanboard-editor/mixins/widget-share-data'
	import crossFrameMessageParamBind from '../core/kanboard-editor/mixins/cross-frame-message-param-bind'
	import * as widgetBindManager from '../mixins/widget-bind-manage'
	import loadMask from '../../components/load-mask'
	import {store, mutations} from '../../store'

	export default {
		name: 'kanboard-editor',
		mixins: [widgetOperation, refill, combination, globalApi, widgetShareData, crossFrameMessageParamBind],
		provide() {
			return {...widgetBindManager, kanboard: this, kanboardEditor: this}
		},
		components: {
			parts,
			loadMask
		},
		data() {
			return {
				store,
				querying: true,
				refilling: false,
				refillPercent: 0,
				canvasConfigValue: {},
				time: Date.now()
			}
		},
    computed: {
      widgetAdded () {
        return store.kanboard.widgetAdded
      }
    },
		methods: {
			initWidgetConfig(id, type, config, scene) {
        mutations.setWidgetsAddedItem(id, type, config, scene)
      },
			sortWidgets: function (widgets) {
				const providers = []
				const responders = []
				widgets.forEach(widget => {
					const api = widget.value.api
					const isProvider = api && api.bind && api.bind.enable && api.bind.role.includes('provider')
					if (isProvider) {
						providers.push(widget)
					} else {
						responders.push(widget)
					}
				})
				return [...providers, ...responders]
			},
			refillConfig() {
        const {kanboard, widgets, grids, apis} = store.kanboard.data

        this.querying = false
				this.apis = apis
				return new Promise(resolve => {
					this.refilling = true
					this.canvasConfigValue = kanboard
					const widgetsArray = this.sortWidgets(Object.values(widgets))
					const length = widgetsArray.length
					// 小工具初始化需要时间，此处进行延时逐个回填
					const reDrawWidget = ({id, type, value, scene = 0}) => {
						this.initWidgetConfig(id, type, value, scene)
						const currentLength = widgetsArray.length
						if (currentLength) {
							this.refillPercent = (length - currentLength) / length * 100 | 0
							reDrawWidget(widgetsArray.shift())
						} else {
							this.refillPercent = 100
							this.refilling = false
							resolve()
						}
					}
					if (length) {
						reDrawWidget(widgetsArray.shift())
					} else {
						this.refilling = false
						this.refillPercent = 100
						resolve()
					}
				})
			},
			canvasStyle() {
				const val = styleParser(this.canvasConfigValue)
				if (val) {
					this.$emit('mounted', val)
				}
				return val
			},
			showParts(item) {
				if (item.scene === 0 && this.store.scene.showMainScene) {
					return true
				} else if (item.scene === this.store.scene.index) {
					return true
				}
				return false
			},
		},
		mounted() {
			mutations.setInstance('kanboard', this)
			mutations.setStatus('inPreview')
		}
	}
</script>

<style lang="scss">
	.scene-temporary-wrapper {
		.widget-part {
			position: absolute !important;
		}
	}
</style>
<style lang="scss" scoped>
	.refill-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999999;
		background-color: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: 0.2s;
		pointer-events: none;
		display: flex;
		justify-content: center;
		align-items: center;

		&.active {
			opacity: 1;
			pointer-events: auto;

			& ~ .widget-part {
				filter: blur(7px);
			}
		}

		.mask-content {
			width: 320px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.mask-title {
				line-height: 3;
				color: white;
				font-size: 1.3em;
			}
		}

		/deep/ {
			.ivu-progress-inner {
				background-color: #717171;
			}
		}
	}

	.canvas-wrapper {
		&:before {
			content: '';
			display: flex;
		}

		/deep/ {
			& > .widget-part {
				position: absolute !important;
			}

			.layout-grid-row,
			.layout-grid-col {
				outline: none;

				&:hover {
					background-color: unset;
				}

				.grid,
				.widget-part:not(.widget-preset-slot) {
					outline: none;

					&:after,
					&:before {
						display: none;
					}
				}

				.delete {
					display: none !important;
				}
			}

			.combination-body {
				outline: none;
			}
		}
	}

	/deep/ {
		.load-mask {
			position: fixed !important;
		}

		.anchorBL {
			display: none;
		}
	}
</style>
