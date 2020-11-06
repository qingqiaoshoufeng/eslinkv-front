<template>
	<div class="h-icon-info-count" :style="styles">
		<div class="h-icon-info-count__icon" :style="`background-image: url(${data && data.icon})`"></div>
		<div class="h-icon-info-count__text">{{ data && data.text }}</div>
		<div class="h-icon-info-count__count font-num">{{ data && data.minutes }}</div>
		<div class="h-icon-info-count__unit">分钟</div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				icon: '/static/icons/phone-border.svg',
				text: '累计通话时长:',
				minutes: '680,230'
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {

		},
		computed: {

		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	}
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
	&__text{
		font-family: PingFang SC;
		font-size: 18px;
		line-height: 24px;
		color: #00DDFF;
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
		font-family: PingFang SC;
		font-size: 18px;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.75);
	}
}
</style>

