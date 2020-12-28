<template>
	<div class="widget-part" :style="styles" v-if="data">
		<img :src="config.config&&config.config.img" alt="">
		<div class="desc">{{ config.config&&config.config.desc }}</div>
		<div class="num font-num">{{ data.value | toThousand }}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import {getInput, getSelect} from '../../../../lib';

	const configSource = {
		config: {
			fields: {
				desc: getInput('desc', '描述'),
				img: getSelect('img', '图片', ['/static/icons/s-title-1.svg', '/static/icons/s-title-2.svg']),
			},
		},
	};
	const config = {
		animation: true,
		config: {
			desc: true,
			img: true,
		},
	};
	const value = {
		api: {
			data: JSON.stringify({
				value: 391218,
			})
		},
		config: {
			desc: '累计受理业务(单)',
			img: '/static/icons/s-title-1.svg',
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
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
		padding: 0 18px;
		background: url("./img/bg.svg");
		background-size: 100% 100%;

		.num {
			font-weight: bold;
			font-size: 48px;
			line-height: 48px;
			text-align: right;
			color: #FFFFFF;
		}

		.desc {
			font-size: 24px;
			line-height: 24px;
			color: #00DDFF;
			margin-left: 6px;
			flex: 1;
			text-align: left;
		}
	}
</style>

