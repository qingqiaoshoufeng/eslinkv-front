<template>
	<div class="widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins';
	import options from './options'
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption(data) {
				options.yAxis[0].name = this.config.config.title
				options.series[0].data = data.data.map(item => item.value)
				options.xAxis[0].data = data.data.map(item => item.name)
				this.instance && this.instance.setOption(options)
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(val)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>

