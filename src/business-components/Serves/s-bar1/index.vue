<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="legend-box">
			<div class="unit">{{config.config&&config.config.title}}</div>
			<div class="legend">
				<div class="legend1">
					<div class="bgc1" :style="`backgroundColor:${config.config&&config.config.color1};}`"></div>
					<div class="desc1">{{config.config&&config.config.desc1}}</div>
				</div>
				<div class="legend2">
					<div class="bgc2" :style="`backgroundColor:${config.config&&config.config.color2};}`"></div>
					<div class="desc2">{{config.config&&config.config.desc2}}</div>
				</div>
				<div class="legend2">
					<div class="bgc3" :style="`backgroundColor:${config.config&&config.config.color3};}`"></div>
					<div class="desc3">{{config.config&&config.config.desc3}}</div>
				</div>
			</div>
		</div>
		<div class="h-line-1" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import options from './options';
	import {getInput, getBooleanInput} from "@lib";

	const configSource = {
		config: {
			fields: {
				color1: getInput('color1', '1颜色'),
				desc1: getInput('desc1', '1描述'),
				color2: getInput('color2', '2颜色'),
				desc2: getInput('desc2', '2描述'),
				color3: getInput('color3', '3颜色'),
				desc3: getInput('desc3', '3描述'),
				title: getInput('title', '标题'),
        lineSmooth: getBooleanInput('lineSmooth', '曲线是否平滑')
			}
		},
	}
	const config = {
		animation: true,
		config: {
			color1: true,
			desc1: true,
			color2: true,
			desc2: true,
			color3: true,
			desc3: true,
			title: true,
      lineSmooth: true,
		}
	};
	const value = {
		config: {
			color1: '#00DDFF',
			color2: '#0057A9',
			color3: '#01FDD2',
			desc1: '绑定户数',
			desc2: '抄表户数',
			desc3: '自助抄表率',
			title: '户',
      lineSmooth: true,
      hasSymbal: true,
		},
		api: {
			data: JSON.stringify([
				{
					yValue1: 120,
					yValue2: 130,
					yValue3: 30,
					xValue: '5月'
				},
				{
					yValue1: 200,
					yValue2: 400,
					yValue3: 10,
					xValue: '6月'
				},
				{
					yValue1: 150,
					yValue2: 170,
					yValue3: 20,
					xValue: '7月'
				},
				{
					yValue1: 80,
					yValue2: 100,
					yValue3: 30,
					xValue: '8月'
				},
				{
					yValue1: 70,
					yValue2: 100,
					yValue3: 30,
					xValue: '9月'
				},
				{
					yValue1: 110,
					yValue2: 110,
					yValue3: 50,
					xValue: '10月'
				},
				{
					yValue1: 130,
					yValue2: 130,
					yValue3: 30,
					xValue: '11月'
				},
			]),
		},
	};
	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				options.xAxis[0].data = data.map(item => item.xValue);
				options.series[1].data = data.map(item => item.yValue1);
				options.series[0].data = data.map(item => item.yValue2);
				options.series[2].data = data.map(item => item.yValue3)
				options.series[0].itemStyle.normal.color = this.config.config.color2;
				options.series[1].itemStyle.normal.color = this.config.config.color1;
				options.series[2].itemStyle.normal.color = this.config.config.color3;
				options.series[2].smooth = this.config.config.lineSmooth
				this.instance && this.instance.setOption(options);
			},
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = [...val];
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							);
							this.setOption(data);
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
			//styleName: 文字/16;
			font-family: PingFang SC;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0px;
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

			.bgc1, .bgc2, .bgc3 {
				width: 16px;
				height: 8px;
			}

			.bgc3 {
				height: 2px;
			}

			.desc1, .desc2, .desc3 {
				margin-left: 5px;
				font-family: PingFang SC;
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

