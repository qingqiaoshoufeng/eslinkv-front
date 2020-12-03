// 引入详情字典
import {
	HighPressureGasStation,
	emergencyAirSourceStation,
	HighPressureHighPressureGasStation,
	HighPressureLineLength,
	HighPressureCarNumber,
	HighPressureInspectionNumber,
	HighPressurePreservationNumber,
} from '../../../../utils/dictionary'
// 覆盖物legend配置

export const AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP = {
	HighPressureLine: {
		label: '高压管网',
		legendIcon: 'icontuligaoyaguanwang',
		component: 'HighPressureLine',
		isShow: true,
		dataProp: 'highPressureLine',
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		legendIcon: 'icontulizhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
		isShow: true,
		dataProp: 'highPressureLine_Process',
	},
	// MiddlePressureLine: {
	//     label: '中压管网',
	//     legendIcon: 'icontulizhongyaguanwang',
	//     component: 'MiddlePressureLine',
	//     isShow: true,
	//     dataProp: ""
	// },
	// LowPressureLine: {
	//     label: '低压管网',
	//     legendIcon: 'icontulidiyaguanwang',
	//     component: 'LowPressureLine',
	//     isShow: true,
	//     dataProp: ""
	// },
	GasStation: {
		label: '门站',
		legendIcon: 'icontulimenzhan',
		iconSize: 52,
		component: 'GasStation',
		isShow: true,
		dataProp: 'gasStationList',
	},
	PressureRegulatingStation: {
		label: '调压站',
		legendIcon: 'icontulitiaoyazhan',
		iconSize: 38,
		component: 'PressureRegulatingStation',
		isShow: true,
		dataProp: 'pressureRegulatingStationList',
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		legendIcon: 'icontuliqiyuanzhan',
		iconSize: 38,
		component: 'EmergencyAirSourceStation',
		isShow: true,
		dataProp: 'emergencyAirSourceStationList',
	},
	InspectionPerson: {
		label: '巡检人员',
		legendIcon: 'icontulirenyuan',
		iconSize: 38,
		icon: 'iconrenyuan',
		component: 'InspectionPerson',
		showOverlayName: false,
		isShow: false,
		dataProp: '',
	},
	InspectionCar: {
		label: '巡检车辆',
		legendIcon: 'icontulicheliang',
		iconSize: 38,
		icon: 'iconcheliang',
		component: 'InspectionCar',
		showOverlayName: false,
		isShow: false,
		dataProp: '',
	},
	// ServiceStation: {
	//     label: '综合服务站',
	//     legendIcon: 'icontulizonghefuwuzhan1',
	//     iconSize: 38,
	//     component: 'ServiceStation',
	//     isShow: true,
	//     dataProp: 'comprehensiveServiceStationList',
	//  detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
	// },
	// PipeManageMentStation: {
	//     label: '管网运行管理站',
	//     legendIcon: 'icontuliqiyuanzhan',
	//     iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     isShow: false,
	//     dataProp: "pipeManageMentStationList"
	// },
	// UndergroundRepairStation: {
	//     label: '地下抢修点',
	//     legendIcon: 'tulidixiaqiangxiudian',
	//     iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     isShow: false,
	//     dataProp: "undergroundRepairStationList"
	// },
	// LNGStation: {
	//     label: 'LNG站',
	//     legendIcon: 'icontulilNG',
	//     iconSize: 38,
	//     component: 'LNGStation',
	//     isShow: false,
	//     dataProp: "lngstationlist"
	// },
	// LiquefiedGasStation: {
	//     label: '液化气站',
	//     legendIcon: 'icontuliyehuaqi',
	//     iconSize: 38,
	//     component: 'LiquefiedGasStation',
	//     isShow: false,
	//     dataProp: "liquefiedGasStationList"
	// },
	// NaturalGasStation: {
	//     label: '加气站',
	//     iconSize: 38,
	//     legendIcon: 'icontulijiaqizhan',
	//     component: 'NaturalGasStation',
	//     isShow: false,
	//     dataProp: "naturalGasStationList"
	// },
	// DistributedEnergyResource: {
	//     label: '分布式能源',
	//     legendIcon: 'icontulinengyuanzhan',
	//     iconSize: 38,
	//     component: 'DistributedEnergyResource',
	//     isShow: false,
	//     dataProp: ""
	// },
	// WarningList: {
	// 	label: '告警',
	// 	legendIcon: 'icontulinengyuanzhan',
	// 	iconSize: 38,
	// 	component: 'WarningList',
	// 	isShow: true,
	// 	dataProp: 'WarningList',
	// },
}

//覆盖物详情
export const AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP = {
	// ServiceStation: {
	//     fields: {
	//         name: {
	//             style: {
	//                 fontSize: '32px',
	//                 color: '#FFDC45',
	//             },
	//             errColor: '#FFDC45',
	//         },
	//     },
	// },
	GasStation: {
		fields: {
			name: {
				style: {
					fontSize: '24px',
				},
            },
		},
	},
	PressureRegulatingStation: {
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
	EmergencyAirSourceStation: {
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
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
			address: {
				style: {
					fontSize: '24px',
					color: '#00DDFF',
				},
				errColor: '#fff',
			},
		},
		isShowMore: true,
	},
	WarningList: {
		fields: {
			content: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
			address: {
				style: {
					fontSize: '24px',
					color: '#fff',
				},
				errColor: '#fff',
			},
		},
	},
}

// 高压统计数据
export const DATASTATISTICSLIST = [
	HighPressureGasStation,
	emergencyAirSourceStation,
	HighPressureHighPressureGasStation,
	HighPressureLineLength,
	HighPressureCarNumber,
	HighPressureInspectionNumber,
	HighPressurePreservationNumber,
]
