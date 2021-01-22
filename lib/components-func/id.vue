<template lang="pug">
	.d-manage-modal-control
		label 组件id
		Input(v-model="item.id" :disabled="true")
	</div>
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class extends mixins(func) {

	}
</script>
