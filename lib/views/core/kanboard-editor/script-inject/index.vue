<template>
	<div class="script-inject" @click.stop>
		<header class="header">
			<div>脚本嵌入管理</div>
			<div class="add-script action-button" @click="addScript">
				<Icon type="md-add" size="18"/>
			</div>
		</header>
		<div class="config-panel-wrapper">
			<template v-if="scripts.length">
				<div v-for="(script, index) in scripts" :key="script.name" class="config-panel-item">
					<config-panel
						v-model="scripts[index]"
						:source="getSource(index)"
					/>
					<div class="remove-item action-button" @click="removeScriptConfig(index)">
						<Icon type="md-close" size="16"/>
					</div>
				</div>
			</template>
			<div v-else class="no-item">暂无配置</div>
		</div>
	</div>
</template>
<script>
	import configPanel from '../../config-panel'
	import configSource from './config-source'
	import configValue from './config-value'
	import sourceToLayout from '../../widgets/parts/lib/source-to-layout'
	import copy from 'fast-copy'
	import {Icon} from 'view-design'

	export default {
		name: 'script-inject',
		components: {
			configPanel, Icon
		},
		data() {
			return {
				scripts: [],
				emitTimer: null,
				showDatabaseConfigModal: false,
				showJsEditorModal: false,
				currentSystemConfigIndex: null
			}
		},
		methods: {
			addScript() {
				this.scripts.push(copy(configValue))
			},
			removeScriptConfig(index) {
				this.$Modal.confirm({
					title: '删除配置',
					content: '是否删除当前脚本嵌入配置？该操作不可恢复。',
					onOk: async () => {
						this.scripts.splice(index, 1)
					},
					onCancel: () => {
					},
					okText: '删除',
					cancelText: '取消'
				})
			},
			getSource(index) {
				const source = {...configSource}
				source.script.groupLabel = '全局数据源配置 ' + (index + 1)
				return sourceToLayout(source)
			},
			setGlobalApiConfig(scripts = []) {
				this.scripts = scripts.map(script => {
					return {script}
				})
			},
			emitUpdate(value) {
				if (this.emitTimer) clearTimeout(this.emitTimer)
				this.emitTimer = setTimeout(() => {
					// this.$emit('script-inject-update', value.map(config => config.script))
					this.emitTimer = null
				}, 500)
			}
		},
		watch: {
			scripts: {
				handler: 'emitUpdate',
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.script-inject {
		position: absolute;
		right: 55px;
		top: 34px;
		bottom: 55px;
		width: 450px;
		background-color: white;
		border-radius: 5px;
		filter: drop-shadow(rgba(0, 0, 0, 0.15) 0 5px 5px);
		overflow: hidden;
		z-index: 3;
		letter-spacing: 0;

		.action-button {
			width: 24px;
			height: 24px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid #e2e2e2;
			cursor: pointer;
			transition: .2s;

			/deep/ {
				.ivu-icon {
					transition: .2s;
				}
			}
		}

		.header {
			height: 48px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px;
			font-size: 15px;
			font-weight: bold;
			border-bottom: #e2e2e2 solid 1px;
			background-color: white;
		}

		.config-panel-wrapper {
			width: 100%;
			height: calc(100% - 48px);
			overflow-x: hidden;

			.config-panel-item {
				position: relative;

				.remove-item {
					position: absolute;
					width: 20px;
					height: 20px;
					top: 12px;
					right: 12px;
					background-color: white;

					&:hover {
						border-color: #f38357;

						/deep/ {
							.ivu-icon {
								color: #f38357;
							}
						}
					}
				}

				/deep/ {
					& > .config-panel {
						width: 100%;
						height: auto;
						padding: 0 10px;
						overflow-x: hidden;
						margin-bottom: 8px;
						resize: none;

						& > .ivu-collapse > .ivu-collapse-item-active {
							margin-bottom: 10px;
						}
					}

					.config-panel .ivu-collapse-item:first-child .ivu-collapse-header {
						margin-top: 6px;
					}

					.config-panel .ivu-collapse-header:after {
						right: 25px;
					}
				}
			}
		}

		.add-script {
			&:hover {
				border-color: #57a3f3;

				/deep/ {
					.ivu-icon {
						color: #57a3f3;
					}
				}
			}
		}

		.no-item {
			font-size: 15px;
			text-align: center;
			line-height: 5;
		}
	}
</style>
