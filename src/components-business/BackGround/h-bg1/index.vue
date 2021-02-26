<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-bg1">
		</div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value)
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

