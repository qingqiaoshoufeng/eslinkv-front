<template>
	<div
		class="widget-part pos-r"
		:class="{ 'pointer-no': inPreview }"
		:style="styles"
	>
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
.h-right-bg2 {
	width: 2200px;
	height: 1050px;
	pointer-events: none;

	i {
		top: 0;
		left: 0;
		width: 2200px;
		height: 1050px;
		background: linear-gradient(
			270deg,
			rgba(0, 4, 98, 1) 0%,
			rgba(0, 4, 98, 0) 100%
		);
	}
}
</style>
