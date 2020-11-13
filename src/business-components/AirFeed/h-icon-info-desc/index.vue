<template>
	<div class="h-icon-info-desc widget-part fn-flex pos-r" :style="styles">
		<div class="pos-a h-icon-info-bg"></div>
		<div
			class="h-icon-info-desc__icon"
			:style="`background-image: url(${data && data.icon})`"
		></div>
		<div class="h-icon-info-desc__text">{{ data && data.text }}</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { getInput, getSelect } from '../../../../lib';
const config = {
	animation: true,
	config: {
		icon: true,
		text: true,
	},
};
const configSource = {
	config: {
		fields: {
			icon: getSelect('icon', '描述', ['/static/icons/phone-border.svg']),
			text: getInput('text', 'icon'),
		},
	},
};
const value = {
	api: {
		data: JSON.stringify({
			icon: '/static/icons/h-icon-info-desc-1.svg',
			text: '热线服务业务受理分析(次)',
		}),
	},
};
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.h-icon-info-desc {
	align-items: center;

	.h-icon-info-bg {
		background: linear-gradient(
			90deg,
			rgba(0, 31, 109, 1) 0%,
			rgba(0, 31, 109, 0) 100%
		);
		width: 100%;
		height: 100%;
		opacity: 0.2;
		top: 0;
		left: 0;
	}

	&__icon {
		width: 32px;
		height: 32px;
		background-color: #064F94;
		background-size: 22px 24px;
		background-repeat: no-repeat;
		background-position: center;
		margin-left: 6px;
	}

	&__text {
		font-size: 20px;
		line-height: 24px;
		color: #FEFFFF;
		margin-left: 10px;
	}
}
</style>

