<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-slide-bg pos-r"></div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-slide-bg {
		width: 100%;
		height: 1050px;
		background: rgba(11, 0, 90, 0.9);
		border-left: 1px solid #0df;
	}
</style>

