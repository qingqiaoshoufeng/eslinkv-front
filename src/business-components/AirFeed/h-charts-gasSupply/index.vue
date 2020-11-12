<template>
	<div class="h-call-count-statistics widget-part" :style="styles">
		<div class="legend">
			<div class="legend-item">
				<div class="tanc"></div>
				<div class="txt">供气量</div>
			</div>
			<div class="legend-item">
				<div class="line-legend"></div>
				<div class="txt">同比</div>
			</div>
			<div class="legend-item">
				<div class="line-legend green"></div>
				<div class="txt">环比</div>
			</div>
		</div>
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	import getOptions, { barData, lineData, dashLineData } from './options'

	const config = {animation: true}
	const value = {
		api: {
			data: JSONStringify({
				barData: barData,
				lineData: lineData,
				dashLineData: dashLineData
			})
		}
	}
	export default {
		mixins: [mixins],
		computed: {
		},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOptions(this.data.barData, this.data.lineData, this.data.dashLineData))
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
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		}
	}
</script>
<style lang="scss" scoped>
.widget-part {
	position: relative;
	.legend {
		position: absolute;
		left: 0;
		top: 22px;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 16px;
		line-height: 16px;
		color: #FFFFFF;
		.legend-item {
			display: flex;
			align-items: center;
			margin: 0 8px;
		}
		.tanc {
			width: 16px;
			height: 8px;
			background: #00DDFF;
		}
		.line-legend {
			width: 16px;
			height: 2px;
			background: #E5615B;
			&.green {
				background: #00FFCF;
			}
		}
		.txt {
			margin-left: 4px;
		}
	}
}
.chart {
	width: 100%;
	height: 100%;
}
</style>

