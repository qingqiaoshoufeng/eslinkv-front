// 首页覆盖物配置项
export const AIRSUPPLY_UCAN_LEGEND_MAP = {
	LiquefiedGasStation: {
		label: '液化气站',
		legendIcon: 'icontuliyehuaqi',
		icon: 'iconyehuaqi',
		component: 'LiquefiedGasStation',
		isShow: true,
	},
	NaturalGasStation: {
		label: '加气站',
		icon: 'iconjiaqizhan',
		legendIcon: 'icontulijiaqizhan',
		component: 'NaturalGasStation',
		isShow: true,
	},
	DistributedEnergyResource: {
		label: '分布式能源',
		legendIcon: 'icontulinengyuanzhan',
		icon: 'iconnengyuanzhan',
		component: 'DistributedEnergyResource',
		isShow: true,
	},
	InspectionPerson: {
		label: '巡检人员',
		legendIcon: 'icontulirenyuan',
		icon: 'iconrenyuan',
		component: 'InspectionPerson',
		showOverlayName: false,
		isShow: true,
	},
	InspectionCar: {
		label: '巡检车辆',
		legendIcon: 'icontulicheliang',
		icon: 'iconcheliang',
		component: 'InspectionCar',
		showOverlayName: false,
		isShow: true,
	},
}

//覆盖物详情
export const AIRSUPPLY_UCAN_OVERLAY_MAP = {
	LiquefiedGasStation: {
		fields: {
			name: {},
		},
	},
	NaturalGasStation: {
		fields: {
			name: {},
		},
	},
	DistributedEnergyResource: {
		fields: {
			name: {},
		},
	},
	WARN: {
		fields: {
			content: {
				style: {
					fontSize: '24px',
				},
			},
			address: {
				style: {
					fontSize: '18px',
					color: '#00DDFF',
				},
				errColor: '#FF7217',
			},
		},
		isShowMore: true,
	},
	WARNEVENT: {
		fields: {
			content: {
				style: {
					fontSize: '24px',
				},
			},
			address: {
				style: {
					fontSize: '18px',
					color: '#00DDFF',
				},
				errColor: '#FF7217',
			},
		},
		isShowMore: true,
	},
}
