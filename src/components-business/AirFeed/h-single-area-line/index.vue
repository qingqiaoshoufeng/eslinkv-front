<template>
	<div class="widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import options from './options'
	import {getInput} from '../../../../lib';

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
			}
		}
	}

	const config = {
		animation: true,
		config: {
			title: true
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
				data: [
					{
						name: "1月",
						value: 10
					},
					{
						name: "2月",
						value: 40
					},
					{
						name: "3",
						value: 30
					},
					{
						name: "4月",
						value: 20
					},
					{
						name: "5月",
						value: 10
					},
					{
						name: "6月",
						value: 50
					}
				]
			})
		},
		config: {
			title: '%'
		}
	}
	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption(data) {
				options.yAxis[0].name = this.config.config.title
				options.series[0].data = data.data.map(item => item.value)
				options.xAxis[0].data = data.data.map(item => item.name)
				this.instance && this.instance.setOption(options)
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(val)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>

