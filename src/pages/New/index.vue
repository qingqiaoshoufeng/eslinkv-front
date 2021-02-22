<template lang="pug">
	.home-container
		.layout-wrapper
			.main-container
				core(ref="kanboardEditor" @querying="status => (querying = status)" @kanboard-edited="kanboardEdited = true")
				load-mask(:show="querying") {{querying ? '请求模板数据…' : '正在生成快照…'}}
			d-footer
</template>
<script>
	import core from '../../../lib/views/core/index'
	import loadMask from '../../../lib/components/load-mask/index'
	import dFooter from '../../../lib/components/d-footer/index'

	export default {
		name: 'New',
		provide() {
			return {kanboard: this}
		},
		components: {
			core,
			loadMask,
			'd-footer': dFooter,
		},
		data() {
			return {
				ready: false,
				querying: false,
				kanboardEdited: false,
			};
		},
		mounted() {
			document.title = '新增 - 数据看板'
		},
	};
</script>

<style lang="scss" scoped>
	.home-container {
		height: 100%;
		overflow: hidden;
	}

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
		background-color: #ffffff;
	}

	/deep/ {
		.ivu-steps {
			position: absolute;
			top: 8px;
			left: 140px;
			width: calc(100% - 200px);

			.ivu-steps-title {
				line-height: 26px;
			}
		}
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

