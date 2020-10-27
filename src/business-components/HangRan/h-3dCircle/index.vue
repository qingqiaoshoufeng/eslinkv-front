<template>
	<div class="widget-part" :style="styles">
		<div :id="`widget-part-${time}`" style="height: 400px"></div>
	</div>
</template>

<script>
	import {styleParser, widgetMixin} from '../../../../lib'
	import Highcharts from 'highcharts/highstock'
	import Highcharts3D from 'highcharts/highcharts-3d'

	const localConfigValue = {
		api: {
			data: JSON.stringify({
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}
				},
				title: {
					text: '简数科技每周水果消耗量'
				},
				subtitle: {
					text: 'Highcharts 中的3D环形图'
				},
				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45
					}
				},
				series: [{
					name: '货物金额',
					data: [
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
				}]
			}, null, 2)
		}
	}

	Highcharts3D(Highcharts)

	export default {
		data() {
			return {
				time: new Date() * 1
			}
		},
		mixins: [widgetMixin],
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout, this.time)
			},
			mergedConfig() {
				if (!this.config.config) return false
				return {...this.config.config}
			}
		},
		methods:{
			init(){
				const time = this.time
				Highcharts.chart(`widget-part-${time}`, this.data)
			}
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

