
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
import mixins from '../../../../lib/mixins';
import { config, configSource, value } from './index.component'

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
		
		this.configValue = this.parseConfigValue(value);
	},
};
</script>
<style lang="scss">
.h-icon-info-count {
	display: flex;
	align-items: center;
	background: linear-gradient(90deg, #001f6d 0%, rgba(0, 31, 109, 0) 100%);

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
		color: #00ddff;
		margin-left: 8px;
	}

	&__count {
		font-weight: bold;
		font-size: 32px;
		line-height: 32px;
		color: #ffffff;
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

