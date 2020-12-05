
// 引入详情字典
import { commonUseNumber, registerNumber, } from "../../../../utils/dictionary"

// 首页覆盖物配置项
export const AIRSUPPLY_UCAN_LEGEND_MAP = {
    LiquefiedGasStation: {
        label: '液化气站',
        legendIcon: 'icontuliyehuaqi',
        iconSize: 38,
        component: 'LiquefiedGasStation',
        isShow: true,
        dataProp: "liquefiedGasStationList"

    },
    NaturalGasStation: {
        label: '加气站',
        iconSize: 38,
        legendIcon: 'icontulijiaqizhan',
        component: 'NaturalGasStation',
        isShow: true,
        dataProp: "naturalGasStationList"
    },
    DistributedEnergyResource: {
        label: '分布式能源',
        legendIcon: 'icontulinengyuanzhan',
        iconSize: 38,
        component: 'DistributedEnergyResource',
        isShow: true,
        dataProp: "distributedEnergyResourceList"
    },
    // LNGStation: {
    //     label: 'LNG站',
    //     legendIcon: 'icontulilNG',
    //     iconSize: 38,
    //     component: 'LNGStation',
    //     isShow: false,
    // },
    // HighPressureLine: {
    //     label: '高压管网',
    //     legendIcon: 'icontuligaoyaguanwang',
    //     iconSize: 38,
    //     component: 'HighPressureLine',
    //     isShow: false,
    // },
    // HighPressureLine_Process: {
    //     label: '高压管网(建设中)',
    //     legendIcon: 'icontulizhongyaguanwang-progress',
    //     iconSize: 38,
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
    //     iconSize: 38,
    //     component: 'InspectionPerson',
    //     showOverlayName: false,
    //     isShow: false,
    // },
    // InspectionCar: {
    //     label: '巡检车辆',
    //     legendIcon: 'icontulicheliang',
    //     icon: 'iconcheliang',
    //     iconSize: 38,
    //     component: 'InspectionCar',
    //     showOverlayName: false,
    //     isShow: false,
    // },
    // GasStation: {
    //     label: '门站',
    //     legendIcon: 'icontulimenzhan',
    //     iconSize: 38,
    //     component: 'GasStation',
    //     isShow: false,
    // },
    // PressureRegulatingStation: {
    //     label: '调压站',
    //     legendIcon: 'icontulitiaoyazhan',
    //     iconSize: 38,
    //     component: 'PressureRegulatingStation',
    //     isShow: false,
    // },
    // EmergencyAirSourceStation: {
    //     label: '应急气源站',
    //     legendIcon: 'icontuliqiyuanzhan',
    //     iconSize: 38,
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },
    ServiceStation: {
        label: '综合服务站',
        legendIcon: 'icontulizonghefuwuzhan1',
        iconSize: 38,
        component: 'ServiceStation',
        isShow: false,
        dataProp: 'comprehensiveServiceStationList',
        // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    // PipeManageMentStation: {
    //     label: '管网运行管理站',
    //     legendIcon: 'icontuliqiyuanzhan',
    //     iconSize: 38,
    //     icon: 'iconqiyuanzhan',
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },
    // UndergroundRepairStation: {
    //     label: '地下抢修点',
    //     legendIcon: 'tulidixiaqiangxiudian',
    //     iconSize: 38,
    //     icon: 'tulidixiaqiangxiudian',
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },
    // OngroundRepairStation: {
    //     label: '地上抢修点',
    //     legendIcon: 'icontulidishangqiangxiudian',
    //     iconSize: 38,
    //     icon: 'icontulidishangqiangxiudian',
    //     component: 'EmergencyAirSourceStation',
    //     isShow: false,
    // },
    WarningList: {
        label: '告警',
        legendIcon: 'icontulinengyuanzhan',
        iconSize: 38,
        icon: 'iconnengyuanzhan',
        component: 'WarningList',
        isShow: true,
    },

}

//覆盖物详情
export const AIRSUPPLY_UCAN_OVERLAY_MAP = {
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
                    color: '#fff',
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
export const DATASTATISTICSLIST = [commonUseNumber, registerNumber]