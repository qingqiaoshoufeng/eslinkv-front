<template>
	<div class="chart" ref="line"/>
</template>
<script>
	import getOption from './options'

	/**
   lineColor: '',
   lineStopColor: '',
   scale: false, 刻度是否从0开始
   isShowMarker: false, 是否显示最大最小标记
   isShowXAxis: false 是否显示x轴
   * */

	export default {
		props: ['data', 'config'],
		methods: {
		},
		watch: {
			data: {
				handler (val) {
					this.$nextTick(() => {
						echarts.init(this.$refs.line).setOption(getOption(this.data, this.config))
					})
				},
				deep: true,
				immediate: true
			}
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>

