<template>
	<div class="layout-wrapper">
		<div class="main-container">
			<core ref="kanboardEditor" @kanboard-edited="kanboardEdited = true"/>
		</div>
		<d-footer :kanboardEdited="kanboardEdited"/>
	</div>
</template>
<script>
	import core from '../core/index'
	import loadMask from '../../components/load-mask'
	import dFooter from '../../components/d-footer'
	import {Button, Input, Modal, Form, FormItem} from 'view-design'
	import '@/components-market'
	import platform from '../../store/platform.store'

	export default {
		name: 'Edit',
		provide() {
			return {kanboard: this}
		},
		components: {
			Button,
			core,
			Modal,
			loadMask,
			'd-footer': dFooter,
			'i-input': Input, Form, FormItem
		},
		props: {
			data: {
				type: String,
				default: null,
			}
		},
		data() {
			return {
				querying: true,
				kanboardEdited: false,
				platform: platform.state,
			};
		},
	}
</script>

<style lang="scss" scoped>
	.layout-wrapper {
		width: 100%;
		height: 100%;
		padding: 0 !important;
		display: flex;
		flex-direction: column;
	}

	.main-container {
		width: 100%;
		height: calc(100% - 50px);
	}

	.line {
		width: 100%;
		border-bottom: 1px dashed #414141;
		margin: 13px 0;
		opacity: 0.4;
	}

	#kanban:-webkit-full-screen {
		width: 100%;
		height: 100%;
	}
</style>
<style lang="scss">
	.d-editor-box {
		.left {
			.components {
				.ivu-collapse-header {
					background-color: #fff;
				}

				.ivu-collapse-content {
					background-color: #f8f8f8;
					overflow: auto;
				}
			}
		}

		.right {
			.ivu-tabs-tab {
				padding: 6px 10px !important;
			}

			.ivu-collapse {
				border: 0;
				margin-bottom: 16px;
			}

			.ivu-collapse-header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.ivu-icon {
					margin: 0;
				}
			}

			.ivu-collapse-content {
				background-color: #f8f8f8;
				padding: 0;
			}

			.ivu-form-item-content {
				margin-left: 75px;
			}
		}
	}

	.form-wrapper {
		padding: 10px;

		.form-item {
			display: flex;
			align-items: center;
			margin-top: 10px;
		}

		.form-label {
			white-space: nowrap;
			padding-right: 1em;
			min-width: 5em;
		}
	}
</style>
