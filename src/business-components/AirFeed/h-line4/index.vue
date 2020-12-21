<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';
	import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

	const config = {
		animation: true,
		config: {
			unit: true
		}
	};
	const value = {
		api: {
			data: JSON.stringify([
				{
					x: '13:00',
					y: 52
				},
				{
					x: '14:00',
					y: 72
				},
				{
					x: '15:00',
					y: 40
				},
				{
					x: '16:00',
					y: 18
				},
				{
					x: '17:00',
					y: 42
				},
				{
					x: '18:00',
					y: 50
				},
				{
					x: '19:00',
					y: 35
				},
				{
					x: '20:00',
					y: 8,
				}
			])
		},
		config: {
			unit: 'm³'
		}
	}
	const configSource = {
		config: {
			fields: {
				unit: getInput('unit', '单位'),
			}
		},
	}
	export default {
		mixins: [mixins],
		methods: {
			setOption() {
				this.instance && this.instance.setOption(getOption(this.data, this.config.config))
			}
		},
		watch: {
			data: {
				handler() {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption()
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>

