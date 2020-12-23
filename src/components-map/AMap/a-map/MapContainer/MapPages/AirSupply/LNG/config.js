// 引入详情字典
import { LNGstationNumber } from "../../../../utils/dictionary"
// 覆盖物legend配置
export const AIRSUPPLY_LNG_LEGEND_MAP = {
	LNGStation: {
		label: 'LNG站',
		legendIcon: 'icontulilNG',
		component: 'LNGStation',
		visible: true,
		dataProp: "lNGStationList"
	},
	// HighPressureLine: {
	//     label: '高压管网',
	//     legendIcon: 'icontuligaoyaguanwang',
	//     component: 'HighPressureLine',
	//     visible: false,
	// },
	// HighPressureLine_Process: {
	//     label: '高压管网(建设中)',
	//     legendIcon: 'icontulizhongyaguanwang-progress',
	//     component: 'HighPressureLine_Process',
	//     visible: false,
	// },
	// MiddlePressureLine: {
	//     label: '中压管网',
	//     legendIcon: 'icontulizhongyaguanwang',
	//     component: 'MiddlePressureLine',
	//     visible: false
	// },
	// LowPressureLine: {
	//     label: '低压管网',
	//     legendIcon: 'icontulidiyaguanwang',
	//     component: 'LowPressureLine',
	//     visible: false
	// },
	// InspectionPerson: {
	//     label: '巡检人员',
	//     legendIcon: 'iconrenyuan1',
	//     icon: 'iconrenyuan1',
	//     component: 'InspectionPerson',
	//     showOverlayName: false,
	//     visible: false,
	// },
	// InspectionCar: {
	//     label: '巡检车辆',
	//     legendIcon: 'iconcheliang1',
	//     icon: 'iconcheliang1',
	//     component: 'InspectionCar',
	//     showOverlayName: false,
	//     visible: false,
	// },
	// GasStation: {
	//     label: '门站',
	//     legendIcon: 'icontulimenzhan',
	//     component: 'GasStation',
	//     visible: false,
	// },
	// PressureRegulatingStation: {
	//     label: '调压站',
	//     legendIcon: 'icontulitiaoyazhan',
	//     component: 'PressureRegulatingStation',
	//     visible: false,
	// },
	// EmergencyAirSourceStation: {
	//     label: '应急气源站',
	//     legendIcon: 'icontuliqiyuanzhan',
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
	// ServiceStation: {
	//     label: '综合服务站',
	//     legendIcon: 'icontulizonghefuwuzhan1',
	//     component: 'ServiceStation',
	//     visible: false,
	//     dataProp: 'comprehensiveServiceStationList',
	//     // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
	// },
	// PipeManageMentStation: {
	//     label: '管网运行管理站',
	//     legendIcon: 'icontuliqiyuanzhan',
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
	// UndergroundRepairStation: {
	//     label: '地下抢修点',
	//     legendIcon: 'tulidixiaqiangxiudian',
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },

	// LiquefiedGasStation: {
	//     label: '液化气站',
	//     legendIcon: 'icontuliyehuaqi',
	//     component: 'LiquefiedGasStation',
	//     visible: false,
	// },
	// NaturalGasStation: {
	//     label: '加气站',
	//     legendIcon: 'icontulijiaqizhan',
	//     component: 'NaturalGasStation',
	//     visible: false,
	// },
	// DistributedEnergyResource: {
	//     label: '分布式能源',
	//     legendIcon: 'icontulinengyuanzhan',
	//     component: 'DistributedEnergyResource',
	//     visible: false,
	// },
}

//覆盖物详情
export const AIRSUPPLY_LNG_OVERLAY_MAP = {

	// EmergencyAirSourceStation: {
	//     fields: {
	//         name: {
	//             style: {
	//                 fontSize: '32px',
	//                 color: '#FFDC45'
	//             },
	//             errColor: '#FFDC45'
	//         },
	//     },
	// },
	// ServiceStation: {
	//     fields: {
	//         name: {
	//             style: {
	//                 fontSize: '32px',
	//                 color: '#FFDC45'
	//             },
	//             errColor: '#FFDC45'
	//         },
	//     },
	// },
	LNGStation: {
		fields: {
			name: {},
		},
	},
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
		visibleMore: false,
	},
	WARNEVENT: {
		fields: {
			content: {
				style: {
					fontSize: '32px',
					color: '#FFDC45'
				},
				errColor: '#FFDC45'
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
			content: {
				style: {
					fontSize: '32px',
					color: '#FFDC45'
				},
				errColor: '#FFDC45'
			},
			address: {
				style: {
					fontSize: '24px',
					color: '#fff',
				},
				errColor: '#fff',
			},
		},

	}
}
// LNG统计数据
export const DATASTATISTICSLIST = [LNGstationNumber]
