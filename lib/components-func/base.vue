<template lang="pug">
	.d-manage-modal-control-base
		.fn-flex.flex-row.d-manage-modal-control-more
			.d-manage-modal-control
				label 组件id
				i-input(v-model="item.id" :disabled="true")
			.d-manage-modal-control
				label 组件类型
				i-input(v-model="item.type" :disabled="true")
		.d-manage-modal-control
			label 组件名称
			i-input(v-model="item.config.widget.name" :disabled="platform.chooseWidgetState")
		.fn-flex.flex-row.d-manage-modal-control-more
			.d-manage-modal-control
				label 组件市场
				i-switch(v-model="item.market" :disabled="true")
			.d-manage-modal-control
				label 锁定
				i-switch(v-model="item.config.widget.locked")
			.d-manage-modal-control
				label 隐藏
				i-switch(v-model="item.config.widget.hide")
		.d-manage-modal-control
			label 场景
			i-input(v-model="item.scene" :disabled="true")

</template>
<script lang="ts">
	import func from './func'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncBase extends func {

	}
</script>
