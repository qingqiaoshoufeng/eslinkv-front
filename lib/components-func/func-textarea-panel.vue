<template lang="pug">
	.d-manage-modal-control
		label {{config.label}}
		i-input(v-model="objPanel[inputKeyPanel]" type="textarea")
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncInputPanel extends mixins(func) {
		
	}
</script>
