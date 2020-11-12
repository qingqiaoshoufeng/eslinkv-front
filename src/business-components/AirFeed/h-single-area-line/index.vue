<template>
	<div class="h-call-count-statistics widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import options from './options'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				title: '%',
				data: [
					{
						name: "10-1",
						value: 10
					},
					{
						name: "10-2",
						value: 40
					},
					{
						name: "10-3",
						value: 30
					},
					{
						name: "10-4",
						value: 20
					},
					{
						name: "10-5",
						value: 10
					},
					{
						name: "10-6",
						value: 50
					},
					{
						name: "10-7",
						value: 70
					},
					{
						name: "10-8",
						value: 60
					},
					{
						name: "10-9",
						value: 80
					},
					{
						name: "10-10",
						value: 40
					}
				]
			})
		}
	}
	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption(data) {
				options.yAxis[0].name = data.title
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
			this.configSource = this.parseConfigSource(config);
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

