// 覆盖物legend配置
export const SERVICE_SERVICEMARKET_LEGEND_MAP = {
	BranchCompany: {
		label: '子公司',
		legendIcon: 'icontulifengongsi',
		iconSize: 38,
		icon: 'iconfengongsi1',
		component: 'BranchCompany',
		isShow: true,
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
			name: {},
		},
	},
	HeatMap: {
		fields: {
			name: {},
		},
	},
}
