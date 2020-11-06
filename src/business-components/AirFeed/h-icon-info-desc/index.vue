<template>
	<div class="h-icon-info-desc" :style="styles">
		<div class="h-icon-info-desc__icon" :style="`background-image: url(${data && data.icon})`"></div>
		<div class="h-icon-info-desc__text">{{ data && data.text }}</div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				icon: '/static/icons/book.svg',
				text: '热线服务业务受理分析(次)',
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
.h-icon-info-desc {
	display: flex;
	align-items: center;
	background: linear-gradient(90deg, #001F6D 0%, rgba(0, 31, 109, 0) 100%);
	&__icon {
		width: 32px;
		height: 32px;
		background-color: #064F94;
		background-size: 22px 24px;
		background-repeat: no-repeat;
		background-position: center;
		margin-left: 6px;
	}
	&__text{
		font-family: PingFang SC;
		font-size: 20px;
		line-height: 24px;
		color: #FEFFFF;
		margin-left: 10px;
	}
}
</style>

