<template>
	<div class="widget-part" :style="styles">
		<div :id="id" style="height: 400px"></div>
	</div>
</template>

<script>
	import mixins from '../../mixins'
	import Highcharts from 'highcharts/highstock'
	import Highcharts3D from 'highcharts/highcharts-3d'
	import options from './options'

	Highcharts3D(Highcharts)

	const localConfigValue = {
		api: {
			data: JSON.stringify({
				value: [
					['香蕉', 8],
					['猕猴桃', 3],
					['桃子', 1],
					['橘子', 6],
					['苹果', 8],
					['梨', 4],
					['柑橘', 4],
					['橙子', 1],
					['葡萄 (串)', 1]
				]
			})
		}
	}

	export default {
		data() {
			return {
				once: false
			}
		},
		mixins: [mixins],
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val}
						this.$nextTick(() => {
							this.setOption(data)
						})
					}
				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			setOption(data) {
				options.series[0].data = data.value
				Highcharts.chart(this.id, options)
			},
		},
		created() {
			this.configSource = this.parseConfigSource({api: true})
			this.configValue = this.parseConfigValue({api: true}, localConfigValue)
		}
	}
</script>
<style lang="scss">
	.table-header {
		background-color: #061B63;
		color: #00CBF4;

		li {
			padding: 4px 0;

			&:nth-child(1) {
				width: 100px;
			}

			&:nth-child(2) {
				width: 80px;
			}

			&:nth-child(3) {
				width: 100px;
			}

			&:nth-child(4) {
				width: 70px;
			}
		}
	}

	.table-list {
		background-color: #03053E;

		li {
			padding: 4px 0;
			color: #fff;

			&:nth-child(1) {
				width: 100px;
			}

			&:nth-child(2) {
				width: 80px;
			}

			&:nth-child(3) {
				width: 100px;
			}

			&:nth-child(4) {
				width: 70px;
			}
		}

		a {
			color: #00CBF4;
		}
	}
</style>

