<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-slide-bg pos-r"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart from '../../../openApi'

	const config = {animation: true}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config)
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

