import { getSaleMapDetailInfo } from '@/components-map-api/map.serve.api'
// 覆盖物legend配置
export const SERVICE_SERVICEMARKET_LEGEND_MAP = {
	BranchCompany: {
		label: '子公司',
		legendIcon: 'icontulifengongsi',
		iconSize: 38,
		icon: 'iconfengongsi1',
		component: 'MapMarkerIcon',
		visible: true,
		dataProp: 'branchCompanyList',
		detailHandler: getSaleMapDetailInfo,
	},
	// HeatMap: {
	// 	label: '销气热力',
	// 	legendIcon: 'icontulixiaoqireli',
	// 	component: 'HeatMap',
	// 	isShow: true,
	// },
}

// 覆盖物详情
export const SERVICE_SERVICEMARKET_OVERLAY_MAP = {
	BranchCompany: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
	},
	HeatMap: {
		fields: {
			name: {},
		},
	},
}

export const DATASTATISTICSLIST = [
	{
		label: '2020计划销气(万m³)',
		DW: '',
		prop: 'yearPlanSale',
	},
	{
		label: '销气计划完成率',
		DW: '%',
		prop: 'planSaleCompletionRate',
	},
	{
		label: '2019同期销售(万m³)',
		DW: '',
		prop: 'samePeriodSale',
	},
	{
		label: '同期对比',
		DW: '%',
		prop: 'samePeriodRate',
	},
]
