<template lang="pug">
	.d-manage-modal-control
		label {{config.label}}
		Input(v-model="obj[inputKey]" type="textarea")
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncInputPanel extends mixins(func) {
		get obj() {
			let res = this.store.kanboard.panelConfig
			const props = this.config.prop.split('.')
			props.length = props.length - 1
			props.forEach(v => {
				res = res[v]
			})
			return res
		}

		get inputKey() {
			const props = this.config.prop.split('.')
			return props.reverse()[0]
		}
	}
</script>
