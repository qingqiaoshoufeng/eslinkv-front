// 引入详情字典
import { LNGstationNumber } from "../../../../utils/dictionary"
// 覆盖物legend配置
export const AIRSUPPLY_LNG_LEGEND_MAP = {
    LNGStation: {
        label: 'LNG站',
        legendIcon: 'icontulilNG',
        component: 'LNGStation',
        isShow: true,
        dataProp: "lNGStationList"
    },
    // HighPressureLine: {
    //     label: '高压管网',
    //     legendIcon: 'icontuligaoyaguanwang',
    //     component: 'HighPressureLine',
    //     isShow: false,
    // },
    // HighPressureLine_Process: {
    //     label: '高压管网(建设中)',
    //     legendIcon: 'icontulizhongyaguanwang-progress',
    //     component: 'HighPressureLine_Process',
    //     isShow: false,
    // },
    // MiddlePressureLine: {
    //     label: '中压管网',
    //     legendIcon: 'icontulizhongyaguanwang',
    //     component: 'MiddlePressureLine',
    //     isShow: false
    // },
    // LowPressureLine: {
    //     label: '低压管网',
    //     legendIcon: 'icontulidiyaguanwang',
    //     component: 'LowPressureLine',
    //     isShow: false
    // },
    // InspectionPerson: {
    //     label: '巡检人员',
    //     legendIcon: 'icontulirenyuan',
    //     icon: 'iconrenyuan',
    //     component: 'InspectionPerson',
    //     showOverlayName: false,
    //     isShow: false,
    // },
    // InspectionCar: {
    //     label: '巡检车辆',
    //     legendIcon: 'icontulicheliang',
    //     icon: 'iconcheliang',
    //     component: 'InspectionCar',
    //     showOverlayName: false,
    //     isShow: false,
    // },
    // GasStation: {
    //     label: '门站',
    //     legendIcon: 'icontulimenzhan',
    //     component: 'GasStation',
    //     isShow: false,
    // },
    // PressureRegulatingStation: {
    //     label: '调压站',
    //     legendIcon: 'icontulitiaoyazhan',
    //     component: 'PressureRegulatingStation',
    //     isShow: false,
    // },
    // EmergencyAirSourceStation: {
    //     label: '应急气源站',
    //     legendIcon: 'icontuliqiyuanzhan',
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },
    // ServiceStation: {
    //     label: '综合服务站',
    //     legendIcon: 'icontulizonghefuwuzhan1',
    //     component: 'ServiceStation',
    //     isShow: false,
    //     dataProp: 'comprehensiveServiceStationList',
    //     // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    // },
    // PipeManageMentStation: {
    //     label: '管网运行管理站',
    //     legendIcon: 'icontuliqiyuanzhan',
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },
    // UndergroundRepairStation: {
    //     label: '地下抢修点',
    //     legendIcon: 'tulidixiaqiangxiudian',
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },

    // LiquefiedGasStation: {
    //     label: '液化气站',
    //     legendIcon: 'icontuliyehuaqi',
    //     component: 'LiquefiedGasStation',
    //     isShow: false,
    // },
    // NaturalGasStation: {
    //     label: '加气站',
    //     legendIcon: 'icontulijiaqizhan',
    //     component: 'NaturalGasStation',
    //     isShow: false,
    // },
    // DistributedEnergyResource: {
    //     label: '分布式能源',
    //     legendIcon: 'icontulinengyuanzhan',
    //     component: 'DistributedEnergyResource',
    //     isShow: false,
    // },
    WarningList: {
        label: '告警',
        legendIcon: 'icontulinengyuanzhan',
        component: 'WarningList',
        isShow: true,
    },
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
        isShowMore: false,
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

    }
}
// LNG统计数据
export const DATASTATISTICSLIST = [LNGstationNumber]