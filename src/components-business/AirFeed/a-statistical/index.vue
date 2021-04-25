<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="statistical-box">
			<div class="left fn-flex flex-column">
				<div class="time">{{ year }}{{ config.config.timeDesc }}</div>
				<div class="decs">
					{{ config.config.desc }}
				</div>
			</div>
			<div class="right">
				<div class="value">
					<div
						v-for="(item, index) in statisticalVal"
						:key="index"
						class="font-num"
						:class="{ item: item !== ',', comma: item === ',' }"
					>
						<!-- 滚动盒子 -->
						<div class="scroll-box" v-if="item !== ','">
							<div
								class="scroll-list"
								ref="numberItem"
								:style="{
									transform: `translate(0, -${transform[index]}%)`,
								}"
							>
								<div
									class="scroll-item"
									v-for="(child, key) in scrollList"
									:key="key"
								>
									{{ key }}
								</div>
							</div>
						</div>
						<!-- 逗号盒子 -->
						<div class="comma" v-else>{{ item }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { customConfig, value } from './index.component'

export default {
	data() {
		return {
			year: new Date().getFullYear(),
			scrollList: new Int8Array(10),
			transform: new Int8Array(9),
		}
	},
	mixins: [widgetMixin],
	computed: {
		statisticalVal() {
			if (this.data)
				return Number(this.data.value).toLocaleString().split('')
			return []
		},
	},
	methods: {
		setNumberTransform() {
			if (this.data) {
				const numberArr = Number(this.data.value)
					.toLocaleString()
					.split('')
				this.transform = numberArr.map(item => item * 10)
			}
		},
	},
	watch: {
		data: {
			handler(val) {
				if (val) {
					this.setNumberTransform()
				}
			},
			deep: true,
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
	mounted() {
		setTimeout(() => {
			this.setNumberTransform()
		}, 500)
		this.$api.bussiness.year().then(res => {
			this.year = res
		})
	},
}
</script>
<style lang="scss">
.statistical-box {
	display: flex;
	width: 100%;
	height: 100%;

	.left {
		min-width: 180px;
		height: 80px;

		.time {
			width: 100%;
			height: 32px;
			margin-top: 11px;
			font-size: 32px;
			font-style: normal;
			font-weight: 600;
			line-height: 32px;
			color: #fff;
			text-align: right;
			letter-spacing: 0;
		}

		.decs {
			width: 100%;
			margin-top: 16px;
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: 24px;
			color: #0df;
			text-align: right;
			letter-spacing: 0;
		}
	}

	.right {
		flex: 1;

		.value {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;

			.item {
				width: 56px;
				height: 80px;
				margin: 0 8px;

				.scroll-box {
					width: 56px;
					height: 80px;
					overflow: hidden;

					.scroll-list {
						display: flex;
						flex-direction: column;
						transition: transform 1s ease-in-out;

						.scroll-item {
							width: 56px;
							height: 80px;
							font-size: 48px;
							font-style: normal;
							font-weight: 700;
							line-height: 80px;
							color: #fff;
							text-align: center;
							background-image: url('/static/images/airfeed/statistical.svg');
							background-repeat: no-repeat;
							background-size: 100% 100%;
							border-radius: 2px;
						}
					}
				}
			}

			.comma {
				width: 12px;
				height: 80px;
				font-size: 48px;
				font-style: normal;
				font-weight: 700;
				line-height: 80px;
				color: #fff;
				text-align: center;
			}
		}
	}
}
</style>
