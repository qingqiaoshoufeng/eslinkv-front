<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-8 fn-flex flex-row">
			<h2>{{ config.config && config.config.title }}</h2>
			<p class="font-num">{{ data && data.value|toThousand }}</p>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
	.h-title-8 {
		align-items: center;
		height: 100%;
		background: #000959;
		border: 1px solid rgba(0, 221, 255, 0.6);

		h2 {
			margin-left: 8px;
			font-size: 24px;
			font-weight: normal;
			line-height: 24px;
			color: #0df;
			white-space: nowrap;
		}

		p {
			margin-right: 9px;
			margin-left: auto;
			font-size: 40px;
			font-weight: bold;
			line-height: 48px;
			color: #feffff;
		}
	}

</style>

