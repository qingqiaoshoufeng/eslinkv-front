// 引入详情字典
import {
	LowPressureMediumline,
	LowPressureLowline,
	LowPressureGreenServeStation,
	LowPressureManageStation,
	LowPressureOnNumber,
	LowPressureUnderNumber,
} from '../../../../utils/dictionary'

// 首页覆盖物配置项
export const AIRSUPPLY_LOWPRESSURE_LEGEND_MAP = {
	MiddlePressureLine: {
		label: '中压管网',
		legendIcon: 'icontulizhongyaguanwang',
		visible: true,
		tileQuery: [11, 12],
	},
	LowPressureLine: {
		label: '低压管网',
		legendIcon: 'icontulidiyaguanwang',
		visible: true,
		tileQuery: [10],
	},
	PressureRegulatingStation: {
		label: '调压站',
		legendIcon: 'icontulitiaoyazhan',
		iconSize: 38,
		tileQuery: [34],
		visible: false,
	},
	UndergroundRepairStation: {
	    label: '地下抢修点',
	    legendIcon: 'icontulidixiaqiangxiudian',
	    iconSize: 38,
	    component: 'EmergencyAirSourceStation',
	    visible: true,
	    dataProp: "undergroundRepairStationList"
	},
	OngroundRepairStation: {
	    label: '地上抢修点',
	    legendIcon: 'icontulidishangqiangxiudian',
	    iconSize: 38,
	    component: 'EmergencyAirSourceStation',
	    visible: true,
	    dataProp: "OngroundRepairStationList"
    },
    	ServiceStation: {
	    label: '综合服务站',
	    legendIcon: 'icontulizonghefuwuzhan1',
	    iconSize: 38,
	    component: 'ServiceStation',
	    visible: true,
	    dataProp: 'serviceStationList',
	    // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
	},
	PipeManageMentStation: {
	    label: '管网运行管理站',
	    legendIcon: 'icontuliguanwangyunhangguanlizhan',
	    iconSize: 38,
	    component: 'EmergencyAirSourceStation',
	    visible: true,
	    dataProp: "pipeManageMentStationList"
	},
    InspectionPerson: {
		label: '巡检人员',
		legendIcon: 'iconrenyuan1',
		iconSize: 38,
		icon: 'iconrenyuan1',
		component: 'InspectionPerson',
		showOverlayName: false,
		visible: false,
		dataProp: 'inspectionPersonList',
	},
	InspectionCar: {
		label: '巡检车辆',
		legendIcon: 'iconcheliang1',
		iconSize: 38,
		icon: 'iconcheliang1',
		component: 'InspectionCar',
		showOverlayName: false,
		visible: false,
		dataProp: 'inspectionCarList',
	},
	// GasStation: {
	//     label: '门站',
	//     legendIcon: 'icontulimenzhan',
	// 	iconSize: 52,
	//     component: 'GasStation',
	//     visible: false,
	// },
	// EmergencyAirSourceStation: {
	//     label: '应急气源站',
	//     legendIcon: 'icontuliqiyuanzhan',
	// 	iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
	// },
	// GasStation: {
	//     label: '门站',
	//     legendIcon: 'icontulimenzhan',
	// 	iconSize: 52,
	//     component: 'GasStation',
	//     visible: false,
	// },
	// EmergencyAirSourceStation: {
	//     label: '应急气源站',
	//     legendIcon: 'icontuliqiyuanzhan',
	// 	iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },

	// HighPressureLine_Process: {
	//     label: '高压管网(建设中)',
	//     legendIcon: 'icontulizhongyaguanwang-progress',
	// 	iconSize: 38,
	//     component: 'HighPressureLine_Process',
	//     visible: false,
	// },
	// LNGStation: {
	//     label: 'LNG站',
	//     legendIcon: 'icontulilNG',
	// 	iconSize: 38,
	//     component: 'LNGStation',
	//     visible: false,
	// },
	// LiquefiedGasStation: {
	//     label: '液化气站',
	//     legendIcon: 'icontuliyehuaqi',
	// 	iconSize: 38,
	//     component: 'LiquefiedGasStation',
	//     visible: false,
	// },
	// NaturalGasStation: {
	//     label: '加气站',
	// 	iconSize: 38,
	//     legendIcon: 'icontulijiaqizhan',
	//     component: 'NaturalGasStation',
	//     visible: false,
	// },
	// DistributedEnergyResource: {
	//     label: '分布式能源',
	//     legendIcon: 'icontulinengyuanzhan',
	// 	iconSize: 38,
	//     component: 'DistributedEnergyResource',
	//     visible: false,
	// },
	// WarningList: {
	// 	label: '告警',
	// 	legendIcon: 'icontulinengyuanzhan',
	// 	iconSize: 38,
	// 	component: 'WarningList',
	// 	visible: true,
	// },
}

//覆盖物详情
export const AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP = {
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
	ServiceStation: {
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
	// LiquefiedGasStation: {
	//     fields: {
	//         name: {},
	//     },
	// },
	// NaturalGasStation: {
	//     fields: {
	//         name: {},
	//     },
	// },
	// DistributedEnergyResource: {
	//     fields: {
	//         name: {},
	//     },
	// },
	WARN: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
			// address: {
			//     style: {
			//         fontSize: '18px',
			//         color: '#00DDFF',
			//     },
			//     errColor: '#FF7217',
			// },
		},
		visibleMore: true,
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
		visibleMore: true,
	},
	WarningList: {
		fields: {
			repairContent: {
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
		visibleMore: true,
	},
	InspectionPerson: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
		visibleMore: false,
	},
	InspectionCar: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
		visibleMore: false,
	},
}
// 中低压统计数据
export const DATASTATISTICSLIST = [
	LowPressureMediumline,
	LowPressureLowline,
	LowPressureGreenServeStation,
	LowPressureManageStation,
	LowPressureOnNumber,
	LowPressureUnderNumber,
]
