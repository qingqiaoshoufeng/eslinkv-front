// 首页覆盖物配置项
export const AIRSUPPLY_LOWPRESSURE_LEGEND_MAP = {
	MiddlePressureLine: {
		label: '中压管网',
		legendIcon: 'icontulizhongyaguanwang',
        component: 'MiddlePressureLine',
        isShow:true
	},
	LowPressureLine: {
		label: '低压管网',
		legendIcon: 'icontulidiyaguanwang',
        component: 'LowPressureLine',
        isShow:true
	}
}

//覆盖物详情
export const AIRSUPPLY_PRESSURE_OVERLAY_MAP = {
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

