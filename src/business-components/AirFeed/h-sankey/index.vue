<template>
	<div class="h-call-count-statistics widget-part" :style="styles" >
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
				links: options.series.links,
				data: options.series.data
			})
		}
	}
	export default {
		mixins: [mixins],
		computed: {
		},
		methods: {
			setOption(data) {
				options.series.links=this.data.links
				options.series.data=this.data.data
				this.instance && this.instance.setOption({
					...options
				})
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

