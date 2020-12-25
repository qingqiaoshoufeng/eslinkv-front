// 引入详情字典
import { operationYesterday, OperationWeek, CouplingNumber, couplingIncreaseToday, couplingIncreaseWeek, couplingIncreaseMonth, operationLastWeek, operationMonth, operationLastMonth, operationYear, } from "./dictionary"
// 覆盖物legend配置
export const SERVICE_SERVICEHANGRANCODE_LEGEND_MAP = {
    BranchCompany: {
        label: '子公司',
        legendIcon: 'icontulifengongsi',
        iconSize: 56,
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        visible: true,
        dataProp: 'branchCompanyList',
        detailList: [CouplingNumber, operationYesterday, OperationWeek, operationLastWeek, operationMonth, operationLastMonth, operationYear,
        ]
    },

    CouplingHot: {
        label: '联码数量热力',
        legendIcon: 'icontulixiaoqireli',

        component: 'CouplingHot',
        visible: true,

        dataProp: 'total'

    },
    OperationHot: {
        label: '操作数量热力',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi',
        component: 'OperationHot',
        visible: false,
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
    { label: '累计联码热力', value: true, type: 'coupling' },
    { label: '月扫码热力', value: false, type: 'operation' }
]