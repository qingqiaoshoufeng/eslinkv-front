<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;${inPreview?'pointer-events: none;':''}`">
		<div class="h-top-bg1">
			{{readonly}}
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
	.h-top-bg1 {
		pointer-events: none;
		background: linear-gradient(180deg, rgba(0, 27, 98, 1) 0%, rgba(0, 27, 98, 0) 100%);
		width: 3500px;
		height: 200px;
	}

</style>

