<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="container">
			<div class="main">
				<ul>
					<li class="item" v-for="(k, i) in data" :class="{active: i === index}" :key="i"
						@click="changeTab(i)">
						<div class="title">{{ k.name }} {{ k.value | toThousand }}</div>
						<div class="bar" :style="{width: getBarWidth(k.value)}"></div>
					</li>
				</ul>
				<div class="unit">单位：万m³</div>
			</div>
			<div class="outside">
				<h5>{{curr.name}}外供量</h5>
				<div class="sub">
					<div class="sub-item" v-for="(k, i) in (subItem || curr.children || [])" :key="i">
						<div class="sub-item-rank font-num">{{ getIndex(i) }}</div>
						<div class="sub-detail">
							<div class="sub-title">{{ k.name }}</div>
							<div class="sub-num">{{ k.value | toThousand }}</div>
							<div class="sub-bar" :style="{width: getSubBarWidth(k.value)}"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import {value} from './index.component'

	let inside = 0
	const SIZE = 12
	export default {
		mixins: [mixins],
		data() {
			return {
				index: 0,
				timer: null,
				restartTimer: null,
				subItem: null
			}
		},
		computed: {
			curr() {
				if (!this.data) return {}
				return this.data[this.index]
			}
		},
		watch: {
			data: {
				handler(val) {
					if (val) {
						if (val.length) {
							this.subItem = val[0].children.slice(0, SIZE)
						}
					}
				},
				deep: true,
				immediate: true
			},
			index: {
				handler(val) {
					if (!this.data) return
					this.subItem = this.data[val].children.slice(0, SIZE)
					if (this.data[val].children.length > SIZE) {
						inside = 1
					} else {
						inside = 0
					}
				},
				immediate: true
			}
		},
		methods: {
			getBarWidth(value) {
				return ~~(value / this.data[0].value * 192) + 'px'
			},
			getSubBarWidth(value) {
				return ~~(value / this.curr.children[0].value * 92) + 'px'
			},
			changeTab(n) {
				clearInterval(this.timer)
				clearTimeout(this.restartTimer)
				this.index = n
				this.restartTimer = setTimeout(() => {
					this.startInterval()
				}, 3000)
			},
			getIndex(n) {
				return inside === 0 ? n + 1 : n + 1 + (inside - 1) * SIZE
			},
			startInterval() {
				this.timer = setInterval(() => {
					if (inside) {
						if (inside === Math.ceil(this.data[this.index].children.length / SIZE)) {
							inside = 0
						} else {
							inside++
							this.subItem = this.data[this.index].children.slice(SIZE * (inside - 1), SIZE * inside)
							return
						}
					}
					if (this.index === this.data.length - 1) {
						this.index = 0
					} else {
						this.index++
					}
				}, 3000)
			}
		},
		created() {
			this.configValue = this.parseConfigValue(value)
		},
		mounted() {
			this.startInterval()
		},
		beforeDestroy() {
			clearInterval(this.timer)
			clearTimeout(this.restartTimer)
			this.timer = null
			this.restartTimer = null
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		display: flex;

		.main {
			flex: none;
			width: 215px;
			border-right: 1px dashed rgba(255, 255, 255, 0.4);

			.item {
				width: 200px;
				height: 45px;
				padding: 4px;
				margin-bottom: 8px;
				text-align: left;

				&:last-child {
					margin-bottom: 4px;
				}

				&.active {
					background: #0057A9;

					.bar {
						background: #00FFCF;
					}
				}

				.title {
					font-size: 18px;
					line-height: 24px;
					color: #FFFFFF;
					margin-bottom: 4px;
				}

				.bar {
					width: 0;
					height: 8px;
					background: #2194FF;
				}
			}

			.unit {
				font-size: 18px;
				line-height: 24px;
				color: #00DDFF;
				text-align: left;
			}
		}

		.outside {
			padding-left: 15px;

			h5 {
				text-align: left;
				font-weight: 600;
				font-size: 20px;
				line-height: 24px;
				color: #00DDFF;
				padding-top: 8px;
				margin-bottom: 16px;
			}

			.sub {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				flex: 1;
				height: 432px;

				.sub-item {
					display: flex;
					width: 120px;
					height: 64px;
					background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.3) 100%);
					margin-bottom: 8px;

					&:nth-child(2n+1) {
						margin-right: 8px;
					}

					&:nth-child(6) {
						margin-bottom: 0;
					}

					.sub-item-rank {
						flex: none;
						background: #2194FF;
						width: 24px;
						height: 24px;
						font-weight: bold;
						font-size: 24px;
						line-height: 24px;
						color: #FFFFFF;
						margin-right: 4px;
					}

					.sub-detail {
						text-align: left;
						font-size: 18px;
						color: #F9F9F9;

						.sub-title {
							height: 33px;
							margin-bottom: 4px;
						}

						.sub-bar {
							width: 0;
							height: 2px;
							background: #00DDFF;
						}
					}

					&:nth-child(1) .sub-item-rank {
						background: #FFD200;
						color: #001A77;
					}

					&:nth-child(2) .sub-item-rank {
						background: #00DDFF;
						color: #001A77;
					}

					&:nth-child(3) .sub-item-rank {
						background: #00FFCF;
						color: #001A77;
					}
				}
			}
		}
	}
</style>

