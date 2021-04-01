<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-bg1">
		</div>
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
	.h-bg1 {
		width: 3500px;
		height: 1050px;
		background-color: rgba(0, 0, 0, 0.8);
	}

</style>

