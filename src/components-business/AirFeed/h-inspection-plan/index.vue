<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div
			class="num font-num"
			:style="{
          fontSize: config.config.numFontSize,
          color: config.config.numColor,
        }"
		>{{ data.value | toThousand }}
		</div>
		<div
			class="num-desc"
			:style="{
          fontSize: config.config.descFontSize,
          color: config.config.descColor,
        }"
		>{{ config.config.desc }}
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins';
	import { config, configSource, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(value);
		},
	};
</script>
<style lang="scss" scoped>
	.num {
		font-weight: bold;
		font-size: 32px;
		line-height: 32px;
		color: #FFFFFF;
		margin-bottom: 8px;
	}

	.num-desc {
		font-size: 20px;
		line-height: 24px;
		color: #fff;
	}
</style>

