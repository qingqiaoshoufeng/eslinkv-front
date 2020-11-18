<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;${inPreview?'pointer-events: none;':''}`">
		<div class="h-left-bg2">
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import addMonths from 'date-fns/addMonths'
	import isSameMonth from 'date-fns/isSameMonth'
	import format from 'date-fns/format'

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
	.h-left-bg2 {
		pointer-events: none;
		width: 400px;
		height: 1050px;
		background: linear-gradient(90deg, rgba(0, 11, 62, 0.9) 0%, rgba(0, 11, 62, 0.0001) 100%);
	}

</style>

