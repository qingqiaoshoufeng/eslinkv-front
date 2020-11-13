<template>
	<div class="widget-part" :style="styles">
		<div class="icon" :style="`background-image: url(${config.config && config.config.icon})`"></div>
		<div class="num">{{ data && data.num }}{{config.config.suffix}}</div>
		<div class="text">{{ config.config && config.config.text }}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import {getInput, getSelect} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				icon: getSelect('icon', '图片', ['/static/icons/cylinder.svg']),
				text: getInput('text', '文字'),
				suffix: getInput('suffix', '后缀'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			icon: true,
			text: true,
			suffix: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
				num: '11.01',
			})
		},
		config: {
			icon: '/static/icons/cylinder.svg',
			text: '2019年销售气量',
			suffix: '亿m³'
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		text-align: center;

		.icon {
			width: 122px;
			height: 110px;
			margin: 0 auto 40px;
			background-size: 100% 100%;
		}

		.num {
			font-weight: bold;
			font-size: 28px;
			line-height: 28px;
			color: #FEFFFF;
			margin-bottom: 12px;
		}

		.text {
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
			color: #00DDFF;
		}
	}
</style>

