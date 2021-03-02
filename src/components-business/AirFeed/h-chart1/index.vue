<template>
	<div class="widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import getOption from './options'
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption() {
				this.instance && this.instance.setOption(getOption(this.data, this.config.config))
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

			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>

