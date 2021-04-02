<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="fn-flex flex-row">
			<div class="h-project-2-left fn-flex flex-column">
				<ul class="h-project-2-line fn-flex flex-row">
					<li
						class="pos-r"
						:style="{
							width: `${width(item.ratio)}%`,
							marginRight: `${marginRight(item.ratio)}px`,
						}"
						v-for="(item, index) in data ? data.value : []"
						:class="{ active: animateActiveIndex === index }"
						:key="item.name"
					>
						<span class="pos-a font-num">
							{{ (item.ratio * 100).toFixed(2) }}%
						</span>
						<i class="pos-a" />
						<h2 class="pos-a">{{ item.name }}</h2>
					</li>
				</ul>
				<div class="fn-flex flex-row">
					<div class="h-project-2-ratio fn-flex">
						<div class="h-project-2-ratio-box pos-r">
							<i class="pos-a" :style="{ height: height }"></i>
						</div>
						<div class="fn-flex flex-column text-left">
							<h2 class="font-num">
								{{
									data &&
									data.value[animateActiveIndex].total
										| toThousand
								}}
							</h2>
							<p>月度接纳(万m³)</p>
						</div>
					</div>
					<div class="h-project-2-curve pos-r">
						<div class="h-project-2-curve-chart" :id="id"></div>
						<p class="pos-a text-center">月度接纳趋势</p>
					</div>
					<div
						class="h-project-2-month1 pos-r"
						:class="{
							active: data.value[animateActiveIndex].month1 > 0,
						}"
					>
						<h2 class="font-num">
							{{
								data.value[animateActiveIndex].month1 > 0
									? '+'
									: ''
							}}{{ data.value[animateActiveIndex].month1 }}%
						</h2>
						<p class="pos-a text-center">月度同比</p>
					</div>
					<div
						class="h-project-2-month2 pos-r"
						:class="{
							active: data.value[animateActiveIndex].month2 > 0,
						}"
					>
						<h2 class="font-num">
							{{
								data.value[animateActiveIndex].month2 > 0
									? '+'
									: ''
							}}{{ data.value[animateActiveIndex].month2 }}%
						</h2>
						<p class="pos-a text-center">月度环比</p>
					</div>
				</div>
			</div>
			<div class="h-project-2-right text-left">
				<h1>{{ data && data.value[animateActiveIndex].name }}</h1>
				<div>
					<h2 class="font-num">
						{{
							data.value[animateActiveIndex].today
								? data.value[animateActiveIndex].today.toFixed(
										2,
								  )
								: '' | toThousand
						}}
					</h2>
					<p>今日接纳量(m³)</p>
				</div>
				<div>
					<h2 class="font-num">
						{{
							data.value[animateActiveIndex].quick
								? data.value[animateActiveIndex].quick.toFixed(
										2,
								  )
								: '0' | toThousand
						}}
					</h2>
					<p>瞬时接纳量(m³/h)</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import options from './options'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {
			ratioMin: 6,
		}
	},
	watch: {
		data: {
			handler(val) {
				if (val) {
					const data = { ...val }
					this.show(data)
				}
			},
			deep: true,
			immediate: true,
		},
	},
	computed: {
		height() {
			if (this.data) {
				const ratio =
					this.data.value[this.animateActiveIndex].ratio * 100
				if (ratio >= 100) {
					return 'calc(100% - 5px)'
				}
				return `calc((100% - 5px)/100*${ratio})`
			}
			return 0
		},
		marginRight() {
			return ratio => {
				if (ratio < 10) {
					return 55
				}
				return 32
			}
		},
		width() {
			return ratio => {
				let count = 0
				for (let i = 0; i < this.data.value.length - 1; i++) {
					count += this.data.value[i].ratio
				}
				if ((ratio / count) * 100 < this.ratioMin) {
					return this.ratioMin
				}
				return (ratio / count) * 100
			}
		},
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
					if (!this.instance) {
						this.instance = echarts.init(
							document.getElementById(this.id),
						)
					}
				}
				if (this.instance) {
					this.setOption(
						this.data.value[this.animateActiveIndex].data,
					)
				}
				if (this.animateActiveIndex >= data.value.length - 1) {
					this.animateActiveIndex = 0
				} else {
					this.animateActiveIndex = this.animateActiveIndex + 1
				}
			}, 2000)
		},
	},
	created() {
		this.animateActiveIndex = 0
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss">
.h-project-2-right {
	padding-left: 24px;
	margin-left: 17px;
	border-left: 1px dashed rgba(255, 255, 255, 0.4);

	h1 {
		font-size: 24px;
		line-height: 24px;
		color: #0df;
	}

	p {
		margin-bottom: 8px;
		font-size: 20px;
		font-weight: normal;
		line-height: 24px;
		color: #fff;
		white-space: nowrap;
	}

	h2 {
		margin-top: 24px;
		margin-bottom: 8px;
		font-size: 24px;
		line-height: 24px;
		color: #fff;
	}
}

.h-project-2-line {
	width: 772px;
	height: 12px;
	padding: 0 16px;
	margin-top: 65px;
	margin-bottom: 25px;
	background: rgba(255, 255, 255, 0.2);

	li {
		min-width: 80px;
		height: 12px;
		margin-right: 32px;
		background-color: #5e87c4;
		transition: all 0.3s;

		&:last-child {
			margin-right: 0 !important;
		}

		&.active {
			background-color: #0df;

			h2 {
				color: #0df;
			}

			span {
				color: #0df;
			}

			i {
				background-color: #0df;

				&::before {
					background-color: #0df;
				}
			}
		}

		h2 {
			top: -65px;
			left: 10px;
			font-size: 20px;
			font-weight: normal;
			line-height: 24px;
			color: #fff;
			white-space: nowrap;
		}

		i {
			top: -50px;
			left: 0;
			width: 1px;
			height: 50px;
			background-color: rgba(255, 255, 255, 0.4);

			&::before {
				position: absolute;
				top: -4px;
				left: -4px;
				width: 8px;
				height: 8px;
				content: '';
				background-color: rgba(255, 255, 255, 0.75);
				border-radius: 10px;
			}
		}

		span {
			top: -32px;
			left: 10px;
			font-size: 24px;
			line-height: 24px;
			color: #fff;
		}
	}
}

.h-project-2-month1,
.h-project-2-month2,
.h-project-2-curve {
	height: 96px;
	margin-right: 16px;
	background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.1) 100%
	);

	p {
		bottom: 8px;
		width: 100%;
		margin-top: 4px;
		font-size: 18px;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.75);
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
		font-size: 18px;
		line-height: 24px;
		color: #0df;
	}

	h2 {
		margin-top: 34px;
		font-size: 24px;
		line-height: 24px;
		color: #fff;
	}
}

.h-project-2-ratio-box {
	width: 40px;
	height: 96px;
	margin-right: 12px;
	margin-left: 12px;
	background-image: url('/static/icons/h-project2-2.svg');

	i {
		bottom: 4px;
		left: 4px;
		z-index: 9;
		width: 32px;
		height: 91px;
		background-image: url('/static/icons/h-project2-3.svg');
		background-repeat: no-repeat;
		background-position: bottom;
		transition: all 0.3s;
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

.h-project-2-month1,
.h-project-2-month2 {
	width: 96px;

	h2 {
		margin-top: 36px;
		font-size: 24px;
		line-height: 24px;
	}
}

.h-project-2-month1,
.h-project-2-month2 {
	h2 {
		color: #00ffcf;
	}

	&.active {
		h2 {
			color: #e5615b;
		}
	}
}
</style>
