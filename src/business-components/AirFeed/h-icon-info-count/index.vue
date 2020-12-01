<template>
	<div class="h-icon-info-count widget-part" :style="styles">
		<div
			class="h-icon-info-count__icon"
			:style="`background-image: url(${
				config.config && config.config.icon
			})`"
		></div>
		<div class="h-icon-info-count__text">
			{{ config.config && config.config.text }}
		</div>
		<div class="h-icon-info-count__count font-num">
			{{ computedMinutes }}
		</div>
		<div class="h-icon-info-count__unit">分钟</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import {getInput, getSelect} from '../../../../lib';
	// 标记
	const config = {
		animation: true,
		config: {
			text: true,
			icon: true,
		},
	};
	const configSource = {
		config: {
			fields: {
				text: getInput('text', '描述'),
				icon: getSelect('icon', 'icon', [
					'/static/icons/phone-border.svg',
					'/static/icons/phone-border-2.svg',
				]),
			},
		},
	};
	const value = {
		api: {
			data: JSON.stringify({
				icon: '/static/icons/phone-border.svg',
				minutes: 680230,
			}),
		},
		config: {
			icon: '/static/icons/phone-border.svg',
			text: '累计通话时长:',
		},
	};
	export default {
		mixins: [mixins],
		methods: {},
		computed: {
			computedMinutes() {
				if (!this.data) return 0;
				return this.data.minutes.toLocaleString();
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss">
	.h-icon-info-count {
		display: flex;
		align-items: center;
		background: linear-gradient(90deg, #001F6D 0%, rgba(0, 31, 109, 0) 100%);

		&__icon {
			width: 32px;
			height: 32px;
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: center;
			margin-left: 16px;
		}

		&__text {
			font-size: 18px;
			line-height: 24px;
			color: #fff;
			margin-left: 8px;
		}

		&__count {
			font-weight: bold;
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
			margin-left: 16px;
		}

		&__unit {
			margin-left: 8px;
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
		}
	}
</style>

