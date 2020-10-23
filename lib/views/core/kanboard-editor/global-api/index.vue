<template>
	<div class="global-api-panel" @click.stop>
		<header class="header">
			<div>全局数据源配置</div>
			<div class="add-api action-button" @click="addApiConfig">
				<Icon type="md-add" size="18"/>
			</div>
		</header>
		<div class="config-panel-wrapper">
			<template v-if="apis.length">
				<div v-for="(api, index) in apis" :key="index" class="config-panel-item">
					<config-panel
						v-model="apis[index]"
						:source="getSource(index)"
						@config-database="data => handleDatabaseConfig(data, index)"
					/>
					<div class="remove-item action-button" @click="removeApiConfig(index)">
						<Icon type="md-close" size="16"/>
					</div>
				</div>
			</template>
			<div v-else class="no-item">暂无配置</div>
		</div>
		<!-- 数仓配置面板 -->
		<database-config
			ref="dataBaseConfig"
			:showModal="showDatabaseConfigModal"
			@close="showDatabaseConfigModal = false"
			@update="updateApiSystem"
			@keyup.native.stop
		/>
	</div>
</template>
<script>
	import configPanel from '../../config-panel'
	import configSource from './config-source'
	import configValue from './config-value'
	import sourceToLayout from '../../widgets/parts/lib/source-to-layout'
	import databaseConfig from '../data-warehouse/index.vue'
	import copy from 'fast-copy'
	import {Icon} from 'view-design'

	export default {
		name: 'global-api',
		components: {
			configPanel,
			databaseConfig,
			Icon
		},
		data() {
			return {
				apis: [],
				emitTimer: null,
				showDatabaseConfigModal: false,
				showJsEditorModal: false,
				currentSystemConfigIndex: null
			}
		},
		methods: {
			addApiConfig() {
				this.apis.push(copy(configValue))
			},
			removeApiConfig(index) {
				this.$Modal.confirm({
					title: '删除配置',
					content: '是否删除当前接口配置？该操作不可恢复。',
					onOk: async () => {
						this.apis.splice(index, 1)
					},
					onCancel: () => {
					},
					okText: '删除',
					cancelText: '取消'
				})
			},
			getSource(index) {
				const source = {...configSource}
				source.api.groupLabel = '全局数据源配置 ' + (index + 1)
				return sourceToLayout(source)
			},
			setGlobalApiConfig(apis = []) {
				this.apis = apis.map(api => {
					return {api}
				})
			},
			emitUpdate(value) {
				if (this.emitTimer) clearTimeout(this.emitTimer)
				this.emitTimer = setTimeout(() => {
					this.$emit('global-api-update', value.map(config => config.api))
					this.emitTimer = null
				}, 500)
			},
			handleDatabaseConfig(payload, index) {
				const api = this.apis[index].api
				if (!api.system.enable) {
					this.$Message.warning('请先在小工具配置面板开启数仓配置！')
					return
				}
				this.currentSystemConfigIndex = index
				this.showDatabaseConfigModal = true
				this.$refs.dataBaseConfig.setQueryCond(api.system.params)
			},
			updateApiSystem(value) {
				if (this.currentSystemConfigIndex === null) {
					this.$Message.warning('配置数据异常！')
				}
				const api = this.apis[this.currentSystemConfigIndex].api
				Object.assign(api.system.params, value)
				this.showDatabaseConfigModal = false
			}
		},
		watch: {
			apis: {
				handler: 'emitUpdate',
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.global-api-panel {
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

		.add-api {
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
