<template>
	<div class="widget-part" :style="styles" v-if="data">
		<pie
			class="pie"
			:data="data"
			:unit="config.config.unit"
			:text="config.config.title1"
			:subtext="config.config.title2"
			:startAngle="config.config.startAngle"
		></pie>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "../../../../lib";
	import pie from '../../More/h-left/pie'

	const configSource = {
		config: {
			fields: {
				unit: getInput('unit', '单位'),
				title1: getInput('title1', '标题1'),
				title2: getInput('title2', '标题2'),
				startAngle: getInput('startAngle', '起始角度'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			unit: true,
			title1: true,
			startAngle: true,
			title2: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					name: '城区1',
					value: 72
				},
				{
					name: '城区2',
					value: 32
				},
				{
					name: '城区3',
					value: 12
				},
			])
		},
		config: {
			unit: '万m³',
			title1: '区域',
			title2: '销售气量',
			startAngle: 270,
		}
	}
	export default {
		mixins: [mixins],
		components: {pie},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
	.pie {
		width: 100%;
		height: 100%;
	}
</style>

