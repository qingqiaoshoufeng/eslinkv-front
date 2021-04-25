<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-10 fn-flex flex-row">
			<h2>{{ config.config && config.config.title }}</h2>
			<p class="font-num">{{ data && data.value | toThousand }}</p>
			<span>{{ config.config && config.config.suffix }}</span>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value, customConfig } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss">
.h-title-10 {
	align-items: center;
	height: 100%;

	h2 {
		font-size: 24px;
		font-weight: normal;
		line-height: 24px;
		color: #0df;
	}

	p {
		margin-right: 4px;
		margin-left: 8px;
		font-size: 32px;
		line-height: 32px;
		color: #fff;
	}

	span {
		font-size: 18px;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.75);
	}
}
</style>
