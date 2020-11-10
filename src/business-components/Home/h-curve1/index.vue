<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-curve-1" :id="id"/>
		<div class="pos-a h-curve-1-title">{{data&&data.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				title: '用户', value: [['10', 4000], ['11', 6000], ['12', 5000], ['01', 6000],
					['02', 7000], ['03', 6000], ['04', 4000], ['05', 3000],
					['06', 3500], ['07', 3800], ['08', 4000], ['09', 5000]]
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				options.series[0].data = data.value
				this.instance && this.instance.setOption(options)
			},
			init() {
				// console.log('init')
			}
		},
		watch: {
			'configValue.api.params': {
				handler(val) {
					// 联动示例
					// console.log('-', val)
					this.init()
				},
				deep: true,
				immediate: true
			},
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val}
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(data)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-curve-1 {
		height: 100%;
	}

	.h-curve-1-title {
		font-size: 16px;
		color: #fff;
		line-height: 16px;
		top: 0;
		left: 0;
	}
</style>

