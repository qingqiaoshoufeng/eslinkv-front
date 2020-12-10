/**
 * 该文件用于页面所需配置项，1.统计数据 2.地图覆盖物legend  3.覆盖物显示hover显示的详情
 */
import {
	HighPressureGasStation,
	emergencyAirSourceStation,
	HighPressureHighPressureGasStation,
	HighPressureLineLength,
	HighPressureCarNumber,
	HighPressureInspectionNumber,
	HighPressurePreservationNumber,
} from '../../../../utils/dictionary'

// 高压统计数据配置
export const DATA_STATISTICS_MAP = {
	HighPressureGasStation,
	emergencyAirSourceStation,
	HighPressureHighPressureGasStation,
	HighPressureLineLength,
	HighPressureCarNumber,
	HighPressureInspectionNumber,
	HighPressurePreservationNumber,
}

// 覆盖物legend配置
export const AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP = {
	HighPressureLine: {
		label: '高压管网',
		legendIcon: 'icontuligaoyaguanwang',
		component: 'HighPressureLine',
		visible: true,
		dataProp: 'highPressureLine',
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		legendIcon: 'icontulizhongyaguanwang-progress',
		icon: 'icontulizhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
		visible: true,
		dataProp: 'highPressureLine_Process',
	},
	GasStation: {
		label: '门站',
		legendIcon: 'icontulimenzhan',
		iconSize: 52,
		component: 'GasStation',
		visible: true,
		dataProp: 'gasStationList',
	},
	PressureRegulatingStation: {
		label: '调压站',
		legendIcon: 'icontulitiaoyazhan',
		iconSize: 38,
		component: 'PressureRegulatingStation',
		visible: true,
		dataProp: 'pressureRegulatingStationList',
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		legendIcon: 'icontuliqiyuanzhan',
		iconSize: 38,
		component: 'EmergencyAirSourceStation',
		visible: true,
		dataProp: 'emergencyAirSourceStationList',
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
	// ServiceStation: {
	//     label: '综合服务站',
	//     legendIcon: 'icontulizonghefuwuzhan1',
	//     iconSize: 38,
	//     component: 'ServiceStation',
	//     visible: true,
	//     dataProp: 'comprehensiveServiceStationList',
	//  detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
	// },
	// PipeManageMentStation: {
	//     label: '管网运行管理站',
	//     legendIcon: 'icontuliqiyuanzhan',
	//     iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	//     dataProp: "pipeManageMentStationList"
	// },
	// UndergroundRepairStation: {
	//     label: '地下抢修点',
	//     legendIcon: 'tulidixiaqiangxiudian',
	//     iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	//     dataProp: "undergroundRepairStationList"
	// },
	// LNGStation: {
	//     label: 'LNG站',
	//     legendIcon: 'icontulilNG',
	//     iconSize: 38,
	//     component: 'LNGStation',
	//     visible: false,
	//     dataProp: "lngstationlist"
	// },
	// LiquefiedGasStation: {
	//     label: '液化气站',
	//     legendIcon: 'icontuliyehuaqi',
	//     iconSize: 38,
	//     component: 'LiquefiedGasStation',
	//     visible: false,
	//     dataProp: "liquefiedGasStationList"
	// },
	// NaturalGasStation: {
	//     label: '加气站',
	//     iconSize: 38,
	//     legendIcon: 'icontulijiaqizhan',
	//     component: 'NaturalGasStation',
	//     visible: false,
	//     dataProp: "naturalGasStationList"
	// },
	// DistributedEnergyResource: {
	//     label: '分布式能源',
	//     legendIcon: 'icontulinengyuanzhan',
	//     iconSize: 38,
	//     component: 'DistributedEnergyResource',
	//     visible: false,
	//     dataProp: ""
	// }
}
// hover覆盖物详情
export const AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP = {
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
	WARNEVENT: {
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
	WarningList: {
		fields: {
			description: {
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
	},
}
