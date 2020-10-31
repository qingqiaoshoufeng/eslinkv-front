export default {
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
	series: [{}]
}
