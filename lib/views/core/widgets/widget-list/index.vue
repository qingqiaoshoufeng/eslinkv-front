<template>
	<!-- 组件区 -->
	<div :class="{ fixed: panelFixed }" class="widgets-panel">
		<Tabs value="custom0" :animated="false" type="card" @on-click="(name) => handlePanelToggle(name)">
			<template v-for="tab in tabs">
				<TabPane v-if="tab.widgets.length" :key="tab.name" :label="tab.label" :name="tab.name">
					<Collapse v-model="panelStatic[tab.name]" accordion simple
							  @on-change="(keys) => handlePanelToggle(tab.name, keys[0])">
						<Panel :key="type" :name="type" :activeSet="setActiveMap(tab.name, type)"
							   v-for="{ label, type, widgets } in tab.widgets">
							{{ label }}
							<template v-if="widgetListActiveMap[`${tab.name}-${format(type)}`]" slot="content">
								<div v-for="(widget, index) in widgets" :key="widget.label"
									 class="widget-item-wrapper">
									<parts
										:type="widget.type"
										:style="transform(widget)"
										:classification="tab.name"
										:config="widgetConfigMap[`${tab.name}-${format(type)}-${index}`].config"
										draggable="true"
										readonly
										no-bind-params
										@dragstart.native="dragstart($event, `${tab.name}-${format(type)}-${index}`, widget)"
										@widget-config-update="({ value }) => setWidgetConfig(value, index, `${tab.name}-${format(type)}`)"
									/>
								</div>
							</template>
						</Panel>
					</Collapse>
				</TabPane>
			</template>
		</Tabs>
		<div :class="{ active: panelFixed }" :title="!panelFixed ? '固定小工具栏' : '取消固定'" class="fixed-toggle"
			 @click="handleFix"></div>
	</div>
</template>
<script>
	import parts from '../parts/index'
	import decoration from './decoration'
	import dvChart from './dv-chart'
	import eChart from './e-chart'
	import other from './other'
	import {Collapse, TabPane, Tabs, Panel} from 'view-design'
	import {store} from '../../../../store'

	export default {
		components: {
			parts, Collapse, TabPane, Tabs, Panel
		},
		data() {
			let custom = {}
			store.custom.widgets.map(item => {
				custom[item.name] = item
			})
			return {
				store,
				panelFixed: false,
				tabs: {
					...custom,
					decoration,
					dvChart,
					eChart,
					other,
				},
				widgetListActiveMap: {},
				widgetConfigMap: {},
				widgetListToggleTimer: {},
				panelStatic: {} // 记录当前打开关闭状态
			}
		},
		methods: {
			transform(widget) {
				if (widget.config.layout.size.width > 400 || widget.config.layout.size.height > 100) {
					if (100 / widget.config.layout.size.height > 400 / widget.config.layout.size.width) {
						return `transform: scale(${400 / widget.config.layout.size.width});`
					}
					return `transform: scale(${100 / widget.config.layout.size.height});`
				}
				return ''
			},
			handleFix() {
				this.panelFixed = !this.panelFixed
				this.$emit('panel-fixed')
			},
			setActiveMap(tab, panel = '') {
				const key = tab + '-' + this.format(panel)
				if (!this.widgetListActiveMap[key]) this.$set(this.widgetListActiveMap, key, false)
			},
			handlePanelToggle(tab, panel = '') {
				const key = tab + '-' + this.format(panel)
				const map = this.widgetListActiveMap
				const prevKey = Object.keys(map).find(key => map[key])
				if (panel) this.widgetListActiveMap[key] = true
				if (prevKey) {
					if (key === prevKey || !panel && prevKey.indexOf(key) === 0) {
						this.widgetListToggleTimer[prevKey] && clearTimeout(this.widgetListToggleTimer[prevKey])
						return
					}
					this.widgetListToggleTimer[prevKey] = setTimeout(() => {
						this.widgetListActiveMap[prevKey] = false
						if (!panel) {
							Object.keys(this.panelStatic).forEach(item => {
								item !== tab && this.panelStatic[item].splice(0)
							})
						}
						this.clearWidgetConfig(prevKey)
					}, 400)
				}
			},
			format(type) {
				return type.split('-').join('_')
			},
			clearWidgetConfig(keyPrefix) {
				const configMap = this.widgetConfigMap
				Object.keys(configMap).filter(key => key.indexOf(keyPrefix) === 0).forEach(configKey => {
					const [tab, panel, index] = configKey.split('-')
					const widget = (((this.tabs[tab].widgets || []).find(item => this.format(item.type) === panel) || {}).widgets || [])[index]
					if (!widget) return
					const {config} = widget
					configMap[configKey].config = {...config}
				})
			},
			setWidgetConfig(currentValue = {}, index, prefix) {
				const configMap = this.widgetConfigMap
				const key = prefix + '-' + index
				const currentConfig = configMap[key]
				requestAnimationFrame(() => {
					this.$set(currentConfig, 'config', {...currentValue})
				})
			},
			initWidgetConfigMap() {
				const widgets = this.tabs
				const configMap = this.widgetConfigMap
				Object.keys(widgets).forEach(tab => {
					const panels = widgets[tab].widgets
					panels.forEach(panel => {
						panel.widgets.forEach(({config}, index) => {
							const key = `${tab}-${this.format(panel.type)}-${index}`
							this.$set(configMap, [key], {
								config
							})
						})
					})
				})
			},
			/**
			 * @description h5 原生拖拽事件
			 */
			dragstart(e, configKey, {type}) {
				const widgetConfig = this.widgetConfigMap[configKey]
				if (!widgetConfig || !type) return
				const {config} = widgetConfig
				e.dataTransfer.setData('widget-config', JSON.stringify({
					type,
					config,
					startX: e.offsetX,
					startY: e.offsetY,
				}))
			}
		},
		created() {
			this.initWidgetConfigMap()
			Object.keys(this.tabs).map(key => {
				this.$set(this.panelStatic, key, [])
			})
		},
	}
