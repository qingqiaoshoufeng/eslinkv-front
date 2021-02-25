<template>
	<div class="left-bottom-right widget-part" :style="styles">
		<div class="left-bottom-right-top">
			<div class="left-bottom-right-top-content">
				<div class="left-bottom-right-top-echarts">
					<div
						class="bottom-right-top-echarts-wrap"
						:id="`left-bottom-right-top-echarts-${randomId}`"
					></div>
					<div
						class="bottom-right-top-echarts-bg-btn"
						ref="pieBgBtn"
					></div>
					<div
						class="bottom-right-top-echarts-bg-top"
						ref="pieBgTop"
					></div>
				</div>
				<div class="left-bottom-right-top-text">
					<ul>
						<li
							v-for="(item, index) in gasPercent"
							:key="index + 'percent'"
						>
							<span></span>
							<span>{{ item.typeName }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import highcharts from 'highcharts'
	import highcharts3d from 'highcharts/highcharts-3d'
	import lottie from 'lottie-web'
	import pieBgBtnJson from './yuan1.json'
	import pieTopBg from './yuan2.json'
	import {value} from './index.component'

	highcharts3d(highcharts)
	import mixins from '../../../../lib/mixins'

	export default {
		name: 'baoji-big-screen-wrap',
		data() {
			return {
				gasPercent: [],
				randomId: Math.random(),
			}
		},
		mixins: [mixins],
		created() {

			this.configValue = this.parseConfigValue(value)
		},
		watch: {
			data: {
				handler(val) {
					this.$nextTick(() => {
						this.renderChart()
					})
				},
				deep: true,
				immediate: true,
			},
		},
		mounted() {
			const pieBgBtn = lottie.loadAnimation({
				animationData: pieBgBtnJson,
				loop: true,
				autoplay: true,
				renderer: 'svg',
				container: this.$refs.pieBgBtn, // 容器 //渲染方式，有"html"、"canvas"和"svg"三种
			})
			pieBgBtn.play()
			const pieBgTop = lottie.loadAnimation({
				animationData: pieTopBg,
				loop: true,
				autoplay: true,
				renderer: 'svg',
				container: this.$refs.pieBgTop, // 容器 //渲染方式，有"html"、"canvas"和"svg"三种
			})
			pieBgTop.play()
		},
		methods: {
			renderChart() {
				this.init()
			},
			init() {
				this.gasPercent = this.data || []
				this.drawLeftBottmRightTop(this.gasPercent)
			},
			drawLeftBottmRightTop(attr) {
				let _newData = []
				attr.forEach(item => {
					let itemData = []
					itemData.push(item.typeName)
					itemData.push(item.percent)
					_newData.push(itemData)
				})
				var chart = highcharts.chart(
					`left-bottom-right-top-echarts-${this.randomId}`,
					{
						chart: {
							type: 'pie',
							options3d: {
								enabled: true,
								alpha: 55,
							},
							style: {
								backgroundColor: 'none',
							},
							backgroundColor: '',
						},
						plotOptions: {
							pie: {
								innerSize: 60,
								depth: 12,
								allowPointSelect: false,
								showInLegend: false,
								dataLabels: {
									enabled: false,
									connectorShape: 'crookedLine',
									crookDistance: '100%',
									format: ' {point.percentage:.1f} %',
									style: {
										color: '#fff',
									},
								},
							},
						},
						credits: {
							text: '',
						},
						title: {
							text: '',
						},
						tooltip: {
							enabled: false,
						},
						colors: [
							'#43D9FF',
							'#2162FF',
							'#FFF92D',
							'#FF71AF',
							'#43FF9E',
							'#FF8033',
							'#C81B1B',
							'#AB5FFF',
						],
						series: [
							{
								name: '日用气量',
								data: _newData,
							},
						],
					}
				)
			},
		},
	}
</script>
<style lang="scss">
	@import './index.scss';
</style>
