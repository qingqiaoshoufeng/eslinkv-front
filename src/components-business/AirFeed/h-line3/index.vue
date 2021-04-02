<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id" />
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import getOption from './options'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data))
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id),
						)
						this.setOption()
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.chart {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
