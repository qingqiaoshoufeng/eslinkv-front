<template>
	<div v-if="source" class="config-panel">
		<template v-for="(value, key) in source">
			<template v-if="key === 'fields'">
				<fields :fields="value" v-model="innerValue" :key="key" v-on="listeners"></fields>
			</template>
			<component v-else :is="key" :key="key" v-model="groupValues[key]" :animated="false" size="small">
				<template v-if="key === 'Collapse'">
					<Panel v-for="panel in value" :key="panel.group" :name="panel.label"
						   :class="{ 'no-pointer': panel.enable === false }">
						<span class="panel-title">
						  <Checkbox
							  v-if="panel.enable !== undefined"
							  v-model="panel.enable"
							  :title="panel.enable ? '卸载配置节点' : '加载配置节点'"
							  class="enable-toggle"
							  @click.native.stop
							  @on-change="panelEnableClickedMap[panel.label] = true"
							  @hook:updated="toggleCurrentPanel(panel.enable, panel.label)"
						  />
						  {{ panel.label }}
						</span>
						<template v-if="panel.enable !== false">
							<config-panel
								ref="configPanelCollapse"
								slot="content"
								v-model="innerValue[panel.group]"
								:source="panel.value"
								class="nested collapse-nested"
								v-on="listeners"
							/>
						</template>
					</Panel>
				</template>
				<template v-else-if="key === 'Tabs'">
					<TabPane v-for="tab in value" :key="tab.group" :label="(h) => getLabel(h, tab)" :name="tab.label">
						<config-panel
							ref="configPanelTabs"
							:source="tab.value"
							v-model="innerValue[tab.group]"
							class="nested tabs-nested"
							v-on="listeners"
						/>
					</TabPane>
				</template>
			</component>
		</template>
	</div>
