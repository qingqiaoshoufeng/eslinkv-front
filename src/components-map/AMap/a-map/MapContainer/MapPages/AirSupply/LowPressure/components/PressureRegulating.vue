<template lang="pug">
	.container
		.title 调压器
		.address 宁围镇振宁路1400号
		.info
			.type
				.color
				span 报警类型
			.time 11-03  08:23:27
		.title2 近8小时压力趋势
		.chart(ref="chart")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PressureRegulating extends Vue {
	@Prop() showMapPage

	getOption(data) {
		return {
			textStyle: {
				fontSize: 16,
				color: '#FFF',
			},
			grid: {
				top: 40,
				left: 30,
				bottom: 30,
				right: 30,
			},
			tooltip: {
				trigger: 'axis',
				triggerOn: 'mousemove|click',
			},
			legend: {
				icon: 'rect',
				orient: 'horizontal',
				align: 'left',
				top: '2%',
				itemWidth: 16,
				itemHeight: 2,
				itemGap: 8,
				textStyle: {
					color: '#fff',
					fontSize: 16,
				},
			},
			color: ['#FB592C', '#00FFCF', '#FFDC45', '#56C1FF'],
			xAxis: [
				{
					type: 'category',
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						color: '#fff',
						fontSize: 16,
						lineHeight: 16,
						interval: 0,
					},
					offset: 5,
					data: data.map(v => v.x),
				},
			],
			yAxis: [
				{
					type: 'value',
					show: true,
					name: '进站/Mpa',
					axisTick: {
						show: false,
						textStyle: {
							color: '#fff',
						},
					},
					axisLabel: {
						textStyle: {
							color: '#fff',
							fontSize: 16,
							lineHeight: 16,
						},
					},
					splitLine: {
						show: true,
						lineStyle: {
							type: 'solid',
							color: 'rgba(199, 209, 219, 0.2)',
						},
					},
					splitNumber: 4,
					axisLine: {
						show: false,
					},
					nameTextStyle: {
						color: '#fff',
						fontSize: 14,
						padding: [0, -10, 0, 0]
					},
				},
				{
					name: '出站/Mpa',
					type: 'value',
					nameTextStyle: {
						color: '#fff',
						fontSize: 14,
						padding: [0, 0, 0, -10]
					},
					splitLine: {
						show: false,
					},
					axisLabel: {
						color: '#fff',
						fontSize: 16,
						lineHeight: 16,
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					splitNumber: 4,
				},
			],
			series: [
				{
					name: '进站压力01',
					type: 'line',
					symbol: 'none',
					smooth: true,
					data: data.map(v => v.push1),
				},
				{
					name: '出站压力01',
					type: 'line',
					symbol: 'none',
					lineStyle: {
						type: 'dotted',
					},
					smooth: true,
					yAxisIndex: 1,
					data: data.map(v => v.pop1),
				},
				{
					name: '出站压力02',
					type: 'line',
					symbol: 'none',
					lineStyle: {
						type: 'dotted',
					},
					smooth: true,
					yAxisIndex: 1,
					data: data.map(v => v.pop2),
				},
				{
					name: '出站压力03',
					type: 'line',
					symbol: 'none',
					lineStyle: {
						type: 'dotted',
					},
					smooth: true,
					yAxisIndex: 1,
					data: data.map(v => v.pop3),
				},
			],
		}
	}
	
	mounted () {
		echarts.init(this.$refs.chart).setOption(this.getOption([
			{
				x: '11.1',
				push1: 2,
				pop3: 3,
				pop1: 4,
				pop2: 5,
			},
			{
				x: '11.2',
				push1: 9,
				pop3: 4,
				pop1: 2,
				pop2: 11,
			},
			{
				x: '11.3',
				push1: 3,
				pop3: 6,
				pop1: 14,
				pop2: 9,
			},
			{
				x: '11.4',
				push1: 11,
				pop3: 6,
				pop1: 1,
				pop2: 5,
			},
			{
				x: '11.5',
				push1: 9,
				pop3: 7,
				pop1: 6,
				pop2: 4,
			},
			{
				x: '11.6',
				push1: 12,
				pop3: 13,
				pop1: 4,
				pop2: 15,
			},
		]))
	}
}
</script>
<style lang="scss" scoped>
.container {
	.title {
		font-weight: 600;
		font-size: 32px;
		line-height: 32px;
		color: #FFDC45;
	}
	.address {
		font-size: 24px;
		line-height: 24px;
		color: #FFFFFF;
		margin: 16px 0;
	}
	.info {
		display: flex;
		justify-content: space-between;
		.type {
			display: flex;
			align-items: center;
			font-size: 20px;
			color: #FFDC45;
			.color {
				width: 8px;
				height: 8px;
				background: #FFDC45;
				margin-right: 8px;
				border-radius: 50%;
			}
		}
		.time {
			width: 141px;
			height: 24px;
			background: #0057A9;
			border-radius: 12px;
			font-size: 16px;
			color: #FFFFFF;
			text-align: center;
			line-height: 24px;
		}
	}
	.title2 {
		background: linear-gradient(90deg, rgba(0, 87, 169, 0.4) 0%, rgba(0, 87, 169, 0) 100%);
		font-weight: 600;
		font-size: 20px;
		color: #FFFFFF;
		height: 40px;
		line-height: 40px;
		border-left: 4px solid #00DDFF;
		margin-top: 16px;
		padding-left: 8px;
		margin-bottom: 10px;
	}
	.chart {
		width: 100%;
		height: 200px;
	}
}
</style>
