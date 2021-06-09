<template>
	<div class="widget-part" :style="styles">
		<div class="securitycheck-box">
			<div class="left">
				<div class="plan">
					<img :src="data && data.planTip" alt />
					<div class="desc">{{ data && data.planDesc }}</div>
					<div class="value font-num">
						{{ data && data.planValue | toThousand }}
					</div>
				</div>
				<div class="reality">
					<img :src="data && data.realTip" alt />
					<div class="desc">{{ data && data.realDesc }}</div>
					<div class="value font-num">
						{{ data && data.realValue | toThousand }}
					</div>
				</div>
			</div>
			<div class="right">
				<div class="h-line-1" :id="id"></div>
				<div class="context">
					<div class="percentage font-num">
						{{ `${data && data.percentage}%` }}
					</div>
					<div class="percentage-desc">本月安检率</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from '@eslinkv/vue2'
import options from './options'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	computed: {
		style() {
			const rotate = (this.data.percentage / 100) * 360
			return {
				transform: `rotate(${rotate}deg)`,
			}
		},
	},
	methods: {
		setOption(data) {
			let newData = []
			let newData1 = []
			let newData3 = []
			let newData4 = []

			for (let i = 0; i < data.percentage / 4; i++) {
				let opacity = (i * 4) / data.percentage
				if (opacity <= 0) opacity = 0.1
				newData = [
					...newData,
					{
						value: 3.5,
						itemStyle: {
							color: '#00FFCF',
						},
					},
					{
						value: 0.5,
						itemStyle: {
							color: 'rgba(0, 221, 255, 0)',
						},
					},
				]
				newData1 = [
					...newData1,
					{
						value: 3.5,
						itemStyle: {
							color: `rgba(0, 221, 255,${opacity})`,
						},
					},
					{
						value: 0.5,
						itemStyle: {
							color: 'rgba(255, 255, 255, 0)',
						},
					},
				]
				newData3 = [
					...newData3,
					{
						value: 4,
						itemStyle: {
							color: 'rgba(0, 221, 255, 0)',
						},
					},
				]
				newData4 = [
					...newData4,
					{
						value: 4,
						itemStyle: {
							color: `rgba(0, 221, 255,${opacity})`,
						},
					},
				]
			}
			for (let i = 0; i <= (100 - data.percentage) / 4; i++) {
				newData = [
					...newData,
					{
						value: 3.5,
						itemStyle: {
							color: 'rgba(0, 87, 169, 0.5)',
						},
					},
					{
						value: 0.5,
						itemStyle: {
							color: 'rgba(255, 255, 255, 0)',
						},
					},
				]
				newData1 = [
					...newData1,
					{
						value: 3.5,
						itemStyle: {
							color: 'rgba(255, 255, 255, .1)',
						},
					},
					{
						value: 0.5,
						itemStyle: {
							color: 'rgba(255, 255, 255, 0)',
						},
					},
				]
				newData3 = [
					...newData3,
					{
						value: 4,
						itemStyle: {
							color: 'rgba(255, 255, 255, 0)',
						},
					},
				]
				newData4 = [
					...newData4,
					{
						value: 4,
						itemStyle: {
							color: 'rgba(255, 255, 255, 0)',
						},
					},
				]
			}
			options.series[0].data = newData1
			options.series[1].data = newData
			options.series[2].data = newData3
			options.series[3].data = newData4
			this.instance && this.instance.setOption(options)
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val }
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id),
						)
						this.setOption(data)
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
}
</script>
<style lang="scss">
.securitycheck-box {
	display: flex;
	width: 100%;
	height: 100%;

	.left {
		display: flex;
		flex-direction: column;
		justify-items: center;
		width: 270px;
		height: 100%;

		.plan,
		.reality {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 50%;
		}

		.plan {
			padding-top: 50px;
		}

		.reality {
			margin-top: -25px;
		}

		img {
			width: 32px;
			height: 32px;
		}

		.desc {
			top: 107px;
			left: 56px;
			width: 126px;
			height: 32px;
			line-height: 32px;
			color: #fff;
		}

		.value {
			height: 32px;
			font-size: 32px;
			line-height: 32px;
			color: #fff;
		}
	}

	.right {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: start;
		width: 210px;

		.h-line-1 {
			width: 158px;
			height: 158px;
		}

		.context {
			position: absolute;
			top: 50%;
			left: 79px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100px;
			height: 100px;
			background-color: rgba(1, 1, 1, 0);
			border-radius: 50%;
			transform: translate(-50%, -50%);

			.percentage-desc {
				padding-top: 10px;
				font-size: 18px;
				font-style: normal;
				font-weight: 400;
				line-height: 25px;
				color: #fff;
				text-align: center;
			}

			.percentage {
				font-size: 32px;
				color: #fff;
				text-align: center;
			}
		}
	}
}
</style>
