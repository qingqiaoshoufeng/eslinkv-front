<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="desc">{{ config.config.desc }}</div>
		<div class="num">
			{{ data.num }}
			<div class="unit">{{ config.config.unit }}</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import {value, customConfig} from './index.component'

	export default {
		mixins: [mixins],
		created() {

			this.configValue = this.parseConfigValue(value, customConfig)
		},
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;

		.desc {
			width: 192px;
			font-weight: 500;
			font-size: 24px;
			line-height: 34px;
			color: #66E3FD;
		}

		.num {
			display: flex;
			align-items: baseline;
			font-weight: 600;
			font-size: 48px;
			line-height: 67px;
			color: #FEE607;
			margin-left: 6px;
		}

		.unit {
			font-size: 24px;
			line-height: 34px;
			color: #FFFFFF;
			margin-left: 4px;
		}
	}
</style>

