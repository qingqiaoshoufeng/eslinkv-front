<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-line-1" :id="id"/>
		<div class="pos-a h-line-1-title">{{config.config&&config.config.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'
	import {getInput, getSelect} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '文字'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			title: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
				value: [['2015', 250], ['2016', 350], ['2017', 150], ['2018', 280], ['2019', 250], ['2020', 250]]
			})
		},
		config: {
			title: '数量'
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
			this.configSource = this.parseConfigSource(config, configSource)
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

