<template>
	<div class="widget-part" :style="styles">
		<div class="icon" :style="`background-image: url(${data && data.icon})`"></div>
		<div class="detail">
			<div class="number font-num">{{ data && data.count }}</div>
			<div class="info">{{ data && data.text }}</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {},
		computed: {},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;

		.icon {
			width: 120px;
			height: 120px;
			margin-right: 16px;
			background-size: 100% 100%;
		}

		.detail {
			width: 160px;
			height: 120px;
			padding: 28px 16px;
			text-align: left;
			background: linear-gradient(91.45deg, rgba(255, 255, 255, 0.08) 1.46%, rgba(255, 255, 255, 0));

			.number {
				margin-bottom: 12px;
				font-size: 32px;
				font-style: normal;
				font-weight: bold;
				line-height: 32px;
				color: #fff;
			}

			.info {
				font-size: 18px;
				font-style: normal;
				font-weight: normal;
				line-height: 24px;
				color: #0df;
			}
		}
	}
</style>

