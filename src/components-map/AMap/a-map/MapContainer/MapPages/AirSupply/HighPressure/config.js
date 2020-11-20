// 覆盖物legend配置
export const AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP = {
	HighPressureLine: {
		label: '高压管网',
		legendIcon: 'icontuligaoyaguanwang',
		icon: 'icongaoyaguanwang',
		component: 'HighPressureLine',
		isShow: true,
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		legendIcon: 'icontulizhongyaguanwang-progress',
		icon: 'iconzhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
		isShow: true,
	},
	PressureRegulatingStation: {
		label: '调压站',
		legendIcon: 'icontulitiaoyazhan',
		icon: 'icontiaoyazhan',
		component: 'PressureRegulatingStation',
		isShow: true,
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		legendIcon: 'icontuliqiyuanzhan',
		icon: 'iconqiyuanzhan',
		component: 'EmergencyAirSourceStation',
		isShow: true,
	},
	GasStation: {
		label: '门站',
		legendIcon: 'icontulimenzhan',
		icon: 'iconmenzhan',
		component: 'GasStation',
		isShow: true,
	},
}

//覆盖物详情
export const AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP = {
	GasStation: {
		fields: {
			name: {
				style: {
					fontSize: '24px',
				},
			},
			inlet: {
				style: {
					fontSize: '18px',
				},
			},
		},
	},
	PressureRegulatingStation: {
		fields: {
			name: {},
		},
	},
	EmergencyAirSourceStation: {
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
