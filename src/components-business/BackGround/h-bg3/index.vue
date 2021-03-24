<template lang="pug">
	.widget-part.pos-r(:style="`${styles};top:0;}`")
		.h-bg3
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
	.h-bg3 {
		width: 3500px;
		height: 1050px;
		background: linear-gradient(180deg, #010563 0%, #030087 81.77%, #090072 100%);
	}
</style>

