<template>
	<div class="widget-part" :style="`${styles};top:0;}`"></div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		width: 100%;
		height: 100%;
		background: url("./img/bg.png") no-repeat;
		background-size: 100% 100%;
	}

</style>

