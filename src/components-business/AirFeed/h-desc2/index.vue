<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="val">{{ data.value | toThousand }}</div>
		<div class="unit">({{ config.config.unit }})</div>
		<div class="title">
			{{ config.config.title1 }}
			<br />
			{{ config.config.title2 }}
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
<style lang="scss" scoped>
.widget-part {
	padding-top: 16px;
	background: linear-gradient(
		180deg,
		rgba(0, 87, 169, 0) 0%,
		rgba(0, 87, 169, 0.5) 100%
	);

	.val {
		font-family: font-num;
		font-size: 40px;
		font-style: normal;
		font-weight: bold;
		line-height: 48px;
		color: #0df;
	}

	.unit {
		margin: 8px 0 22px;
		font-size: 20px;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.75);
	}

	.title {
		font-size: 20px;
		line-height: 32px;
		color: #fff;
	}
}
</style>
