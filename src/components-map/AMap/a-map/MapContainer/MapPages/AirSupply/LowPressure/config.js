// 引入详情字典
import {
	LowPressureMediumline,
	LowPressureLowline,
	LowPressureGreenServeStation,
	LowPressureManageStation,
	LowPressureOnNumber,
	LowPressureUnderNumber,
	LowPressurePassRate,
} from '../../../../utils/dictionary'
import { getStationDetailInfo } from '@/components-map-api/map.airSupply.api'

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
		legendIcon: 'icondiyatiaoyanzhan',
		iconSize: 38,
		tileQuery: [34],
		visible: false,
	},
	VoltageRegulator: {
		label: '调压器',
		legendIcon: 'icontiaoyaqi01',
		overlayWarmIcon: 'icontiaoyaqibaojing02',
		component: 'MapMarkerIcon',
		iconSize: 38,
		visible: false,
		showOverlayName: false,
		dataProp: 'voltageRegulatorList',
	},
	ServiceStation: {
		label: '综合服务站',
		legendIcon: 'icontulizonghefuwuzhan1',
		iconSize: 38,
		component: 'MapMarkerIcon',
		visible: true,
		dataProp: 'serviceStationList',
		detailHandler: getStationDetailInfo,
	},
	PipeManageMentStation: {
		label: '管网运行管理站',
		legendIcon: 'icontuliguanwangyunhangguanlizhan',
		iconSize: 38,
		component: 'MapMarkerIcon',
		visible: true,
		dataProp: 'pipeManageMentStationList',
		detailHandler: getStationDetailInfo,
	},
	WarningStations: {
		label: '中低压预警点',
		legendIcon: 'iconzhongdiyayujing',
		iconSize: 38,
		icon: 'iconzhongdiyayujing',
		component: 'WarningStations',
		showOverlayName: false,
		visible: true,
		dataProp: 'middleAndLowPressureValveList',
	},
	UndergroundRepairStation: {
		label: '地下抢修点',
		legendIcon: 'icontulidixiaqiangxiudian',
		iconSize: 38,
		component: 'UndergroundRepairStation',
		visible: true,
		dataProp: 'undergroundRepairStationList',
	},
	OngroundRepairStation: {
		label: '地上抢修点',
		legendIcon: 'icontulidishangqiangxiudian',
		iconSize: 38,
		component: 'OngroundRepairStation',
		visible: true,
		dataProp: 'ongroundRepairStationList',
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
	LaserCar: {
		label: '激光巡检车',
		legendIcon: 'iconjiguangxunjianche',
		iconSize: 38,
		component: 'laserCarRoute',
		visible: false,
		dataProp: 'laserCarList',
	},
	CommandCar: {
		label: '抢修指挥车',
		legendIcon: 'iconqiangxiuzhihuiche',
		iconSize: 38,
		component: 'laserCarRoute',
		visible: false,
		dataProp: 'commandCarList',
	},
}

// 覆盖物详情
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
	VoltageRegulator: {
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
	PipeManageMentStation: {
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
	OngroundRepairStation: {
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
	UndergroundRepairStation: {
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
			},
			carPlateNo: {
				style: {
					fontSize: '24px',
					color: '#fff',
				},
			},
		},
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
	LowPressurePassRate,
]