</script>

<style lang="scss" scoped>
	.widget-item-wrapper {
		padding: 5px 0;
		margin-bottom: 5px;
		opacity: 0.9;
		transition: 0.2s;
		height: auto;
		min-height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.5);
		max-height: 100px;

		&:last-child {
			margin-bottom: 0;
		}

		&:hover {
			opacity: 1;
		}

		/deep/ {
			& > .widget-part {
				cursor: grab;
				outline: transparent dotted 1px;
				transition: outline-color 0.2s;

				&:hover {
					outline-color: #44ffcd;
				}

				& > div,
				& > label,
				& > form,
				& > ul {
					pointer-events: none;
				}
			}
		}
	}

	.widgets-panel {
		position: absolute;
		left: 0;
		top: 0;
		width: 428px;
		height: 100%;
		padding: 0;
		overflow: visible;
		background-color: white;
		transform: translateX(-100%);
		z-index: 2;
		transition: 0.3s 0.5s;

		&:after {
			content: '小工具';
			position: absolute;
			left: 100%;
			bottom: 2px;
			width: 24px;
			height: 82px;
			line-height: 1.2;
			text-align: center;
			padding: 10px 4px 30px;
			border-radius: 0 5px 5px 0;
			background-color: white;
			opacity: 0.9;
			z-index: -1;
			transition: 0.3s 0.5s;
		}

		/deep/ .ivu-tabs-card {
			padding: 10px;
			background-color: white;
			height: 100%;
		}

		&:hover,
		&.fixed {
			transition: 0.3s;
			transform: translateX(0);
			filter: drop-shadow(0 2px 5px #2d8bf083);

			&:not(.fixed):after {
				transition: 0.3s;
				opacity: 1;
				filter: drop-shadow(0 2px 5px #2d8bf083);
			}
		}

		&.fixed {
			filter: drop-shadow(0 2px 5px #2d8bf000);

			&:after {
				transition: 0.3s;
				opacity: 0;
				pointer-events: none;
			}
		}
	}

	.fixed-toggle {
		position: absolute;
		bottom: 5px;
		right: -24px;
		width: 24px;
		height: 24px;
		background-color: white;
		background-image: url('../../icons/pin_outlined.png');
		background-position: center;
		background-size: 20px;
		background-repeat: no-repeat;
		border-radius: 50%;
		transform: rotate(0deg);
		opacity: 0.3;
		transition: 0.2s;
		cursor: pointer;

		&:hover {
			opacity: 0.5;
		}

		&.active {
			background-image: url('../../icons/pin.png');
			transform: rotate(-45deg);
			right: 0;
			opacity: 1;
		}
	}

	/deep/ {
		.ivu-tabs-bar {
			margin-bottom: 10px;
		}

		.ivu-tabs-content {
			height: calc(100% - 42px);

			.ivu-tabs-tabpane {
				height: 100%;
				overflow: hidden;
				overflow-y: auto;
			}
		}

		.ivu-collapse-header {
			padding-left: 7px !important;

			&:hover {
				background-color: rgba(0, 0, 0, 0.036);
			}
		}

		.ivu-collapse > .ivu-collapse-item.ivu-collapse-item-active > .ivu-collapse-header {
			padding-left: 7px !important;
			position: sticky;
			top: 0;
			z-index: 999;
			background-color: white;
		}

		.ivu-collapse-content {
			padding: 0;
		}
	}
</style>
