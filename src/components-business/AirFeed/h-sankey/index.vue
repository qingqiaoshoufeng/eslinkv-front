<template>
	<div class="h-call-count-statistics widget-part" :style="styles" >
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				data: [
          {
            source: 'a',
            sourceValue: 100,
            target: 'a1',
            value: 40,
            lineStyle: {
              opacity: 0.4,
              color: '#4A7CDE'
            }
          }, {
            source: 'a',
            target: 'a2',
            sourceValue: 100,
            value: 30
          }, {
            source: 'a',
            target: 'a3',
            sourceValue: 100,
            value: 30
          }, {
            source: 'b',
            target: 'b1',
            sourceValue: 40,
            value: 20
          }, {
            source: 'b',
            target: 'b2',
            sourceValue: 40,
            value: 20
          }, {
            source: 'c',
            target: 'c1',
            sourceValue: 20,
            value: 8
          }, {
            source: 'c',
            target: 'c2',
            sourceValue: 20,
            value: 2
          }, {
            source: 'c',
            target: 'c3',
            sourceValue: 20,
            value: 2
          }, {
            source: 'c',
            target: 'c4',
            sourceValue: 20,
            value: 2
          }, {
            source: 'c',
            target: 'c5',
            sourceValue: 20,
            value: 2
          }, {
            source: 'c',
            target: 'c6',
            sourceValue: 20,
            value: 2
          }, {
            source: 'c',
            target: 'c7',
            sourceValue: 20,
            value: 2
          }]
			})
		}
	}
	export default {
		mixins: [mixins],
		computed: {
		},
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

