<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;pointer-events: none;`">
		<div class="h-right-bg2 pos-r">
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
			<i class="pos-a"></i>
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
	.h-right-bg2 {
		pointer-events: none;
		width: 2200px;
		height: 1050px;

		i {
			width: 2200px;
			height: 1050px;
			left: 0;
			top: 0;
			background: linear-gradient(270deg, #00153E 0%, rgba(0, 21, 62, 0) 100%);
		}
	}

</style>

