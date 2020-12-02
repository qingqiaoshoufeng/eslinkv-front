<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-curve-1" :id="id"/>
		<div class="pos-a h-curve-1-title">{{config.config&&config.config.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'
	import {getInput} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			title: true,
		},
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					x: 10,
					y: 4000
				},
				{
					x: 11,
					y: 6000
				},
				{
					x: 12,
					y: 5000
				},
				{
					x: '01',
					y: 6000
				},
				{
					x: '02',
					y: 7000
				},
				{
					x: '03',
					y: 6000
				},
				{
					x: '04',
					y: 4000
				}
			])
		},
		config: {
			title: '用户'
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				const value = data.map(item => {
					let i = []
					i.push(item.x)
					i.push(item.y)
					return i
				})
				console.log(value)
				options.series[0].data = value
				this.instance && this.instance.setOption(options)
			},
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = [...val]
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

