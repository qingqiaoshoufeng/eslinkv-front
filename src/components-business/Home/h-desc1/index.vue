<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="content">
			<span class="num font-num">{{ data.value | toThousand }}</span>
			<span class="unit">{{ config.config.unit }}</span>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss" scoped>
.content {
	font-size: 32px;
	font-weight: bold;
	line-height: 32px;
	color: #fff;
}
</style>
