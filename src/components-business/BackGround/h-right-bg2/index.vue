<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;${inPreview?'pointer-events: none;':''}`">
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
	import mixins from '../../../../lib/mixins'
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(value)
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
			background: linear-gradient(270deg, rgba(0, 4, 98, 1) 0%, rgba(0, 4, 98, 0) 100%);
		}
	}

</style>

