<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="title">
			<li v-for="(k, i) in config.config.tableHeader" :key="i">{{ k }}</li>
		</ul>
		<div class="content" @mouseenter="isStop = true" @mouseleave="isStop = false">
			<ul
				class="content-row"
				v-for="(item, index) in curr"
				:key="index"
			>
				<li>{{ item.startTime }}</li>
				<li>{{ item.dangerType }}</li>
				<li>{{ item.deviceType }}</li>
				<li>{{ item.rank }}</li>
				<li :class="{active: item.status === '未处理'}">{{ item.status }}</li>
				<li>{{ item.handleTime }}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { customConfig, value } from './index.component'

	const SIZE = 5
	export default {
		mixins: [mixins],
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
		methods: {},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		},
		beforeDestroy () {
			clearInterval(this.timer)
			this.timer = null
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		.title {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 100%;
			height: 32px;
			padding-left: 15px;
			background: rgba(23, 123, 255, 0.2);

			& > li {
				flex: none;
				font-size: 18px;
				color: rgba(255, 255, 255, 0.8);
				text-align: left;

				&:nth-child(1) {
					width: 90px;
				}

				&:nth-child(2) {
					width: 102px;
				}

				&:nth-child(3) {
					width: 114px;
				}

				&:nth-child(4) {
					width: 113px;
				}

				&:nth-child(5) {
					width: 134px;
				}

				&:nth-child(6) {
					flex: 1;
				}
			}
		}

		.content {
			height: 165px;
			padding-left: 15px;
			overflow: hidden;

			.content-warp {
				height: 165px;
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

					&:nth-child(1) {
						width: 90px;
					}

					&:nth-child(2) {
						width: 102px;
					}

					&:nth-child(3) {
						width: 114px;
					}

					&:nth-child(4) {
						width: 113px;
						color: #ffdc45;
					}

					&:nth-child(5) {
						width: 134px;
						color: #00ffcf;

						&.active {
							color: #ffdc45;
						}
					}

					&:nth-child(6) {
						flex: 1;
					}
				}
			}
		}
	}
</style>

