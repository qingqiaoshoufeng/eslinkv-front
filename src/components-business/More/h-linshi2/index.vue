<template>
	<div
		class="widget-part"
		:style="styles"
		ref="img"
		v-if="data"
	>
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">杭燃优家</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<div class="container">
			<section class="detail">
				<div class="detail-item">
					<div class="detail-item-icon" :style="`background-image: url(${currBuilding.icon1})`"></div>
					<div>
						<div class="detail-item-title">{{ currBuilding.desc1 }}</div>
						<div class="detail-item-num font-num">
							{{ currBuilding.value1| toThousand }} <span>{{ currBuilding.unit1 }}</span>
						</div>
					</div>
				</div>
				<div class="detail-item">
					<div class="detail-item-icon money"></div>
					<div>
						<div class="detail-item-title">{{ currBuilding.desc2 }}</div>
						<div class="detail-item-num font-num">{{ currBuilding.value2 / 10000 | toThousand }} <span>万元</span></div>
					</div>
				</div>
			</section>
			<section class="building">
				<div class="circle">
					<div
						class="item"
						:class="[getItemIndex(i)]"
						v-for="(k, i) in data.building"
						:key="i"
					>
						{{ k.name }}
					</div>
				</div>
			</section>
			<section class="year">
				<label>优家年度总产值</label>
				<span class="year-num">{{ data.yearData / 10000 | toThousand }}<em>万元</em></span>
			</section>
		</div>
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">杭燃体验</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<section class="fans pos-r">
			<video
				muted
				class="fans-video pos-a"
				autoplay="autoplay"
				loop="loop"
				src="./img/shouyetiyan.webm"
			></video>
			<transition name="fade">
				<div class="fans-top" :key="currFan.name">
					<div style="text-align: left;">
						<div class="fan-title">{{ currFan.name }}</div>
						<div class="fan-num font-num">{{ currFan.fanDailyNum| toThousand }}</div>
					</div>
					<div style="text-align: right;">
						<div class="fan-title">{{ currFan.name2 }}</div>
						<div class="fan-num font-num">{{ currFan.fanTotalNum| toThousand }}</div>
					</div>
				</div>
			</transition>
		</section>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		data () {
			return {
				buildingTimer: null,
				loopIndex: 1,
				fanIndex: 0
			}
		},
		computed: {
			currBuilding () {
				const map = new Map([[1, 2], [2, 1], [3, 0], [4, 5], [5, 4], [0, 3]])
				return this.data?.building[map.get(this.loopIndex % 6)] || {}
			},
			currFan () {
				return this.data ? this.data.fans[this.fanIndex] : {}
			}
		},
		watch: {
			data: {
				handler (val) {
					clearInterval(this.buildingTimer)
					this.buildingTimer = setInterval(() => {
						this.loopIndex++
						if (this.fanIndex === 4) {
							this.fanIndex = 0
						} else {
							this.fanIndex++
						}
					}, 3000)
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			getItemIndex (i) {
				const n = (i + this.loopIndex) % 6
				return `index-${n}`
			},
			count (n) {
				if (n === 6) {
					n = 1
				} else {
					n++
				}
				return n
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		},
		beforeDestroy () {
			clearInterval(this.buildingTimer)
			this.buildingTimer = null
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		padding-top: 40px;
		transition: all 0.5s;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		background: rgba(0, 87, 169, 0.5);
		border: 1px solid #0df;

		.title-txt {
			margin: 0 8px;
			font-size: 32px;
			font-weight: 600;
			line-height: 32px;
			color: #fff;
		}
	}

	.container {
		padding: 22px 20px 10px;
		margin-bottom: 32px;
		background: #011b79;
		border: 1px solid #0df;
		border-top-width: 0;
	}

	.year {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 460px;
		height: 48px;
		padding: 0 8px;
		margin: 0 auto;
		background: url("./img/border-you.svg") no-repeat;
		background-size: 100% 100%;

		label {
			font-size: 24px;
			line-height: 24px;
			color: #5ee2fd;
		}

		.year-num {
			margin-left: 16px;
			font-family: font-num;
			font-size: 40px;
			font-weight: bold;
			line-height: 48px;
			color: #fff;

			em {
				font-size: 24px;
				font-style: normal;
				font-weight: normal;
				line-height: 24px;
				color: #fff;
			}
		}
	}

	.detail {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		.detail-item {
			display: flex;
			flex: 1;
			align-items: center;
			text-align: left;

			.detail-item-icon {
				width: 80px;
				height: 80px;
				margin-right: 8px;
				background: #0049ce;

				&.money {
					background-image: url("/static/images/home/home-u-0.svg");
				}
			}

			.detail-item-title {
				margin-bottom: 8px;
				font-size: 24px;
				line-height: 24px;
				color: #5ee2fd;
			}

			.detail-item-num {
				font-size: 40px;
				font-weight: bold;
				line-height: 48px;
				color: #fff;

				span {
					font-size: 24px;
					font-weight: normal;
					line-height: 24px;
				}
			}
		}
	}

	.building {
		height: 250px;
		background: url("./img/building.svg") no-repeat center center;

		.circle {
			position: relative;
			height: 250px;
			perspective: 800px;
			transform-style: preserve-3d;
			transform: rotateX(-30deg);

			.item {
				position: absolute;
				right: 0;
				bottom: 180px;
				left: 0;
				margin: auto;
				font-size: 18px;
				color: #0df;
				transition: all 2s;

				&.index-1 {
					transform: translate3d(150px, 0, 60px);
				}

				&.index-2 {
					transform: translate3d(170px, 0, 150px);
				}

				&.index-3 {
					font-size: 24px;
					font-weight: 600;
					color: #fff;
					transform: translate3d(0, 0, 200px);
				}

				&.index-4 {
					transform: translate3d(-170px, 0, 150px);
				}

				&.index-5 {
					transform: translate3d(-150px, 0, 60px);
				}

				&.index-6 {
					transform: translate3d(0, 0, -100px);
				}
			}
		}
	}

	.fans-video {
		left: 50%;
		height: 412px;
		transform: translateX(-50%);
	}

	.fans {
		position: relative;
		height: 412px;
		background: #011b79;
		border: 1px solid #0df;
		border-top-width: 0;

		.fans-top {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			padding: 20px 16px 0;
		}

		.fan-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 24px;
			color: #5ee2fd;
		}

		.fan-num {
			font-size: 40px;
			font-weight: bold;
			line-height: 40px;
			color: #fff;
		}
	}
</style>

