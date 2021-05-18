<template>
	<div class="widget-part" :style="styles"></div>
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
	width: 100%;
	height: 100%;
	background: url('./img/activity-service-bg.jpg') no-repeat;
	background-size: 100% 100%;
}
</style>
