// 引入详情字典
import { HighPressureGasStation, HighPressurePressureRegulatingStation, HighPressureHighPressureGasStation, HighPressureLineLength, HighPressureCarNumber, HighPressureInspectionNumber, HighPressurePreservationNumber } from "../../../../utils/dictionary"
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
    MiddlePressureLine: {
        label: '中压管网',
        legendIcon: 'icontulizhongyaguanwang',
        component: 'MiddlePressureLine',
        isShow: true
    },
    LowPressureLine: {
        label: '低压管网',
        legendIcon: 'icontulidiyaguanwang',
        component: 'LowPressureLine',
        isShow: true
    },
    InspectionPerson: {
        label: '巡检人员',
        legendIcon: 'icontulirenyuan',
        icon: 'iconrenyuan',
        component: 'InspectionPerson',
        showOverlayName: false,
        isShow: false,
    },
    InspectionCar: {
        label: '巡检车辆',
        legendIcon: 'icontulicheliang',
        icon: 'iconcheliang',
        component: 'InspectionCar',
        showOverlayName: false,
        isShow: false,
    },
    GasStation: {
        label: '门站',
        legendIcon: 'icontulimenzhan',
        icon: 'iconmenzhan',
        component: 'GasStation',
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
    ServiceStation: {
        label: '综合服务站',
        legendIcon: 'icontulizonghefuwuzhan1',
        icon: 'iconzonghefuwuzhan1',
        component: 'ServiceStation',
        isShow: true,
        dataProp: 'comprehensiveServiceStationList',
        // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    PipeManageMentStation: {
        label: '管网运行管理站',
        legendIcon: 'icontuliqiyuanzhan',
        icon: 'iconqiyuanzhan',
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },
    UndergroundRepairStation: {
        label: '地下抢修点',
        legendIcon: 'tulidixiaqiangxiudian',
        icon: 'tulidixiaqiangxiudian',
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },
    LNGStation: {
        label: 'LNG站',
        legendIcon: 'icontulilNG',
        icon: 'iconlng',
        component: 'LNGStation',
        isShow: false,
    },
    LiquefiedGasStation: {
        label: '液化气站',
        legendIcon: 'icontuliyehuaqi',
        icon: 'iconyehuaqi',
        component: 'LiquefiedGasStation',
        isShow: false,
    },
    NaturalGasStation: {
        label: '加气站',
        icon: 'iconjiaqizhan',
        legendIcon: 'icontulijiaqizhan',
        component: 'NaturalGasStation',
        isShow: false,
    },
    DistributedEnergyResource: {
        label: '分布式能源',
        legendIcon: 'icontulinengyuanzhan',
        icon: 'iconnengyuanzhan',
        component: 'DistributedEnergyResource',
        isShow: false,
    },
    WarningList: {
        label: '告警',
        legendIcon: 'icontulinengyuanzhan',
        icon: 'iconnengyuanzhan',
        component: 'WarningList',
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
    WarningList: {
        fields: {
            address: {
                style: {
                    fontSize: '18px',
                    color: '#00DDFF',
                },
                errColor: '#FF7217',
            },
        },

    }
}


// 高压统计数据
export const DATASTATISTICSLIST = [HighPressureGasStation, HighPressurePressureRegulatingStation, HighPressureHighPressureGasStation, HighPressureLineLength, HighPressureCarNumber, HighPressureInspectionNumber, HighPressurePreservationNumber]