
<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="statistical-box">
			<div class="left">
				<div class="time">{{data&&data.time}}</div>
				<div class="decs">{{data&&data.decs}}</div>
			</div>
			<div class="right">
				<div class="value">
					<div
						v-for="(item,index) in statisticalVal"
						:key="index"
						:class="{'item':item!==',','font-num':true,'comma':item===','}"
					>
						<!-- 滚动盒子 -->
						<div class="scroll-box" v-if="item!==','">
							<div class="scroll-list" ref="numberItem">
								<div class="scroll-item" v-for="(item1,idx) in scrollList" :key="idx">{{item1}}</div>
							</div>
						</div>
						<!-- 逗号盒子 -->
						<div class="comma" v-else>{{item}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
// import options from './options'

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			time: '2020年度',
			value: 375321809,
			decs: '累计接纳量(m3)',
		}),
	},
};
export default {
	data() {
		return {
			scrollList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		};
	},
	mixins: [mixins],
	computed: {
		statisticalVal() {
			return this.data.value.toLocaleString().toString().split('');
		},
	},
	methods: {
		setNumberTransform() {
            const numberItems = this.$refs.numberItem; 
			const numberArr = this.data.value.toString().split('');
			for (let index = 0; index < numberItems.length; index++) {
				const elem = numberItems[index];
				elem.style.transform = `translate(0, -${
					numberArr[index] * 10
				}%)`;
			}
		},
	},
	created() {
		this.configSource = this.parseConfigSource(config);
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
		display: flex;
		flex-direction: column;
		.time {
			height: 32px;
			line-height: 32px;
			font-family: PingFang SC;
			font-size: 32px;
			font-style: normal;
			font-weight: 600;
			line-height: 32px;
			letter-spacing: 0px;
			text-align: right;
			color: #fff;
			margin-top: 11px;
		}
		.decs {
			//styleName: 文字/24;
			font-family: PingFang SC;
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0px;
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
							//styleName: 数字/48号;
							font-size: 48px;
							font-style: normal;
							font-weight: 700;
							color: #fff;
							text-align: center;
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

