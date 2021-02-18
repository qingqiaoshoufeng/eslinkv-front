<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-slide-bg pos-r"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-slide-bg {
		width: 100%;
		height: 1050px;
		background: rgba(11, 0, 90, 0.9);
		border-left: 1px solid #00DDFF;
	}
</style>

