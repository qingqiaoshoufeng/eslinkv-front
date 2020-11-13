<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="statistical-box">
			<div class="left fn-flex flex-column">
				<div class="time">{{ timeDesc }}</div>
				<div class="decs">
					{{ config.config && config.config.desc }}
				</div>
			</div>
			<div class="right">
				<div class="value">
					<div
						v-for="(item, index) in statisticalVal"
						:key="index"
						class="font-num"
						:class="{item: item !== ',',comma: item === ',',}"
					>
						<!-- 滚动盒子 -->
						<div class="scroll-box" v-if="item !== ','">
							<div
								class="scroll-list"
								ref="numberItem"
								:style="{transform: `translate(0, -${transform[index]}%)`,}"
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
import mixins from '../../mixins';
import { getInput } from '../../../../lib';
const config = {
	animation: true,
	config: {
		desc: true,
		timeDesc: true,
	},
};
const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			timeDesc: getInput('timeDesc', '时间'),
		},
	},
};
const value = {
	api: {
		data: JSON.stringify({
			time: 2020,
			value: 375321809,
		}),
	},
	config: {
		timeDesc: 'xxxx年度',
		desc: '累计接纳量(m3)',
	},
};
export default {
	data() {
		return {
			scrollList: new Int8Array(10),
			transform: new Int8Array(9),
		};
	},
	mixins: [mixins],
	computed: {
		statisticalVal() {
			if (this.data) return this.data.value.toLocaleString().split('');
			return [];
		},
		timeDesc() {
			if (!this.data) return '2020年度';
			return this.config.config.timeDesc.replace('xxxx', this.data.time);
		},
	},
	methods: {
		setNumberTransform() {
			if (this.data) {
				const numberArr = this.data.value.toLocaleString().split('');
				this.transform = numberArr.map(item => item * 10);
			}
		},
	},
	watch: {
		data: {
			handler(val) {
				if (val) {
					this.setNumberTransform();
				}
			},
			deep: true,
		},
	},
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted() {
		setTimeout(() => {
			this.setNumberTransform();
		}, 500);
	},
};
</script>
<style lang="scss">
.statistical-box {
	width: 100%;
	height: 100%;
	display: flex;

	.left {
		width: 180px;
		height: 80px;

		.time {
			height: 32px;
			line-height: 32px;
			font-size: 32px;
			font-style: normal;
			font-weight: 600;
			letter-spacing: 0;
			text-align: right;
			color: #fff;
			margin-top: 11px;
		}

		.decs {
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0;
			text-align: right;
			color: rgba(255, 255, 255, 0.75);
			margin-top: 16px;
		}
	}

	.right {
		flex: 1;

		.value {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;

			.item {
				height: 80px;
				width: 56px;
				margin: 0 8px;

				.scroll-box {
					height: 80px;
					width: 56px;
					overflow: hidden;

					.scroll-list {
						display: flex;
						flex-direction: column;
						transition: transform 1s ease-in-out;

						.scroll-item {
							height: 80px;
							width: 56px;
							border-radius: 2px;
							background-image: url('/static/images/airfeed/statistical.svg');
							line-height: 80px;
							text-align: center;
							font-size: 48px;
							font-style: normal;
							font-weight: 700;
							color: #fff;
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
				color: #fff;
				text-align: center;
				line-height: 80px;
			}
		}
	}
}
</style>

