<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="legend-box">
			<div class="unit">{{ config.config.unit1 }}</div>
			<div class="legend">
				<div class="legend1">
					<div class="bgc1" :style="`backgroundColor:${config.config.color1};}`"></div>
					<div class="desc1">{{ config.config.desc1 }}</div>
				</div>
				<div class="legend2">
					<div class="bgc2" :style="`backgroundColor:${config.config.color2};}`"></div>
					<div class="desc2">{{ config.config.desc2 }}</div>
				</div>
			</div>
			<div class="unit unit2">{{ config.config.unit2 }}</div>
		</div>
		<div class="h-line-1" :id="id"/>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import options from './options'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			setOption (data) {
				const xValue = data.map(item => item.xValue)
				const yValue1 = data.map(item => item.yValue1)
				const yValue2 = data.map(item => item.yValue2)
				options.xAxis.data = xValue
				options.series[0].data = yValue1
				options.series[0].itemStyle.normal.color = this.config.config.color1
				options.series[1].itemStyle.normal.color = this.config.config.color2
				options.series[1].data = yValue2
				this.instance && this.instance.setOption(options)
			}
		},
		watch: {
			data: {
				handler (val) {
					if (this.id) {
						const data = [...val]
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							)
							this.setOption(data)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
	.h-line-1 {
		height: 100%;
	}

	.legend-box {
		position: absolute;
		top: 10px;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 20px;

		.unit {
			width: 30px;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 16px;
			color: #fff;
			text-align: right;
			letter-spacing: 0;

			&.unit2 {
				padding-right: 20px;
			}
		}

		.legend {
			position: absolute;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			.legend1,
			.legend2 {
				display: flex;
				align-items: center;
				margin-left: 20px;
			}

			.bgc1,
			.bgc2 {
				width: 16px;
				height: 8px;
			}

			.desc1,
			.desc2 {
				margin-left: 5px;
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: 16px;
				color: #fff;
				letter-spacing: 0;
			}
		}
	}
</style>

