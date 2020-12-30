<template lang="pug">
	.widget-part.pos-r(:style="`${styles};top:0;}`")
		.h-bg3
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
	.h-bg3 {
		background: linear-gradient(180deg, #010563 0%, #030087 81.77%, #090072 100%);
		width: 3500px;
		height: 1050px;
	}
</style>

