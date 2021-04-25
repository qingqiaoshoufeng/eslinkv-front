<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-5">
			<p class="pos-r text-left">{{ data && data.title }}工艺图</p>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss">
.h-title-5 {
	p {
		padding-bottom: 16px;
		font-size: 32px;
		font-weight: 600;
		line-height: 32px;
		color: #fff;
		border-bottom: 2px solid rgba(255, 255, 255, 0.4);

		&::before,
		&::after {
			position: absolute;
			bottom: 0;
			width: 48px;
			height: 2px;
			content: '';
			background: #0df;
		}

		&::before {
			left: 0;
		}

		&::after {
			right: 0;
		}
	}
}
</style>
