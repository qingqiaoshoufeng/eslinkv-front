<template>
	<div class="widget-part" :style="styles">
		<div class="icon" :style="`background-image: url(${data && data.icon})`"></div>
		<div class="info">{{ data && data.text }}</div>
		<div class="number font-num">{{data && data.count }}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				count: 123456,
				icon: '/static/icons/h-inline-logo1.svg',
				text: '居民户',
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
		display: flex;
		align-items: center;
		background: linear-gradient(89.95deg, rgba(255, 255, 255, 0.08) 0.04%, rgba(255, 255, 255, 0) 100.59%);

		.icon {
			width: 64px;
			height: 64px;
			background-size: 100% 100%;
		}

		.info {
			width: 214px;
			font-size: 18px;
			line-height: 24px;
			color: #00DDFF;
			margin-left: 24px;
		}

		.number {
			font-weight: bold;
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
		}
	}
</style>

