<template>
	<div class="table">
		<ul class="title">
			<li></li>
			<li>隐患排行</li>
			<li>设备类型</li>
			<li>隐患数</li>
			<li>待处理</li>
			<li>处理中</li>
			<li>已完成</li>
		</ul>
		<div class="content" v-if="data">
			<ul
				class="content-row"
				v-for="(item, index) in curr"
				:key="index"
				@mouseenter="isStop = true"
				@mouseleave="isStop = false"
			>
				<li class="font-num" :class="{first: getIndex(index) === '01', second: getIndex(index) === '02' || getIndex(index) === '03'}">{{ getIndex(index) }}</li>
				<li>{{ item.name }}</li>
				<li>{{ item.type }}</li>
				<li>{{ item.total }}</li>
				<li>{{ item.waitHandle }}</li>
				<li>{{ item.handling }}</li>
				<li>{{ item.finish }}</li>
			</ul>
		</div>
	</div>
</template>
<script>

	const SIZE = 5
	export default {
		props: ['data'],
		data () {
			return {
				timer: null,
				loop: 0,
				isStop: false
			}
		},
		watch: {
			data: {
				handler (val) {
					clearInterval(this.timer)
					this.loop = 0
					this.timer = setInterval(() => {
						if (this.isStop) return
						if (this.loop === Math.ceil(val.length / SIZE) - 1) {
							this.loop = 0
						} else {
							this.loop++
						}
					}, 2000)
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			curr () {
				if (!this.data) return []
				return this.data.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
			}
		},
		methods: {
			getIndex (n) {
				const num = n + 1 + this.loop * SIZE
				return num < 10 ? '0' + num : num
			}
		},
		beforeDestroy () {
			clearInterval(this.timer)
			this.timer = null
		}
	}
</script>
<style lang="scss" scoped>
	.table {
		flex: none;
		width: 100%;

		.title {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 100%;
			height: 32px;
			white-space: nowrap;
			background: rgba(23, 123, 255, 0.2);

			& > li {
				flex: none;
				font-size: 18px;
				color: #00cbf4;
				text-align: left;

				&:nth-child(1) {
					width: 24px;
					margin-right: 8px;
				}

				&:nth-child(2) {
					width: 128px;
				}

				&:nth-child(3) {
					width: 128px;
				}

				&:nth-child(4) {
					width: 90px;
				}

				&:nth-child(5) {
					width: 90px;
				}

				&:nth-child(6) {
					width: 90px;
				}
			}
		}

		.content {
			height: 155px;

			.content-warp {
				height: 155px;
				overflow: hidden;
			}

			.content-row {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				height: 24px;
				margin-top: 8px;

				& > li {
					flex: none;
					font-size: 18px;
					color: #fff;
					text-align: left;

					&.first {
						background: #ff7217 !important;
					}

					&.second {
						background: #0057a9 !important;
					}

					&:nth-child(1) {
						width: 24px;
						height: 24px;
						margin-right: 8px;
						line-height: 24px;
						text-align: center;
						background: rgba(255, 255, 255, 0.2);
					}

					&:nth-child(2) {
						width: 128px;
					}

					&:nth-child(3) {
						width: 128px;
					}

					&:nth-child(4) {
						width: 90px;
					}

					&:nth-child(5) {
						width: 90px;
					}

					&:nth-child(6) {
						width: 90px;
						color: #ffdc45;
					}

					&:nth-child(7) {
						width: 90px;
						color: #00ffcf;
					}
				}
			}
		}
	}
</style>

