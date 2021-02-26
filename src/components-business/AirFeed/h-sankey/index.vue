<template>
	<div class="h-call-count-statistics widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import getOption from './options'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(JSON.parse(JSON.stringify(this.data.data))))
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
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>

