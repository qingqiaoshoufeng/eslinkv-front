<template>
	<div class="widget-part" :style="styles" v-if="data">
		<img src="/static/images/experience/info-icon1.svg" class="icon">
		<div class="info">
			<div class="info-nun font-num">{{ data.num }}</div>
			<div class="info-txt">{{ config.config.desc1 }}</div>
		</div>
		<div class="change">
			<div class="change-num font-num">
				<span>{{ data.changeNum }}</span>
				<img src="/static/icons/arrow-up.svg" class="arrow" v-if="data.isIncrease">
				<img src="/static/icons/arrow-down.svg" class="arrow" v-else>
			</div>
			<div class="change-txt">{{ config.config.desc2 }}</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { value, customConfig } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;

		.icon {
			width: 80px;
			height: 80px;
			margin-right: 22px;
		}

		.info {
			flex: 1;
			text-align: left;

			.info-nun {
				font-size: 48px;
				font-weight: bold;
				line-height: 48px;
				color: #feffff;
			}

			.info-txt {
				margin-top: 4px;
				font-size: 20px;
				line-height: 24px;
				color: #0df;
			}
		}

		.change {
			width: 130px;
			height: 85px;
			padding: 16px 8px;
			text-align: left;
			background: linear-gradient(180deg, rgba(0, 221, 255, 0.3) 0%, rgba(0, 221, 255, 0) 100%);
			border-radius: 8px;

			.change-num {
				font-size: 32px;
				font-weight: bold;
				line-height: 32px;
				color: #feffff;

				.arrow {
					width: 12px;
					margin-left: 14px;
				}
			}

			.change-txt {
				margin-top: 4px;
				font-size: 20px;
				line-height: 24px;
				color: #0df;
			}
		}
	}
</style>

