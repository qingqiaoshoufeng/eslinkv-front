<template lang="pug">
	.d-manage-modal-control
		label {{config.label}}
		Input(v-model="item[config.prop]" :disabled="config.disabled")
</template>
<script lang="ts">
import func from './mixins'
import {mixins} from 'vue-class-component'
import {Component} from 'vue-property-decorator'

@Component
export default class extends mixins(func) {

}
</script>
