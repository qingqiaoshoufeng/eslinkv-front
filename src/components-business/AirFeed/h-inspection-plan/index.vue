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
	import mixins from '../../mixins';
	import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

	const config = {
		animation: true,
		config: {
			desc: true,
			numFontSize: true,
			descFontSize: true,
			numColor: true,
			descColor: true
		},
	};
	const value = {
		api: {
			data: JSON.stringify({
				value: 320
			})
		},
		config: {
			desc: '计划巡检(件)',
			numFontSize: 40,
			descFontSize: 20,
			numColor: '#fff',
			descColor: '#00FFCF'
		}
	}
	const configSource = {
		config: {
			fields: {
				desc: getInput('desc', '描述'),
				numFontSize: getInput('numFontSize', '数字字体大小'),
				descFontSize: getInput('descFontSize', '描述字体大小'),
				numColor: getInput('numColor', '数字颜色'),
				descColor: getInput('descColor', '描述颜色'),
			}
		},
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
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

