<template>
	<div
		class="widget-part pos-r"
		:style="`${styles};top:0;${inPreview ? 'pointer-events: none;' : ''}`"
	>
		<div class="h-left-bg2"></div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.h-left-bg2 {
	width: 400px;
	height: 1050px;
	pointer-events: none;
	background: linear-gradient(
		90deg,
		rgba(0, 4, 98, 1) 0%,
		rgba(0, 4, 98, 0) 100%
	);
}
</style>
