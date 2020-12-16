<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row">
			<div class="h-project-2-left fn-flex flex-column">
				<ul class="h-project-2-line fn-flex flex-row">
					<li class="pos-r"
						:style="{width:`${width(item.ratio)}%`,marginRight:`${marginRight(item.ratio)}px`}"
						v-for="(item,index) in data?data.value:[]"
						:class="{active:animateActiveIndex===index}"
						:key="item.name">
						<span class="pos-a font-num">{{(item.ratio*100).toFixed(2)}}%</span>
						<i class="pos-a"/>
						<h2 class="pos-a">{{item.name}}</h2>
					</li>
				</ul>
				<div class="fn-flex flex-row">
					<div class="h-project-2-ratio fn-flex">
						<div class="h-project-2-ratio-box pos-r">
							<i class="pos-a" :style="{height:height}"></i>
						</div>
						<div class="fn-flex flex-column text-left">
							<h2 class="font-num">{{data&&data.value[animateActiveIndex].total|toThousand}}</h2>
							<p>月度接纳(m³)</p>
						</div>
					</div>
					<div class="h-project-2-curve pos-r">
						<div class="h-project-2-curve-chart" :id="id"></div>
						<p class="pos-a text-center">月度接纳趋势</p>
					</div>
					<div class="h-project-2-month1 pos-r">
						<h2 class="font-num">{{data&&data.value[animateActiveIndex].month1}}</h2>
						<p class="pos-a text-center">月度同比</p>
					</div>
					<div class="h-project-2-month2 pos-r">
						<h2 class="font-num">{{data&&data.value[animateActiveIndex].month2}}</h2>
						<p class="pos-a text-center">月度环比</p>
					</div>
				</div>
			</div>
			<div class="h-project-2-right text-left">
				<h1>{{data&&data.value[animateActiveIndex].name}}</h1>
				<div>
					<h2 class="font-num">{{data&&data.value[animateActiveIndex].today?data.value[animateActiveIndex].today.toFixed(2)|toThousand:''}}</h2>
					<p>今日接纳量(m³)</p>
				</div>
				<div>
					<h2 class="font-num">{{data&&data.value[animateActiveIndex].quick?data.value[animateActiveIndex].quick.toFixed(2)|toThousand:'0'}}</h2>
					<p>瞬时接纳量(m³/h)</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				value: [
					{
						name: '所前门站',
						ratio: 6,
						total: 1235,
						today: 290.02,
						quick: 290.02,
						month1: '+6%',
						month2: '-5%',
						data: [4, 8, 7, 8, 9, 10, 8]
					},
					{
						name: '北门站',
						ratio: 8,
						total: 935,
						today: 290.02,
						quick: 390.02,
						month1: '+6%',
						month2: '-5%',
						data: [4, 20, 7, 8, 9, 10, 8]
					},
					{
						name: '江东门站',
						ratio: 12,
						total: 1235,
						today: 290.02,
						quick: 190.02,
						month1: '+6%',
						month2: '-5%',
						data: [10, 8, 7, 8, 9, 10, 8]
					},
					{
						name: '下沙站',
						ratio: 42,
						total: 735,
						today: 290.02,
						quick: 193.2,
						month1: '+6%',
						month2: '-5%',
						data: [4, 8, 20, 8, 9, 10, 8]
					},
					{
						name: '南门站',
						ratio: 32,
						total: 835,
						today: 290.02,
						quick: 90.02,
						month1: '+6%',
						month2: '-5%',
						data: [4, 20, 7, 8, 9, 10, 8]
					}
				],
			}),
		},
	};

	export default {
		mixins: [mixins],
		data() {
			return {
				ratioMin: 6,
			};
		},
		watch: {
			data: {
				handler(val) {
					if (val) {
						const data = {...val}
						this.show(data)
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			height() {
				if (this.data) {
					const ratio = this.data.value[this.animateActiveIndex].ratio*100
					if (ratio >= 100) {
						return 'calc(100% - 5px)'
					}
					return `calc((100% - 5px)/100*${ratio})`
				}
				return 0
			},
			marginRight() {
				return (ratio) => {
					if (ratio < 10)
						return 55
					return 32
				}
			},
			width() {
				return (ratio) => {
					let count = 0
					for (let i = 0; i < this.data.value.length - 1; i++) {
						count += this.data.value[i].ratio
					}
					if (ratio / count * 100 < this.ratioMin)
						return this.ratioMin
					return ratio / count * 100
				}
			}
		},
		methods: {
			setOption(data) {
				options.series[0].data = data
				this.instance && this.instance.setOption(options)
			},
			show(data) {
				clearInterval(this.animateTimer)
				this.animateTimer = setInterval(() => {
					if (this.id) {
						if (!this.instance)
							this.instance = echarts.init(document.getElementById(this.id))
					}
					if (this.instance) {
						this.setOption(this.data.value[this.animateActiveIndex].data)
					}
					if (this.animateActiveIndex >= data.value.length - 1) {
						this.animateActiveIndex = 0
					} else {
						this.animateActiveIndex = this.animateActiveIndex + 1
					}
				}, 2000)
			}
		},
		created() {
			this.animateActiveIndex = 0
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		},
	};
</script>
<style lang="scss">
	.h-project-2-right {
		margin-left: 17px;
		padding-left: 24px;
		border-left: 1px dashed rgba(255, 255, 255, 0.4);

		h1 {
			color: #00DDFF;
			font-size: 24px;
			line-height: 24px;
		}

		p {
			font-size: 20px;
			line-height: 24px;
			font-weight: normal;
			color: #fff;
			margin-bottom: 8px;
			white-space: nowrap;
		}

		h2 {
			font-size: 24px;
			line-height: 24px;
			color: #fff;
			margin-top: 24px;
			margin-bottom: 8px;
		}
	}

	.h-project-2-line {
		width: 772px;
		height: 12px;
		background: rgba(255, 255, 255, 0.2);
		padding: 0 16px;
		margin-top: 65px;
		margin-bottom: 25px;

		li {
			background-color: #5E87C4;
			height: 12px;
			margin-right: 32px;
			transition: all .3s;
      		min-width: 80px;

			&:last-child {
				margin-right: 0 !important;
			}

			&.active {
				background-color: #00DDFF;

				h2 {
					color: #00DDFF;
				}

				span {
					color: #00DDFF;
				}

				i {
					background-color: #00DDFF;

					&:before {
						background-color: #00DDFF;
					}
				}
			}

			h2 {
				font-size: 20px;
				line-height: 24px;
				color: #FFFFFF;
				font-weight: normal;
				white-space: nowrap;
				left: 10px;
				top: -65px;
			}

			i {
				width: 1px;
				height: 50px;
				background-color: rgba(255, 255, 255, 0.4);
				left: 0;
				top: -50px;

				&:before {
					content: '';
					position: absolute;
					width: 8px;
					height: 8px;
					border-radius: 10px;
					background-color: rgba(255, 255, 255, 0.75);
					top: -4px;
					left: -4px;
				}
			}

			span {
				font-size: 24px;
				line-height: 24px;
				color: #fff;
				left: 10px;
				top: -32px;
			}
		}
	}

	.h-project-2-month1, .h-project-2-month2, .h-project-2-curve {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%);
		height: 96px;
		margin-right: 16px;

		p {
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
			margin-top: 4px;
			bottom: 8px;
			width: 100%;
		}
	}

	.h-project-2-curve {
		width: 160px;
	}

	.h-project-2-curve-chart {
		height: 52px;
	}

	.h-project-2-ratio {
		margin-right: 16px;

		p {
			min-width: 130px;
			color: #00DDFF;
			font-size: 18px;
			line-height: 24px;
		}

		h2 {
			color: #FFFFFF;
			font-size: 24px;
			line-height: 24px;
			margin-top: 34px;
		}
	}

	.h-project-2-ratio-box {
		width: 40px;
		height: 96px;
		margin-right: 12px;
		margin-left: 12px;
		background-image: url('/static/icons/h-project2-2.svg');

		i {
			width: 32px;
			height: 91px;
			left: 4px;
			bottom: 4px;
			background-image: url('/static/icons/h-project2-3.svg');
			z-index: 9;
			background-position: bottom;
			transition: all .3s;
			background-repeat: no-repeat;
		}
	}

	.h-project-2-img {
		position: relative;
		left: 196px;

		img {
			width: 200px;
			height: 101px;
		}
	}

	.h-project-2-month1, .h-project-2-month2 {
		width: 96px;

		h2 {
			font-size: 24px;
			line-height: 24px;
			margin-top: 36px;
		}
	}

	.h-project-2-month1 {
		h2 {
			color: #E5615B;
		}
	}

	.h-project-2-month2 {
		h2 {
			color: #00FFCF;
		}
	}
</style>
