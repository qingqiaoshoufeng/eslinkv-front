<template lang="pug">
	.d-manage-modal-control-base
		.fn-flex.flex-row.d-manage-modal-control-more
			.d-manage-modal-control
				label 组件id
				i-input(v-model="item.id" :disabled="true")
</template>
<script lang="ts">
	import func from './func.min'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncAnimation extends func {

	}
</script>
