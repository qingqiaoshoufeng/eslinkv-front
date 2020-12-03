<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="legend-box">
			<div class="unit">{{config.config.title}}</div>
			<div class="legend" v-if="config.config.showLegend">
				<div class="legend1">
					<div class="bgc1" :style="`backgroundColor:${config.config.color1};}`"></div>
					<div class="desc1">{{data.legend1 || config.config.desc1}}</div>
				</div>
				<div class="legend2">
					<div class="bgc2" :style="`backgroundColor:${config.config.color2};}`"></div>
					<div class="desc2">{{data.legend2 || config.config.desc2}}</div>
				</div>
			</div>
		</div>
		<div class="h-line-1" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';
	import {getInput, getBooleanInput, getInputNumber} from '../../../../lib'

	const configSource = {
		config: {
			fields: {
				color1: getInput('color1', '条形图颜色1'),
				color2: getInput('color2', '条形图颜色2'),
				desc1: getInput('desc1', '条形图名称1'),
				desc2: getInput('desc2', '条形图名称2'),
				title: getInput('title', '条形图单位'),
				showBackground: getBooleanInput('showBackground', '柱状图柱的背景'),
				showLegend: getBooleanInput('showLegend', '显示图例'),
				barBorderRadius: getInputNumber('barBorderRadius', '柱的圆角'),
			},
		},
	};

	const config = {
		animation: true,
		config: {
			color1: true,
			color2: true,
			desc1: true,
			desc2: true,
			title: true,
			showBackground: true,
			showLegend: true,
			barBorderRadius: true,
		}
	};
	const value = {
		api: {
			data: JSON.stringify({
				legend1: '', // 没有则取config中的数据
				legend2: '',
				data: [
					{yValue1: 120, yValue2: 120, xValue: '5月'},
					{yValue1: 200, yValue2: 200, xValue: '6月'},
					{yValue1: 150, yValue2: 150, xValue: '7月'},
					{yValue1: 80, yValue2: 80, xValue: '8月'},
					{yValue1: 70, yValue2: 70, xValue: '9月'},
					{yValue1: 110, yValue2: 110, xValue: '10月'},
					{yValue1: 130, yValue2: 130, xValue: '11月'},
				]
			}),
		},
		config: {
			color1: '#2C99FF',
			color2: '#01FDD2',
			desc1: '工商户',
			desc2: '居民户',
			title: '台',
			showLegend: true,
			showBackground: true,
			barBorderRadius: 4
		}
	};
	export default {
		mixins: [mixins],
		methods: {
			setOption() {
				this.instance && this.instance.setOption(getOption(this.data.data, this.config.config));
			},
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							);
							this.setOption();
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss">
	.h-line-1 {
		height: 100%;
	}

	.legend-box {
		width: 100%;
		height: 20px;
		display: flex;
		align-items: center;
		position: absolute;
		top: 10px;
		left: 0;

		.unit {
			width: 30px;
			text-align: right;
			color: #fff;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0;
			white-space: nowrap;
		}

		.legend {
			display: flex;
			position: absolute;
			left: 0;
			width: 100%;
			align-items: center;
			justify-content: center;

			.legend1, .legend2 {
				display: flex;
				align-items: center;
				margin-left: 20px;
			}

			.bgc1, .bgc2 {
				width: 16px;
				height: 8px;
			}

			.desc1, .desc2 {
				margin-left: 5px;
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: 16px;
				letter-spacing: 0px;
				color: #fff;

			}
		}

	}
</style>

