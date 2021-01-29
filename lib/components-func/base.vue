<template lang="pug">
	div
		.d-manage-modal-control
			label 组件id
			i-input(v-model="item.id" :disabled="true")
		.d-manage-modal-control
			label 组件类型
			i-input(v-model="item.type" :disabled="true")
</template>
<script lang="ts">
	import func from './func'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncBase extends func {
		
	}
</script>
