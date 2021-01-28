<template lang="pug">
	.d-manage-modal-control
		label {{config.label}}
		i-colorPicker(:alpha="true" v-model="objPanel[inputKeyPanel]")
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncColorPanel extends mixins(func) {

	}
</script>
<style lang="scss" scoped>
	.d-manage-modal-control{
		/deep/ {
			.ivu-color-picker-confirm {
				.ivu-btn-default {
					margin-right: 5px;
				}
			}
		}
	}
</style>
