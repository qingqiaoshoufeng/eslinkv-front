<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="total">
			<img src="./img/click-logo.svg" alt="">
			<span class="total-txt">累计操作次数</span>
			<span class="total-num font-num">{{ data&&data.total.toLocaleString() }}</span>
		</div>
		<div class="history">
			<div class="history-item">
				<div class="history-title">
					<div class="history-title-txt">昨日操作</div>
					<div class="history-title-unit">次数</div>
				</div>
				<div class="content">
					<div class="content-num font-num">{{ data&&data.yesterday.toLocaleString() }}</div>
					<img class="content-icon" src="./img/arrow-up.svg" v-if="data.yesterdayType === 'up'"/>
					<img class="content-icon" src="./img/arrow-down.svg" v-else/>
				</div>
			</div>
			<div class="history-item">
				<div class="history-title">
					<div class="history-title-txt">上周操作</div>
					<div class="history-title-unit">次数</div>
				</div>
				<div class="content">
					<div class="content-num font-num">{{ data&&data.lastWeek.toLocaleString() }}</div>
					<img class="content-icon" src="./img/arrow-up.svg" v-if="data.lastWeekType === 'up'"/>
					<img class="content-icon" src="./img/arrow-down.svg" v-else/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import {getInput} from '../../../../lib';

	const config = {
		animation: true,
	};
	const value = {
		api: {
			data: JSON.stringify({
				total: 1317190,
				yesterday: 1190,
				yesterdayType: 'up',
				lastWeek: 1190,
				lastWeekType: 'down'
			}),
		}
	};
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
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
				color: #00DDFF;
			}

			.total-num {
				font-weight: bold;
				font-size: 32px;
				line-height: 32px;
				color: #FFFFFF;
				margin-left: 16px;
			}
		}

		.history {
			display: flex;
			justify-content: space-between;

			.history-title {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #00DDFF;

				.history-title-txt {
					width: 88px;
					height: 32px;
					line-height: 32px;
					background: #0057A9;
					font-size: 18px;
					color: #FFFFFF;
					text-align: center;
				}

				.history-title-unit {
					font-size: 16px;
					line-height: 16px;
					color: #00DDFF;
				}
			}

			.content {
				margin-top: 6px;
				position: relative;
				width: 224px;
				height: 72px;
				padding: 0 16px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: linear-gradient(360deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0.2) 100%);

				.content-num {
					font-weight: bold;
					font-size: 32px;
					line-height: 32px;
					color: #FFFFFF;
				}

				.content-icon {
					width: 16px;
					height: 16px;
				}

				&:before {
					content: '';
					display: block;
					width: 40px;
					height: 1px;
					background: #1675CE;
					position: absolute;
					left: 0;
					bottom: 1px;
				}

				&:after {
					content: '';
					display: block;
					width: 40px;
					height: 1px;
					background: #1675CE;
					position: absolute;
					right: 0;
					bottom: 1px;
				}
			}
		}
	}
</style>

