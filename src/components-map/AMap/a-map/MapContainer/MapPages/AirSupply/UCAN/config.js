// 首页覆盖物配置项

export const AIRSUPPLY_UCAN_LEGEND_MAP = {
    LiquefiedGasStation: {
        label: '液化气站',
        legendIcon: 'icontuliyehuaqi',
		iconSize: 38,
		icon: 'iconyehuaqi',
        component: 'LiquefiedGasStation',
        isShow: true,
    },
    NaturalGasStation: {
        label: '加气站',
		iconSize: 38,
		icon: 'iconjiaqizhan',
        legendIcon: 'icontulijiaqizhan',
        component: 'NaturalGasStation',
        isShow: true,
    },
    DistributedEnergyResource: {
        label: '分布式能源',
        legendIcon: 'icontulinengyuanzhan',
		iconSize: 38,
		icon: 'iconnengyuanzhan',
        component: 'DistributedEnergyResource',
        isShow: true,
    },
    LNGStation: {
        label: 'LNG站',
        legendIcon: 'icontulilNG',
		iconSize: 38,
		icon: 'iconlng',
        component: 'LNGStation',
        isShow: false,
    },
    HighPressureLine: {
        label: '高压管网',
        legendIcon: 'icontuligaoyaguanwang',
		iconSize: 38,
		icon: 'icongaoyaguanwang',
        component: 'HighPressureLine',
        isShow: false,
    },
    HighPressureLine_Process: {
        label: '高压管网(建设中)',
        legendIcon: 'icontulizhongyaguanwang-progress',
		iconSize: 38,
		icon: 'iconzhongyaguanwang-progress',
        component: 'HighPressureLine_Process',
        isShow: false,
    },
    MiddlePressureLine: {
        label: '中压管网',
        legendIcon: 'icontulizhongyaguanwang',
        component: 'MiddlePressureLine',
        isShow: false
    },
    LowPressureLine: {
        label: '低压管网',
        legendIcon: 'icontulidiyaguanwang',
        component: 'LowPressureLine',
        isShow: false
    },
    InspectionPerson: {
        label: '巡检人员',
        legendIcon: 'icontulirenyuan',
		iconSize: 38,
		icon: 'iconrenyuan',
        component: 'InspectionPerson',
        showOverlayName: false,
        isShow: false,
    },
    InspectionCar: {
        label: '巡检车辆',
        legendIcon: 'icontulicheliang',
		iconSize: 38,
		icon: 'iconcheliang',
        component: 'InspectionCar',
        showOverlayName: false,
        isShow: false,
    },
    GasStation: {
        label: '门站',
        legendIcon: 'icontulimenzhan',
		iconSize: 38,
		icon: 'iconmenzhan',
        component: 'GasStation',
        isShow: false,
    },
    PressureRegulatingStation: {
        label: '调压站',
        legendIcon: 'icontulitiaoyazhan',
		iconSize: 38,
		icon: 'icontiaoyazhan',
        component: 'PressureRegulatingStation',
        isShow: false,
    },
    EmergencyAirSourceStation: {
        label: '应急气源站',
        legendIcon: 'icontuliqiyuanzhan',
		iconSize: 38,
		icon: 'iconqiyuanzhan',
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },
    ServiceStation: {
        label: '综合服务站',
        legendIcon: 'icontulizonghefuwuzhan1',
		iconSize: 38,
		icon: 'iconzonghefuwuzhan1',
        component: 'ServiceStation',
        isShow: false,
        dataProp: 'comprehensiveServiceStationList',
        // detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    PipeManageMentStation: {
        label: '管网运行管理站',
        legendIcon: 'icontuliqiyuanzhan',
		iconSize: 38,
		icon: 'iconqiyuanzhan',
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },
    UndergroundRepairStation: {
        label: '地下抢修点',
        legendIcon: 'tulidixiaqiangxiudian',
		iconSize: 38,
		icon: 'tulidixiaqiangxiudian',
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },
    OngroundRepairStation: {
        label: '地上抢修点',
        legendIcon: 'icontulidishangqiangxiudian',
		iconSize: 38,
		icon: 'icontulidishangqiangxiudian',
        component: 'EmergencyAirSourceStation',
        isShow: false,
    },
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
