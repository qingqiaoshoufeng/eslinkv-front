<template lang="pug">
	.fn-flex.flex-row.d-manage-modal-control-size
		.d-manage-modal-control
			label 宽度
			InputNumber(:min="1" :step="1" v-model="store.kanboard.panelConfig.size.width")
		.d-manage-modal-control
			label 高度
			InputNumber(:min="1" :step="1" v-model="store.kanboard.panelConfig.size.height")
		.d-manage-modal-control
			label 单位
			InputNumber(:min="1" :step="1" v-model="store.kanboard.panelConfig.size.height")
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncInputPanel extends mixins(func) {

	}
</script>
<style lang="scss" scoped>
	.d-manage-modal-control-size {
		.d-manage-modal-control {
			margin-left: 10px;

			&:nth-child(1) {
				margin-left: 0;
			}
		}
	}
</style>
