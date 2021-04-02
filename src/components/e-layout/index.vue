<template lang="pug">
.e-layout-container
	.e-layout-content
		e-header
		slot
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ELayout extends Vue {}
</script>
<style lang="scss" scoped>
.e-layout-content {
	padding-top: 50px;
}
</style>
