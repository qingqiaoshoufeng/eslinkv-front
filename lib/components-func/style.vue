<template lang="pug">
	.d-manage-modal-control-style
		.fn-flex.flex-row.d-manage-modal-control-more
			.d-manage-modal-control
				label 宽度
				i-inputNumber(:min="1" :step="1" v-model="item.config.layout.size.width")
			.d-manage-modal-control
				label 高度
				i-inputNumber(:min="1" :step="1" v-model="item.config.layout.size.height")
			.d-manage-modal-control
				label 单位
				i-select(v-model="item.config.layout.size.unit")
					i-option(value="px") px
					i-option(value="%") %
					i-option(value="rem") rem
					i-option(value="em") em
					i-option(value="vw") vw
					i-option(value="vh") vh
		.fn-flex.flex-row.d-manage-modal-control-more
			.d-manage-modal-control
				label 可见度
				i-inputNumber(:min="1" :step="1" v-model="item.config.layout.zIndex")
			.d-manage-modal-control
				label 透明度
				i-inputNumber(:min="0" :step=".1" :max="1" v-model="item.config.layout.opacity")
			.d-manage-modal-control
				label 内容溢出
				i-select(v-model="item.config.layout.overflow" :clearable="true")
					i-option(value="") 默认
					i-option(value="visible") visible
					i-option(value="hidden") hidden
					i-option(value="scroll") scroll
					i-option(value="auto") auto
					i-option(value="inherit") inherit
</template>
<script lang="ts">
	import func from './func'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncStyle extends func {
	}
</script>
<style lang="scss" scoped>
	.d-manage-modal-control-style {
		margin-bottom: 10px;
	}
</style>
