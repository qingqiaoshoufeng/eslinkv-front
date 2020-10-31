<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-line-1" :id="id"/>
		<div class="pos-a h-line-1-title">{{data&&data.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'

	const localConfigValue = {
		api: {
			data: JSON.stringify({
				title: '数量',
				value: [['2015', 250], ['2016', 350], ['2017', 150], ['2018', 280], ['2019', 250], ['2020', 250]]
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
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValueCustom(localConfigValue)
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

