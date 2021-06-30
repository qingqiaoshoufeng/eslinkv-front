<template lang="pug">
.container
	.title {{ data.name }}
	.address {{ info.address }}
	.info(v-if="info.time")
		.type
			.color
			span {{ info.status }}
		.time {{ info.time }}
	.title2 近8小时压力趋势
	.chart(ref="chart")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getLowMapDetailInfo } from '@/components-map-api/map.airSupply.api.js'

@Component
export default class VoltageRegulator extends Vue {
	@Prop() data

	info: any = {}

	@Watch('data', { deep: true, immediate: true })
	dataChange(val) {
		if (val) {
			this.$nextTick(async () => {
				await this.getData()
				window.echarts
					.init(this.$refs.chart)
					.setOption(this.getOption(this.info.list))
			})
		}
	}

	getOption(data) {
		return {
			textStyle: {
				fontSize: 16,
				color: '#FFF',
			},
			grid: {
				top: 40,
				left: 50,
				bottom: 30,
				right: 50,
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
					},
					data: data.map(v => v.x),
				},
			],
			yAxis: [
				{
					type: 'value',
					show: true,
					name: '进站/Mpa',
          scale: true,
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
						padding: [0, -10, 0, 0],
					},
				},
				{
					name: '出站/Mpa',
					type: 'value',
					nameTextStyle: {
						color: '#fff',
						fontSize: 14,
						padding: [0, 0, 0, -10],
					},
          scale: true,
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

	async getData() {
		this.info = await getLowMapDetailInfo({
			type: 'VoltageRegulator',
			id: this.data.id,
			name: this.data.name,
		})
	}
}
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	.title {
		font-weight: 600;
		font-size: 32px;
		line-height: 32px;
		color: #ffdc45;
	}
	.address {
		font-size: 24px;
		line-height: 24px;
		color: #ffffff;
		margin: 16px 0;
	}
	.info {
		display: flex;
		justify-content: space-between;
		.type {
			display: flex;
			align-items: center;
			font-size: 20px;
			color: #ffdc45;
			.color {
				width: 8px;
				height: 8px;
				background: #ffdc45;
				margin-right: 8px;
				border-radius: 50%;
			}
		}
		.time {
			width: 141px;
			height: 24px;
			background: #0057a9;
			border-radius: 12px;
			font-size: 16px;
			color: #ffffff;
			text-align: center;
			line-height: 24px;
		}
	}
	.title2 {
		background: linear-gradient(
			90deg,
			rgba(0, 87, 169, 0.4) 0%,
			rgba(0, 87, 169, 0) 100%
		);
		font-weight: 600;
		font-size: 20px;
		color: #ffffff;
		height: 40px;
		line-height: 40px;
		border-left: 4px solid #00ddff;
		margin-top: 16px;
		padding-left: 8px;
		margin-bottom: 10px;
	}
	.chart {
		width: 660px;
		height: 200px;
	}
}
</style>
