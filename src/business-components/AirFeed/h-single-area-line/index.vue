<template>
	<div class="h-call-count-statistics widget-part" :style="styles" >
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	import getOptions, { test } from './options'

	const config = {animation: true}
	const value = {
		api: {
			data: JSONStringify({
				data: test
			})
		}
	}
	export default {
		mixins: [mixins],
		computed: {
		},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOptions(this.data.data))
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

