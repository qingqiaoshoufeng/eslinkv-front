<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="title">
			<li>时间</li>
			<li>客户</li>
			<li>业务类型</li>
			<li>状态</li>
		</ul>
		<div
			class="content"
			@mouseenter="isStop = true"
			@mouseleave="isStop = false"
		>
			<ul
				class="content__row1"
				v-for="(item, index) in curr"
				:key="index"
			>
				<li>{{ item.time || '' }}</li>
				<li>{{ item.channel || '暂无姓名' }}</li>
				<li>{{ item.businessType || '' }}</li>
				<li
					:class="{
						closed: item.statusDesc === '未通过',
						passed: item.statusDesc === '已受理',
					}"
				>
					{{ item.statusDesc || '' }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {
			timer: null,
			loop: 0,
			isStop: false,
		}
	},
	watch: {
		data: {
			handler(val) {
				clearInterval(this.timer)
				this.loop = 0
				this.timer = setInterval(() => {
					if (this.isStop) return
					if (
						this.loop ===
						Math.ceil(val.list.length / this.config.config.size) - 1
					) {
						this.loop = 0
					} else {
						this.loop++
					}
				}, 2000)
			},
			deep: true,
			immediate: true,
		},
	},
	computed: {
		curr() {
			if (!this.data) return []
			return this.data.list.slice(
				this.loop * this.config.config.size,
				(this.loop + 1) * this.config.config.size,
			)
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
	beforeDestroy() {
		clearInterval(this.timer)
		this.timer = null
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	.title {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
		height: 40px;
		padding: 8px;
		background: rgba(23, 123, 255, 0.2);

		& > li {
			font-size: 20px;
			line-height: 24px;
			color: #00cbf4;
			text-align: left;

			&:nth-child(1) {
				width: 144px;
			}

			&:nth-child(2) {
				width: 100px;
			}

			&:nth-child(3) {
				width: 126px;
			}

			&:nth-child(4) {
				flex: 1;
			}
		}
	}

	.content {
		height: 432px;

		&__seamless-warp1 {
			height: 432px;
			overflow: hidden;
		}

		&__row1 {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			height: 48px;
			padding-left: 8px;

			&:nth-child(2n + 1) {
				background: rgba(255, 255, 255, 0.1);
			}

			& > li {
				font-size: 20px;
				line-height: 24px;
				color: #fff;
				text-align: left;

				&:nth-child(1) {
					width: 144px;
					color: rgba(255, 255, 255, 0.75);
				}

				&:nth-child(2) {
					width: 100px;
				}

				&:nth-child(3) {
					width: 126px;
				}

				&:nth-child(4) {
					flex: 1;
					color: #0df;

					&.closed {
						color: #e5615b;
					}

					&.passed {
						color: #00ffcf;
					}
				}
			}
		}
	}
}
</style>
