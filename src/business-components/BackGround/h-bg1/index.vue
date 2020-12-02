<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-bg1">
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

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
	.h-bg1 {
		background-color: rgba(0, 0, 0, 0.8);
		width: 3500px;
		height: 1050px;
	}

</style>

