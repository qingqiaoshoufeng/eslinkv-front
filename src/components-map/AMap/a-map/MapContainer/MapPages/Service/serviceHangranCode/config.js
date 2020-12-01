// 引入详情字典
import { OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber, couplingIncreaseToday, couplingIncreaseWeek, couplingIncreaseMonth } from "../../../../utils/dictionary"
// 覆盖物legend配置
export const SERVICE_SERVICEHANGRANCODE_LEGEND_MAP = {
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        iconSize:56,
        icon:'iconjituandating',
        component: 'Grouphall',
        isShow: true,
        dataProp: 'grouphallList',
        detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        iconSize:56,
        icon:'iconfengongsi1',
        component: 'BranchCompany',
        isShow: true,
        dataProp: 'branchCompanyList',
        detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    ServiceStation: {
        label: '综合服务站',
        legendIcon: 'icontulizonghefuwuzhan1',
        iconSize:38,
        icon:'iconzonghefuwuzhan1',
        component: 'ServiceStation',
        isShow: true,
        dataProp: 'comprehensiveServiceStationList',
        detailList: [OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber]
    },
    CouplingHot: {
        label: '联码数量热力',
        legendIcon: 'icontulixiaoqireli',
        // icon: 'iconjituandating',
        component: 'CouplingHot',
        isShow: true,
        dataProp: 'total'
    },
    OperationHot: {
        label: '操作数量热力',
        legendIcon: 'icontulifengongsi',
        // icon: 'iconfengongsi',
        component: 'OperationHot',
        isShow: false,
        dataProp: 'month'
    },
}

//覆盖物详情
export const SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP = {
    OperationHot: {
        fields: {
            name: {},
        },
    },

    CouplingHot: {
        fields: {
            name: {},
        },
    },
}
// 杭燃码统计数据
export const DATASTATISTICSLIST = [couplingIncreaseToday, couplingIncreaseWeek, couplingIncreaseMonth]

// SwitchBox配置 
export const SWICHBOX = [
    { label: '累计联码数量热力', value: true, type: 'coupling' },
    { label: '月操作数量热力', value: false, type: 'operation' }
]