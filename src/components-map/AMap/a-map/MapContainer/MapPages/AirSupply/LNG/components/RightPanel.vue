<template lang="pug">
.right-panel.animate__animated.animate-fadeInRight
	.title
		img(src="../img/title-icon.svg")
		span 本月LNG场站采购TOP10
	vueSeamlessScroll.list-wrap(:class-option="option", :data="top10")
		ul.list
			li(v-for="(k, i) in top10", :key="i")
				.index(:class="{ top: [0, 1, 2].includes(i) }") {{ i > 8 ? i + 1 : '0' + (i + 1) }}
				.station
					.station-info
						.station-name {{ k.name }}
						.station-area {{ k.ownedCompany }}
						.station-value
							em.font-num {{ k.purchaseQty.toLocaleString() }}
							span 吨
					.bar-w
						.bar(:style="{ width: k.percent * 100 + '%' }")
	.title
		img(src="../img/title-icon.svg")
		span 最新订单
		.tabs
			.tab(
				:class="{ active: activeTab === 'InComplete' }",
				@click="switchTab('InComplete')") 未完成
			.tab(
				:class="{ active: activeTab === 'Complete' }",
				@click="switchTab('Complete')") 今日完成
	.none(v-if="!order.length")
		img(src="/static/images/amap/noModel.svg")
		p 暂无数据
	vueSeamlessScroll.list2-wrap(
		:class-option="option2",
		:data="order || []",
		v-if="order.length")
		ul.list2
			li(v-for="(k, i) in order", :key="i")
				img(src="../img/changzhan.svg")
				.main
					.station-info
						.station-name {{ k.name }}
						.station-value
							em.font-num {{ k.purchaseQty.toLocaleString() }}
							span 吨
					.station-area {{ k.ownedCompany }}
					.state
						.time {{ k.date }}
						.state-name(v-if="activeTab === 'InComplete'")
							.color
							span {{ k.status }}
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import {
	getLngPurchaseTopTen,
	getLngLatestOrders,
} from '@/components-map-api/map.airSupply.api'

export default {
	name: 'LngRightPanel',
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
			order: [],
		}
	},
	async created() {
		this.top10 = await getLngPurchaseTopTen()
		this.handleOrder()
	},
	methods: {
		switchTab(n) {
			this.activeTab = n
			this.handleOrder()
		},
		async handleOrder() {
			this.order = await getLngLatestOrders({
				orderType: this.activeTab,
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
	color: #ffffff;
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
			background: #0057a9;
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
				color: #ffffff;
				border: 1px solid #00ddff;
			}
		}
	}
}
.list {
	li {
		cursor: pointer;
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
			color: #ffffff;
			background: rgba(0, 221, 255, 0.5);
			border-top: 2px solid #00ddff;
			&.top {
				background: rgba(229, 97, 91, 0.8);
				border-top: 2px solid #ffdc45;
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
					color: #ffffff;
					margin-right: 4px;
				}
				.station-area {
					background: #0057a9;
					border-radius: 4px;
					font-size: 18px;
					color: #ffffff;
					padding: 0 4px;
				}
				.station-value {
					flex: 1;
					text-align: right;
					em {
						font-weight: bold;
						font-size: 24px;
						color: #ffffff;
					}
					span {
						font-size: 20px;
						color: rgba(255, 255, 255, 0.75);
					}
				}
			}
			.bar-w {
				background: #0057a9;
				height: 8px;
				.bar {
					background: linear-gradient(
						270deg,
						#00ddff 0%,
						rgba(0, 221, 255, 0.5) 100%
					);
					height: 8px;
					position: relative;
					&:after {
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
.none {
	font-size: 20px;
	text-align: center;
	padding-top: 100px;
	color: #fff;
	img {
		width: 80px;
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
		&:nth-child(2n + 1) {
			background: linear-gradient(
				180deg,
				rgba(0, 87, 169, 0.3) 0%,
				rgba(0, 87, 169, 0.5) 100%
			);
		}
		> img {
			width: 40px;
			height: 40px;
			margin-right: 8px;
		}
		.main {
			flex: 1;
			.station-area {
				display: inline-block;
				background: #0057a9;
				border-radius: 4px;
				font-size: 18px;
				color: #ffffff;
				padding: 0 4px;
				margin-top: 12px;
			}
			.station-info {
				display: flex;
				align-items: center;
				.station-name {
					font-weight: bold;
					font-size: 20px;
					color: #ffffff;
					margin-right: 4px;
				}
				.station-value {
					flex: 1;
					text-align: right;
					em {
						font-weight: bold;
						font-size: 24px;
						color: #ffffff;
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
				margin-top: 8px;
				.time {
					font-size: 18px;
					color: #ffffff;
				}
				.state-name {
					font-size: 20px;
					text-align: right;
					color: #ffdc45;
					display: flex;
					align-items: center;
					.color {
						width: 8px;
						height: 8px;
						background: #ffdc45;
						border-radius: 50%;
						margin-right: 8px;
					}
				}
			}
		}
	}
}
</style>
