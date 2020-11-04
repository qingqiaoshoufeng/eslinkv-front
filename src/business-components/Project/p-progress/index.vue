<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-line-1" :id="id"/>
		<div class="pos-a h-line-1-title">{{data&&data.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'

	const config = {animation: true}
	const value = {
		api: {
            data: JSON.stringify({
				// title: '数量',
				value: [
                    // [ 'amount', 'product'],
                    [ 132, '132天'],
                    [ 201, '201天'],
                    [ 93,  '93天'],
                    [ 256, '256天'],
                    [ 71, '71天'],
                ]
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {
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

