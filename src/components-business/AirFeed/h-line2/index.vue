<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-line-1" :id="id"/>
		<div class="pos-a h-line-1-title">{{config.config&&config.config.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'
	import { config, configSource, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			show(data) {
				clearInterval(this.animateTimer)
				this.animateTimer = setInterval(() => {
					this.instance.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: this.animateActiveIndex % data.value.length
					})
					if (this.animateActiveIndex >= data.value.length - 1) {
						this.animateActiveIndex = 0
					} else {
						this.animateActiveIndex = this.animateActiveIndex + 1
					}
					this.instance.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: this.animateActiveIndex % data.value.length
					})
				}, 1000)
			},
			setOption(data) {
				options.series[0].data = data.value
				this.instance && this.instance.setOption(options)
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val}
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(data)
							this.show(data)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-line-1 {
		height: 100%;
	}

	.h-line-1-title {
		font-size: 16px;
		color: #fff;
		line-height: 16px;
		top: 0;
		left: 0;
	}
</style>

