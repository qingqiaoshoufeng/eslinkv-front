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
	import { value, customConfig } from './index.component'

	export default {
		mixins: [mixins],
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;

		.desc {
			width: 192px;
			font-size: 24px;
			font-weight: 500;
			line-height: 34px;
			color: #66e3fd;
		}

		.num {
			display: flex;
			align-items: baseline;
			margin-left: 6px;
			font-size: 48px;
			font-weight: 600;
			line-height: 67px;
			color: #fee607;
		}

		.unit {
			margin-left: 4px;
			font-size: 24px;
			line-height: 34px;
			color: #fff;
		}
	}
</style>

