<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-bg3">
		</div>
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
	.h-bg3 {
		background: linear-gradient(180deg, #010563 0%, #030087 81.77%, #090072 100%);
		width: 3500px;
		height: 1050px;
	}
</style>

