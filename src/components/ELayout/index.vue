<template lang="pug">
	.layout-container.fn-flex.flex-row
		e-left
		slot
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'

	@Component
	export default class Left extends Vue {
	}
</script>
<style lang="scss" scoped>
	@import "../../scss/conf";

	.layout-container {
		
	}
</style>
