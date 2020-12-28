<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="val">{{ data.value | toThousand }}</div>
    <div class="unit">({{ config.config.unit }})</div>
    <div class="title">
      {{ config.config.title1 }}<br>
      {{ config.config.title2 }}
    </div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "@lib"

	const config = {
		animation: true,
		config: {
      unit: true,
			title1: true,
			title2: true,
		}
	}

	const configSource = {
		config: {
			fields: {
				title1: getInput('title1', '标题1'),
				title2: getInput('title2', '标题2'),
        unit: getInput('unit', '单位'),
			}
		},
	}

	const value = {
		api: {
			data: JSON.stringify({
				value: 34325
			}),
		},
		config: {
			unit: '万m³',
			title1: '门站月度',
      title2: '累计接纳量'
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
.widget-part {
  padding-top: 16px;
  background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.5) 100%);
  .val {
    font-family: font-num;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    color: #00DDFF;
  }
  .unit {
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.75);
    margin: 8px 0 22px;
  }
  .title {
    font-size: 20px;
    line-height: 32px;
    color: #FFFFFF;
  }
}
</style>

