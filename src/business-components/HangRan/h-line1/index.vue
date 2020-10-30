<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-line-1" :id="id"/>
		<div class="pos-a h-line-1-title">{{data&&data.name}}</div>
	</div>
</template>

<script>
	import {styleParser, widgetMixin} from '../../../../lib'

	const options = {
		grid: {
			top: 40,
			left: 40,
			bottom: 30,
			right: 0
		},
		xAxis: {
			type: 'category',
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			boundaryGap: ['10%', '10%'],
			axisLine: {
				lineStyle: {
					color: 'rgba(255, 255, 255,.1)'
				}
			},
			axisLabel: {
				interval: 0,
				textStyle: {
					color: "rgba(255, 255, 255, 1)",
					fontSize: 16,
					lineHeight: 16
				}
			}
		},
		yAxis: {
			type: 'value',
			axisTick: {
				show: false
			},
			splitNumber: 4,
			axisLine: {
				show: false
			},
			splitLine: {
				lineStyle: {
					color: 'rgba(255, 255, 255,0.2)'
				}
			},
			axisLabel: {
				textStyle: {
					color: "rgba(255, 255, 255, 1)",
					fontSize: 16,
					lineHeight: 16
				}
			}
		},
		series: [
			{
				type: 'bar',
				barWidth: 10,
				smooth: true,
				symbol: 'none',
				symbolSize: 5,
				label: {
					show: true,
					position: 'top',
					formatter: '{a}',
					color: '#00DDFF',
					backgroundColor: '#00DDFF',
					fontSize: 1,
					width: 10,
					height: 4,
					rich: {
						a: {
							color: '#fff',

						}
					}
				},
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: 'rgba(255,255,255,.6)'},
								{offset: 1, color: 'rgba(255,255,255,0)'}
							]
						)
					}
				},
				data: []
			}
		]
	}

	const localConfigValue = {
		api: {
			data: JSON.stringify({
				name: '数量',
				data: [['2015', 250], ['2016', 350], ['2017', 150], ['2018', 280], ['2019', 250], ['2020', 250]]
			})
		}
	}
	export default {
		data() {
			return {
				instance: null,
			}
		},
		mixins: [widgetMixin],
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout)
			},
			mergedConfig() {
				if (!this.config.config) return false
				return {...this.config.config}
			}
		},
		methods: {
			updateSize() {
				this.instance && this.instance.resize()
			},
			setOption(data) {
				options.series[0].data = data.data
				options.series[0].name = data.name
				this.instance && this.instance.setOption(options)
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val}
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(data)
						})
					}
				},
				deep: true,
			}
		},
		beforeDestroy() {
			this.instance = null
			window.removeEventListener('resize', this.updateSize)
		},
		mounted() {
			if (this.id) {
				this.$nextTick(() => {
					const data = {...this.data}
					this.instance = echarts.init(document.getElementById(this.id))
					this.setOption(data)
				})
			}
			window.addEventListener('resize', this.updateSize)
		},
		created() {
			this.configSource = this.parseConfigSource({api: true})
			this.configValue = this.parseConfigValue({api: true}, localConfigValue)
		}
	}
</script>
<style lang="scss">
	.h-line-1 {
		height: 100%;
	}

	.h-line-1-title {
		font-size: 16px;
		color: #fff;
		line-height: 16px;
		top: 0;
		left: 0;
	}
</style>

