<template>
	<div class="widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options'
	import { config, configSource, value } from './index.component'

	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data.data, this.config.config))
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

