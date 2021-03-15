
// 引入详情字典
import { commonUseNumber, registerNumber } from '../../../../utils/dictionary'

// 首页覆盖物配置项
export const AIRSUPPLY_UCAN_LEGEND_MAP = {
	LiquefiedGasStation: {
		label: '液化气站',
		legendIcon: 'icontuliyehuaqi',
		iconSize: 38,
		component: 'LiquefiedGasStation',
		visible: true,
		dataProp: 'liquefiedGasStationList'

	},
	NaturalGasStation: {
		label: '加气站',
		iconSize: 38,
		legendIcon: 'icontulijiaqizhan',
		component: 'NaturalGasStation',
		visible: true,
		dataProp: 'naturalGasStationList'
	},
	DistributedEnergyResource: {
		label: '分布式能源',
		legendIcon: 'icontulinengyuanzhan',
		iconSize: 38,
		component: 'DistributedEnergyResource',
		visible: true,
		dataProp: 'distributedEnergyResourceList'
	},
	// LNGStation: {
	//     label: 'LNG站',
	//     legendIcon: 'icontulilNG',
	//     iconSize: 38,
	//     component: 'LNGStation',
	//     visible: false,
	// },
	// HighPressureLine: {
	//     label: '高压管网',
	//     legendIcon: 'icontuligaoyaguanwang',
	//     iconSize: 38,
	//     component: 'HighPressureLine',
	//     visible: false,
	// },
	// HighPressureLine_Process: {
	//     label: '高压管网(建设中)',
	//     legendIcon: 'icontulizhongyaguanwang-progress',
	//     iconSize: 38,
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
	//     iconSize: 38,
	//     component: 'InspectionPerson',
	//     showOverlayName: false,
	//     visible: false,
	// },
	// InspectionCar: {
	//     label: '巡检车辆',
	//     legendIcon: 'iconcheliang1',
	//     icon: 'iconcheliang1',
	//     iconSize: 38,
	//     component: 'InspectionCar',
	//     showOverlayName: false,
	//     visible: false,
	// },
	// GasStation: {
	//     label: '门站',
	//     legendIcon: 'icontulimenzhan',
	//     iconSize: 38,
	//     component: 'GasStation',
	//     visible: false,
	// },
	// PressureRegulatingStation: {
	//     label: '调压站',
	//     legendIcon: 'icontulitiaoyazhan',
	//     iconSize: 38,
	//     component: 'PressureRegulatingStation',
	//     visible: false,
	// },
	// EmergencyAirSourceStation: {
	//     label: '应急气源站',
	//     legendIcon: 'icontuliqiyuanzhan',
	//     iconSize: 38,
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
	ServiceStation: {
		label: '综合服务站',
		legendIcon: 'icontulizonghefuwuzhan1',
		iconSize: 38,
		component: 'ServiceStation',
		visible: false,
		dataProp: 'comprehensiveServiceStationList'
		// detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
	}
	// PipeManageMentStation: {
	//     label: '管网运行管理站',
	//     legendIcon: 'icontuliqiyuanzhan',
	//     iconSize: 38,
	//     icon: 'iconqiyuanzhan',
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
	// UndergroundRepairStation: {
	//     label: '地下抢修点',
	//     legendIcon: 'tulidixiaqiangxiudian',
	//     iconSize: 38,
	//     icon: 'tulidixiaqiangxiudian',
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
	// OngroundRepairStation: {
	//     label: '地上抢修点',
	//     legendIcon: 'icontulidishangqiangxiudian',
	//     iconSize: 38,
	//     icon: 'icontulidishangqiangxiudian',
	//     component: 'EmergencyAirSourceStation',
	//     visible: false,
	// },
}

// 覆盖物详情
export const AIRSUPPLY_UCAN_OVERLAY_MAP = {
	EmergencyAirSourceStation: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45'
				},
				errColor: '#FFDC45'
			}
		}
	},
	ServiceStation: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45'
				},
				errColor: '#FFDC45'
			}
		}
	},
	LiquefiedGasStation: {
		fields: {
			name: {}
		}
	},
	NaturalGasStation: {
		fields: {
			name: {}
		}
	},
	DistributedEnergyResource: {
		fields: {
			name: {}
		}
	},
	WARN: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45'
				},
				errColor: '#FFDC45'
			}
			// address: {
			//     style: {
			//         fontSize: '18px',
			//         color: '#00DDFF',
			//     },
			//     errColor: '#FF7217',
			// },
		},
		visibleMore: false
	}
}
// 中低压统计数据
export const DATASTATISTICSLIST = [commonUseNumber, registerNumber]
