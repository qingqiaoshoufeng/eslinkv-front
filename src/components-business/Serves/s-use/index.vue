<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="total">
			<img src="./img/click-logo.svg" alt="" />
			<span class="total-txt">本月累计扫码次数</span>
			<span class="total-num font-num">
				{{ data && data.total | toThousand }}
			</span>
		</div>
		<div class="history">
			<div class="history-item">
				<div class="history-title">
					<div class="history-title-txt">昨日扫码</div>
					<div class="history-title-unit">次数</div>
				</div>
				<div class="content">
					<div class="content-num font-num">
						{{ data && data.yesterday | toThousand }}
					</div>
					<img
						class="content-icon"
						src="./img/arrow-up.svg"
						v-if="data.yesterdayType === 'up'"
					/>
					<img
						class="content-icon"
						src="./img/arrow-down.svg"
						v-else
					/>
				</div>
			</div>
			<div class="history-item">
				<div class="history-title">
					<div class="history-title-txt">上周扫码</div>
					<div class="history-title-unit">次数</div>
				</div>
				<div class="content">
					<div class="content-num font-num">
						{{ data && data.lastWeek | toThousand }}
					</div>
					<img
						class="content-icon"
						src="./img/arrow-up.svg"
						v-if="data.lastWeekType === 'up'"
					/>
					<img
						class="content-icon"
						src="./img/arrow-down.svg"
						v-else
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	.total {
		display: flex;
		align-items: center;
		margin-bottom: 24px;

		img {
			width: 64px;
			height: 64px;
			margin-right: 14px;
		}

		.total-txt {
			font-size: 18px;
			line-height: 24px;
			color: #0df;
		}

		.total-num {
			margin-left: 16px;
			font-size: 32px;
			font-weight: bold;
			line-height: 32px;
			color: #fff;
		}
	}

	.history {
		display: flex;
		justify-content: space-between;

		.history-title {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #0df;

			.history-title-txt {
				width: 88px;
				height: 32px;
				font-size: 18px;
				line-height: 32px;
				color: #fff;
				text-align: center;
				background: #0057a9;
			}

			.history-title-unit {
				font-size: 16px;
				line-height: 16px;
				color: #0df;
			}
		}

		.content {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 224px;
			height: 72px;
			padding: 0 16px;
			margin-top: 6px;
			background: linear-gradient(
				360deg,
				rgba(0, 87, 169, 0.5) 0%,
				rgba(0, 87, 169, 0.2) 100%
			);

			.content-num {
				font-size: 32px;
				font-weight: bold;
				line-height: 32px;
				color: #fff;
			}

			.content-icon {
				width: 16px;
				height: 16px;
			}

			&::before {
				position: absolute;
				bottom: 1px;
				left: 0;
				display: block;
				width: 40px;
				height: 1px;
				content: '';
				background: #1675ce;
			}

			&::after {
				position: absolute;
				right: 0;
				bottom: 1px;
				display: block;
				width: 40px;
				height: 1px;
				content: '';
				background: #1675ce;
			}
		}
	}
}
</style>