</template>
<script>
	import isJsonEqual from 'plain-object-is-equal'
	import {Tabs, TabPane, Checkbox, Panel, Icon, Collapse} from 'view-design'

	export default {
		name: 'config-panel',
		mounted() {
			/**
			 * @description
			 * todo
			 * 初始化 12次
			 * 之后每次 执行 24次+
			 * 因为递归循环
			 */
		},
		components: {
			TabPane, Checkbox, Panel, Icon, Tabs, Collapse
		},
		props: {
			source: Object,
			value: Object,
			actives: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				innerValue: {},
				panelEnableClickedMap: {},
				reseting: false
			}
		},
		methods: {
			// 重置配置表单
			reset() {
				this.reseting = true
				const collapse = this.$refs.configPanelCollapse
				const tabs = this.$refs.configPanelTabs
				collapse && collapse.forEach(configPanel => configPanel.reset())
				tabs && tabs.forEach(configPanel => configPanel.reset())
				this.innerValue = {}
				this.$nextTick(() => {
					this.reseting = false
				})
			},
			getLabel(h, tab) {
				if (!tab.help) return h('div', tab.label)
				const {href, title} = tab.help
				return h(
					'div',
					{},
					[
						tab.label,
						h(
							'a',
							{
								'class': 'doc-link',
								style: 'margin-left: 5px',
								attrs: {
									href,
									target: '_blank',
									title
								}
							}, [
								h(
									'Icon',
									{
										style: 'margin-right: 0;',
										props: {
											type: 'md-help-circle'
										}
									}
								)
							]
						)
					]
				)
			},
			isPanelShow(name) {
				return this.groupValues.Collapse.includes(name)
			},
			toggleCurrentPanel(value, name) {
				if (!this.panelEnableClickedMap[name]) return
				const Collapse = this.groupValues.Collapse
				if (value) {
					if (!Collapse.includes(name)) Collapse.push(name)
				} else {
					const index = Collapse.findIndex(panel => panel === name)
					if (index > -1) Collapse.splice(index, 1)
				}
			}
		},
		watch: {
			innerValue: {
				handler: function (value) {
					if (this.reseting) return
					if (isJsonEqual(value, this.value)) return
					this.$emit('input', value)
				},
				deep: true
			},
			value: {
				handler: function (value) {
					if (!value) return
					if (this.reseting) {
						this.innerValue = value
						return
					}
					if (isJsonEqual(value, this.innerValue)) return
					this.innerValue = value
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			groupValues() {
				const actives = {...this.actives}
				Object.keys(this.source).forEach(key => {
					this.source[key].forEach(part => {
						if (key === 'Collapse') {
							if (!actives.Collapse) {
								actives.Collapse = []
							}
							part.active && part.enable !== false && actives.Collapse.push(part.label)
						}
						if (key === 'Tabs') {
							if (!actives.Tabs) {
								actives.Tabs = ''
							}
							if (part.active) actives.Tabs = part.label
						}
					})
				})
				this.$emit('active-change', {...actives})
				return actives
			},
			listeners() {
				const listeners = {}
				Object.keys(this.$listeners).forEach(listener => {
					if (!['input', 'change', 'update'].includes(listener)) listeners[listener] = this.$listeners[listener]
				})
				return listeners
			}
		}
	}
</script>

<style lang="scss" scoped>
	.config-panel {
		width: 320px;
		height: 400px;

		&.hidden {
			display: none;
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.75;
		}

		&:not(.nested) {
			background-color: #f2f2f2;
			z-index: 1;
			resize: both;

			/deep/ {
				.ivu-tabs {
					width: 100%;
					height: 100%;
					overflow: unset;

					.ivu-tabs-content {
						height: calc(100% - 43px);
						overflow-x: visible;
						overflow-y: auto;
						max-height: calc(100% - 43px);
						overflow-anchor: none;
					}
				}
			}
		}

		.enable-toggle {
			pointer-events: auto;
		}

		.no-pointer {
			pointer-events: none;
		}

		/deep/ {
			.ivu-tabs-mini .ivu-tabs-tab {
				font-size: 14px;

				.doc-link i {
					vertical-align: text-top;
				}
			}

			.ivu-tabs-tabpane {
				padding: 0 5px;
			}

			.ivu-tabs-bar {
				margin-bottom: 10px;
			}

			.ivu-collapse {
				border: none;
				background-color: transparent;
				margin-bottom: 5px;
			}

			.ivu-collapse-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				white-space: nowrap;
				flex-grow: 1;
			}

			.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
				height: 32px;
				line-height: 32px;
				background-color: transparent;
				border: none;
				font-size: 14px;
				padding-left: 0;
				margin-top: 6px;

				.panel-title {
					position: relative;
					z-index: 2;
					background-color: #f2f2f2;
					padding: 0 15px 0 8px;
				}

				.ivu-icon {
					margin-right: 0;
				}

				&:after {
					content: ' ';
					height: 1px;
					margin: auto;
					background-color: currentColor;
					opacity: 0.2;
					transition: 0.2s;
					flex-grow: 1;
				}
			}

			.ivu-collapse-item {
				border-top: none;

				&.ivu-collapse-item-active > .ivu-collapse-header {
					border: none;
				}

				&:first-child .ivu-collapse-header {
					margin-top: 0;
				}
			}

			.ivu-collapse-content {
				padding: 5px 10px;
				background-color: #ffffff;

				& .ivu-collapse-content {
					padding: 0;
				}
			}

			.ivu-collapse-content-box {
				padding: 5px 0 0;

				/deep/ {
					.ivu-collapse-content {
						padding-left: 7px;
						margin-left: 7px;
						border-left: 1px dashed #d6d6d6;
					}
				}
			}

			.config-panel {
				width: 100%;
				height: auto;
				overflow: visible;

				&.collapse-nested .ivu-collapse-header,
				&.fields-nested .ivu-collapse-header {
					background-color: white;

					.panel-title {
						background-color: white;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						display: inline-block;
						max-width: calc(100% - 20px);
						vertical-align: bottom;
					}

					&:after {
						background-color: #d6d6d6;
					}
				}
			}

			.fields-item > .fields-wrapper {
				& > .fields-nested > .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
					background-color: #eaeaea;

					.panel-title {
						background-color: #eaeaea;
					}

					&:after {
						background-color: #acacac;
					}
				}
			}

			.ivu-collapse > .ivu-collapse-item:hover > .ivu-collapse-header {
				color: #222;

				&:after {
					opacity: 0.3;
				}
			}
		}
	}

	/deep/ {
		.doc-link {
			vertical-align: baseline;

			i {
				font-size: 1.2em;
			}
		}
	}
</style>
