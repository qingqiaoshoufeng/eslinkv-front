// 首页覆盖物配置项
export const HOMEOVERLAYCONFIGMAP = {
	HighPressureLine: {
		label: '高压管网',
		legendIcon: 'icontuligaoyaguanwang',
		icon: 'icongaoyaguanwang',
		component: 'HighPressureLine',
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		legendIcon: 'icontulizhongyaguanwang-progress',
		icon: 'iconzhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
	},
	MiddlePressureLine: {
		label: '中压管网',
		legendIcon: 'icontulizhongyaguanwang',
		component: 'MiddlePressureLine',
	},
	LowPressureLine: {
		label: '低压管网',
		legendIcon: 'icontulidiyaguanwang',
		component: 'LowPressureLine',
	},
	InspectionPerson: {
		label: '巡检人员',
		legendIcon: 'icontulirenyuan',
		icon: 'iconrenyuan',
		component: 'InspectionPerson',
		showOverlayName: false,
	},
	InspectionCar: {
		label: '巡检车辆',
		legendIcon: 'icontulicheliang',
		icon: 'iconcheliang',
		component: 'InspectionCar',
		showOverlayName: false,
	},
	GasStation: {
		label: '门站',
		legendIcon: 'icontulimenzhan',
		icon: 'iconmenzhan',
		component: 'GasStation',
	},
	PressureRegulatingStation: {
		label: '调压站',
		legendIcon: 'icontulitiaoyazhan',
		icon: 'icontiaoyazhan',
		component: 'PressureRegulatingStation',
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		legendIcon: 'icontuliqiyuanzhan',
		icon: 'iconqiyuanzhan',
		component: 'EmergencyAirSourceStation',
	},
	ComprehensiveServiceStation: {
		label: '综合服务站',
		legendIcon: 'icontulizonghefuwuzhan',
		icon: 'iconzonghefuwuzhan',
		component: 'ComprehensiveServiceStation',
	},
	PipeManageMentStation: {
		label: '管网运行管理站',
		legendIcon: 'icontuliguanwangyunhangguanlizhan',
		icon: 'iconguanwangyunhangguanlizhan',
		component: 'PipeManageMentStation',
	},
	UndergroundRepairStation: {
		label: '地下抢修点',
		legendIcon: 'icontulidixiaqiangxiudian',
		icon: 'icondixiaqiangxiudian',
		component: 'UndergroundRepairStation',
	},
	LNGStation: {
		label: 'LNG站',
		legendIcon: 'icontulilNG',
		icon: 'iconlng',
		component: 'LNGStation',
	},
	LiquefiedGasStation: {
		label: '液化气站',
		legendIcon: 'icontuliyehuaqi',
		icon: 'iconyehuaqi',
		component: 'LiquefiedGasStation',
	},
	NaturalGasStation: {
		label: '加气站',
		icon: 'iconjiaqizhan',
		legendIcon: 'icontulijiaqizhan',
		component: 'NaturalGasStation',
	},
	DistributedEnergyResource: {
		label: '分布式能源',
		legendIcon: 'icontulinengyuanzhan',
		icon: 'iconnengyuanzhan',
		component: 'DistributedEnergyResource',
	},
}
// 首页--高压
export const AIRSUPPLYLEGEND_STATION = {
	HighPressureLine: true,
	HighPressureLine_Process: true,
	PressureRegulatingStation: true,
	EmergencyAirSourceStation: true,
	GasStation: true,
	MiddlePressureLine: false,
	LowPressureLine: false,
	InspectionPerson: false,
	InspectionCar: false,
	ComprehensiveServiceStation: false,
	PipeManageMentStation: false,
	UndergroundRepairStation: false,
	LNGStation: false,
	LiquefiedGasStation: false,
	NaturalGasStation: false,
	DistributedEnergyResource: false,
}
// 首页--中低压
export const AIRSUPPLYLEGEND_PIPE = {
	MiddlePressureLine: true,
	LowPressureLine: true,
	PressureRegulatingStation: false,
	InspectionPerson: false,
	InspectionCar: false,
	HighPressureLine_Process: false,
	HighPressureLine: false,
	ComprehensiveServiceStation: false,
	PipeManageMentStation: false,
	UndergroundRepairStation: false,
	GasStation: false,
	EmergencyAirSourceStation: false,
	LNGStation: false,
	LiquefiedGasStation: false,
	NaturalGasStation: false,
	DistributedEnergyResource: false,
}

// 首页--其他
export const AIRSUPPLYLEGEND_UCAN = {
	LiquefiedGasStation: true,
	NaturalGasStation: true,
	DistributedEnergyResource: true,
	HighPressureLine: false,
	HighPressureLine_Process: false,
	MiddlePressureLine: false,
	LowPressureLine: false,
	InspectionPerson: false,
	InspectionCar: false,
	LNGStation: false,
	GasStation: false,
	PressureRegulatingStation: false,
	EmergencyAirSourceStation: false,
	ComprehensiveServiceStation: false,
	PipeManageMentStation: false,
	UndergroundRepairStation: false,
}
// 首页--LNG
export const AIRSUPPLYLEGEND_LNG = {
	LNGStation: true,
	HighPressureLine: false,
	HighPressureLine_Process: false,
	MiddlePressureLine: false,
	LowPressureLine: false,
	InspectionPerson: false,
	InspectionCar: false,
	GasStation: false,
	PressureRegulatingStation: false,
	EmergencyAirSourceStation: false,
	ComprehensiveServiceStation: false,
	PipeManageMentStation: false,
	UndergroundRepairStation: false,
	LiquefiedGasStation: false,
	NaturalGasStation: false,
	DistributedEnergyResource: false,
}

export const OVERLAYINFOMAP = {
	GASSTATION: {
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
	SURGESTATION: {
		fields: {
			name: {},
		},
	},
	INSPECTIONCAR: {
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
        isShowMore:true
	},
}

//覆盖物详情
export const OVERLAYINFOMAP_HOME = {
	InspectionPerson: {
		fields: {
			employeename: {},
		},
	},
	InspectionCar: {
		fields: {
			name: {},
		},
	},
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
	ComprehensiveServiceStation: {
		fields: {
			name: {},
		},
	},
	PipeManageMentStation: {
		fields: {
			name: {},
		},
	},
	UndergroundRepairStation: {
		fields: {
			name: {},
		},
	},
	LNGStation: {
		fields: {
			name: {},
		},
	},
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
        isShowMore:true
	},
}
