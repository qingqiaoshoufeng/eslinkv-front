// 引入详情字典
import { LowPressureMediumline, LowPressureLowline, LowPressureGreenServeStation, LowPressureManageStation, LowPressureOnNumber, LowPressureUnderNumber } from "../../../../utils/dictionary"

// 首页覆盖物配置项
export const AIRSUPPLY_LOWPRESSURE_LEGEND_MAP = {
    MiddlePressureLine: {
        label: '中压管网',
        legendIcon: 'icontulizhongyaguanwang',
        component: 'MiddlePressureLine',
        isShow: true,
        tileQuery:[11,12],
    },
    LowPressureLine: {
        label: '低压管网',
        legendIcon: 'icontulidiyaguanwang',
        component: 'LowPressureLine',
        isShow: true,
        tileQuery:[10]
    },
    InspectionPerson: {
        label: '巡检人员',
        legendIcon: 'icontulirenyuan',
		iconSize: 38,
		icon: 'iconrenyuan',
        component: 'InspectionPerson',
        showOverlayName: false,
        isShow: true,
    },
    InspectionCar: {
        label: '巡检车辆',
        legendIcon: 'icontulicheliang',
		iconSize: 38,
		icon: 'iconcheliang',
        component: 'InspectionCar',
        showOverlayName: false,
        isShow: true,
    },
    ServiceStation: {
        label: '综合服务站',
        legendIcon: 'icontulizonghefuwuzhan1',
		iconSize: 38,
        component: 'ServiceStation',
        isShow: true,
        dataProp: 'comprehensiveServiceStationList',
        // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    PipeManageMentStation: {
        label: '管网运行管理站',
        legendIcon: 'icontuliqiyuanzhan',
		iconSize: 38,
        component: 'EmergencyAirSourceStation',
        isShow: true,
    },
    UndergroundRepairStation: {
        label: '地下抢修点',
        legendIcon: 'icontulidixiaqiangxiudian',
		iconSize: 38,
        component: 'EmergencyAirSourceStation',
        isShow: true,
    },
    OngroundRepairStation: {
        label: '地上抢修点',
        legendIcon: 'icontulidishangqiangxiudian',
		iconSize: 38,
        component: 'EmergencyAirSourceStation',
        isShow: true,
    },
    GasStation: {
        label: '门站',
        legendIcon: 'icontulimenzhan',
		iconSize: 52,
        component: 'GasStation',
        isShow: false,
    },
    PressureRegulatingStation: {
        label: '调压站',
        legendIcon: 'icontulitiaoyazhan',
		iconSize: 38,
        component: 'PressureRegulatingStation',
        tileQuery:[34],
        isShow: false,
    },
    EmergencyAirSourceStation: {
        label: '应急气源站',
        legendIcon: 'icontuliqiyuanzhan',
		iconSize: 38,
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },


    HighPressureLine_Process: {
        label: '高压管网(建设中)',
        legendIcon: 'icontulizhongyaguanwang-progress',
		iconSize: 38,
        component: 'HighPressureLine_Process',
        isShow: false,
    },
    LNGStation: {
        label: 'LNG站',
        legendIcon: 'icontulilNG',
		iconSize: 38,
        component: 'LNGStation',
        isShow: false,
    },
    LiquefiedGasStation: {
        label: '液化气站',
        legendIcon: 'icontuliyehuaqi',
		iconSize: 38,
        component: 'LiquefiedGasStation',
        isShow: false,
    },
    NaturalGasStation: {
        label: '加气站',
		iconSize: 38,
        legendIcon: 'icontulijiaqizhan',
        component: 'NaturalGasStation',
        isShow: false,
    },
    DistributedEnergyResource: {
        label: '分布式能源',
        legendIcon: 'icontulinengyuanzhan',
		iconSize: 38,
        component: 'DistributedEnergyResource',
        isShow: false,
    },
    WarningList: {
        label: '告警',
        legendIcon: 'icontulinengyuanzhan',
		iconSize: 38,
        component: 'WarningList',
        isShow: true,
    },
}

//覆盖物详情
export const AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP = {
    EmergencyAirSourceStation: {
        fields: {
            name: {
                style: {
                    fontSize: '32px',
                    color: '#FFDC45'
                },
                errColor: '#FFDC45'
            },
        },
    },
    ServiceStation: {
        fields: {
            name: {
                style: {
                    fontSize: '32px',
                    color: '#FFDC45'
                },
                errColor: '#FFDC45'
            },
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
        isShowMore: true,
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
        isShowMore: true,
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
        isShowMore: true,
    }
}
// 中低压统计数据
export const DATASTATISTICSLIST = [LowPressureMediumline, LowPressureLowline, LowPressureGreenServeStation, LowPressureManageStation, LowPressureOnNumber, LowPressureUnderNumber]

