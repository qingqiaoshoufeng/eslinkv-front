<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;${inPreview?'pointer-events: none;':''}`">
		<div class="h-left-bg2">
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-left-bg2 {
		pointer-events: none;
		width: 400px;
		height: 1050px;
		background: linear-gradient(90deg, rgba(0, 4, 98, 1) 0%, rgba(0, 4, 98, 0) 100%);
	}
</style>

