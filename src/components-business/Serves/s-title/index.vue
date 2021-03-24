<template>
	<div class="widget-part" :style="styles" v-if="data">
		<img :src="config.config && config.config.img" alt="">
		<div class="desc">{{ config.config && config.config.desc }}</div>
		<div class="num font-num">{{ data.value | toThousand }}</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
		padding: 0 18px;
		background: url("./img/bg.svg");
		background-size: 100% 100%;

		.num {
			font-size: 48px;
			font-weight: bold;
			line-height: 48px;
			color: #fff;
			text-align: right;
		}

		.desc {
			flex: 1;
			margin-left: 6px;
			font-size: 24px;
			line-height: 24px;
			color: #0df;
			text-align: left;
		}
	}
</style>

