<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-8 fn-flex flex-row">
			<h2>{{config.config&&config.config.title}}</h2>
			<p class="font-num">{{data&&data.value|toThousand}}</p>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
	.h-title-8 {
		background: #000959;
		border: 1px solid rgba(0, 221, 255, 0.6);
		height: 100%;
		align-items: center;

		h2 {
			margin-left: 8px;
			font-weight: normal;
			font-size: 24px;
			line-height: 24px;
			color: #00DDFF;
			white-space: nowrap;
		}

		p {
			font-weight: bold;
			font-size: 40px;
			line-height: 48px;
			color: #FEFFFF;
			margin-left: auto;
			margin-right: 9px;
		}
	}

</style>

