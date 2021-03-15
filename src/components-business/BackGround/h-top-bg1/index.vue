<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;${inPreview ? 'pointer-events: none;' : ''}`">
		<div class="h-top-bg1">
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { value } from './index.component'

	export default {
		mixins: [mixins],
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-top-bg1 {
		width: 3500px;
		height: 200px;
		pointer-events: none;
		background: linear-gradient(180deg, rgba(0, 4, 98, 1) 0%, rgba(0, 4, 98, 0) 100%);
	}

</style>

