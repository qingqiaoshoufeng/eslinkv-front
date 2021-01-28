<template lang="pug">
	.d-manage-modal-control-size
		.fn-flex.flex-row.d-manage-modal-control-3
			.d-manage-modal-control
				label 背景图片url地址
				i-input(v-model="platform.panelConfig.background.url")
		.d-manage-modal-control
			label 背景图片重复
			i-select(v-model="platform.panelConfig.background.repeat")
				i-option(value="repeat") repeat
				i-option(value="no-repeat") no-repeat
				i-option(value="repeat-x") repeat-x
				i-option(value="repeat-y") repeat-y
				i-option(value="space") space
				i-option(value="round") round
		.fn-flex.flex-row.d-manage-modal-control-2
			.d-manage-modal-control
				label 背景图片尺寸
				i-select(v-model="platform.panelConfig.background.size")
					i-option(value="cover") cover
					i-option(value="contain") contain
					i-option(value="auto") auto
			.d-manage-modal-control
				label 自定义
				i-input(v-model="platform.panelConfig.background.size")
		.fn-flex.flex-row.d-manage-modal-control-2
			.d-manage-modal-control
				label 背景图片位置
				i-select(v-model="platform.panelConfig.background.position")
					i-option(value="center") center
					i-option(value="left") left
					i-option(value="right") right
					i-option(value="top") top
					i-option(value="bottom") bottom
			.d-manage-modal-control
				label 自定义
				i-input(v-model="platform.panelConfig.background.position")
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncSizePanel extends mixins(func) {
		repeatChange(value) {
			// this.platform.panelConfig
		}
	}
</script>
<style lang="scss" scoped>
	.d-manage-modal-control-size {
		margin-bottom: 10px;
	}

	.d-manage-modal-control-2 {
		.d-manage-modal-control {
			flex: 1;
			&:nth-child(2) {
				margin-left: 10px;
			}
		}
	}
</style>
