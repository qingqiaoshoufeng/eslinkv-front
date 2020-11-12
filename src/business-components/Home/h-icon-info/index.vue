<template>
	<div class="widget-part" :style="styles">
		<div class="icon" :style="`background-image: url(${data && data.icon})`"></div>
		<div class="num">{{ data && data.num }}亿m³</div>
		<div class="text">{{ data && data.text }}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				icon: '/static/icons/cylinder.svg',
				num: '11.01',
				text: '2019年销售气量'
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {},
		computed: {},
		created() {
			this.configSource = this.parseConfigSource(config);
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

