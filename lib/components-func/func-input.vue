<template lang="pug">
	.d-manage-modal-control
		label {{config.label}}
		i-input(v-model="obj[inputKey]")
</template>
<script lang="ts">
import func from './mixins'
import {mixins} from 'vue-class-component'
import {Component} from 'vue-property-decorator'

@Component
export default class FuncInput extends mixins(func) {
	
}
</script>
