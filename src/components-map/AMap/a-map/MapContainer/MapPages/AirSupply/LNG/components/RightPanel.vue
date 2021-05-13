<template lang="pug">
	.right-panel.animate__animated.animate-fadeInRight
		.title
			img(src="../img/title-icon.svg")
			span 本月LNG场站采购TOP10
		vueSeamlessScroll(:class-option="option" :data="top10" class="list-wrap")
			ul.list
				li(v-for="(k, i) in top10" :key="i")
					.index(:class="{top: [0, 1, 2].includes(i)}") {{ i > 8 ? i + 1 : '0' + (i + 1) }}
					.station
						.station-info
							.station-name(@click="handleClick(k)") {{ k.name }}
							.station-area {{ k.ownedCompany }}
							.station-value
								em.font-num {{ k.purchaseQty.toLocaleString() }}
								span 吨
						.bar-w
							.bar(:style="{width: k.percent + '%'}")
		.title
			img(src="../img/title-icon.svg")
			span 最新订单
			.tabs
				.tab(:class="{active: activeTab === 'InComplete'}" @click="switchTab('InComplete')") 未完成
				.tab(:class="{active: activeTab === 'Complete'}" @click="switchTab('Complete')") 今日完成
		vueSeamlessScroll(:class-option="option2" :data="order || []" class="list2-wrap")
			ul.list2
				li(v-for="(k, i) in order" :key="i")
					img(src="../img/changzhan.svg")
					.main
						.station-info
							.station-name {{ k.name }}
							.station-area
							.station-value
								em.font-num {{ k.purchaseQty.toLocaleString() }}
								span 吨
						.state
							.time {{ k.date }}
							.state-name
								.color
								span {{ k.status }}
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
	name: 'RightlistPanel',
	components: { vueSeamlessScroll },
	data() {
		return {
			activeTab: 'InComplete',
			option: {
				step: 0.2, // 数值越大速度滚动越快
				limitMoveNum: 6, // 开始无缝滚动的数据量
				hoverStop: true, // 是否开启鼠标悬停stop
				direction: 1, // 0向下 1向上 2向左 3向右
				openWatch: true, // 开启数据实时监控刷新dom
				singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
				singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
				waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
			},
			option2: {
				step: 0.2, // 数值越大速度滚动越快
				limitMoveNum: 4, // 开始无缝滚动的数据量
				hoverStop: true, // 是否开启鼠标悬停stop
				direction: 1, // 0向下 1向上 2向左 3向右
				openWatch: true, // 开启数据实时监控刷新dom
				singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
				singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
				waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
			},
			top10: [],
			order: []
		}
	},
	props: {
		
	},
	async created() {
		this.top10 = await this.$api.map.airSupply.getLngPurchaseTopTen()
		this.handleOrder()
	},
	methods: {
		switchTab (n) {
			this.activeTab = n
			this.handleOrder()
		},
		async handleOrder () {
			this.order = await this.$api.map.airSupply.getLngLatestOrders({
				orderType: this.activeTab
			})
		},
		handleClick(item) {
			const res = this.$attrs.stationList.find(v => v.name === item.name)
			this.$emit('overlay-click', {
				...res,
				detail: {}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.right-panel {
	position: absolute;
	top: 148px;
	right: 32px;
	z-index: 100;
	width: 480px;
	max-height: 860px;
}
.list-wrap {
	height: 360px;
	overflow: hidden;
	margin-bottom: 30px;
}
.title {
	width: 100%;
	display: flex;
	align-items: center;
	font-weight: 600;
	font-size: 24px;
	line-height: 32px;
	color: #FFFFFF;
	border-bottom: 1px solid rgba(255, 255, 255, 0.4);
	padding-bottom: 7px;
	margin-bottom: 8px;
	img {
		width: 30px;
		height: 30px;
		margin-right: 9px;
	}
	span {
		flex: 1;
		text-align: left;
	}
	.tabs {
		display: flex;
		align-items: center;
		.tab {
			padding: 4px 8px;
			background: #0057A9;
			box-sizing: border-box;
			border-radius: 4px;
			margin-left: 8px;
			font-size: 18px;
			font-weight: normal;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
			cursor: pointer;
			&.active {
				font-weight: 600;
				color: #FFFFFF;
				border: 1px solid #00DDFF;
			}
		}
	}
}
.list {
	li {
		display: flex;
		margin-bottom: 24px;
		.index {
			width: 40px;
			height: 40px;
			margin-right: 8px;
			font-weight: bold;
			font-size: 24px;
			line-height: 40px;
			text-align: center;
			color: #FFFFFF;
			background: rgba(0, 221, 255, 0.5);
			border-top: 2px solid #00DDFF;
			&.top {
				background: rgba(229, 97, 91, 0.8);
				border-top: 2px solid #FFDC45;
			}
		}
		.station {
			flex: 1;
			.station-info {
				display: flex;
				align-items: center;
				.station-name {
					font-weight: bold;
					font-size: 20px;
					color: #FFFFFF;
					margin-right: 4px;
				}
				.station-area {
					background: #0057A9;
					border-radius: 4px;
					font-size: 18px;
					color: #FFFFFF;
					padding: 0 4px;
				}
				.station-value {
					flex: 1;
					text-align: right;
					em {
						font-weight: bold;
						font-size: 24px;
						color: #FFFFFF;
					}
					span {
						font-size: 20px;
						color: rgba(255, 255, 255, 0.75);
					}
				}
			}
			.bar-w {
				background: #0057A9;
				height: 8px;
				.bar {
					background: linear-gradient(270deg, #00DDFF 0%, rgba(0, 221, 255, 0.5) 100%);
					height: 8px;
					position: relative;
					&:after{
						position: absolute;
						top: 0;
						right: 0;
						width: 4px;
						height: 8px;
						background: #fff;
						content: '';
						display: block;
					}
				}
			}
		}
	}
}

.list2-wrap {
	height: 340px;
	overflow: hidden;
}
.list2 {
	li {
		display: flex;
		padding: 12px 8px;
		&:nth-child(2n+1) {
			background: linear-gradient(180deg, rgba(0, 87, 169, 0.3) 0%, rgba(0, 87, 169, 0.5) 100%);
		}
		>img {
			width: 40px;
			height: 40px;
			margin-right: 8px;
		}
		.main {
			flex: 1;
			.station-info {
				display: flex;
				align-items: center;
				.station-name {
					font-weight: bold;
					font-size: 20px;
					color: #FFFFFF;
					margin-right: 4px;
				}
				.station-area {
					background: #0057A9;
					border-radius: 4px;
					font-size: 18px;
					color: #FFFFFF;
					padding: 0 4px;
				}
				.station-value {
					flex: 1;
					text-align: right;
					em {
						font-weight: bold;
						font-size: 24px;
						color: #FFFFFF;
					}
					span {
						font-size: 20px;
						color: rgba(255, 255, 255, 0.75);
					}
				}
			}
			.state {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 16px;
				.time {
					font-size: 18px;
					color: #FFFFFF;
				}
				.state-name {
					font-size: 20px;
					text-align: right;
					color: #FFDC45;
					display: flex;
					align-items: center;
					.color {
						width: 8px;
						height: 8px;
						background: #FFDC45;
						border-radius: 50%;
						margin-right: 8px;
					}
				}
			}
		}
	}
}
</style>
