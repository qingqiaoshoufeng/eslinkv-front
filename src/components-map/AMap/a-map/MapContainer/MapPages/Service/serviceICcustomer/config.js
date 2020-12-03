
// 引入详情字典
import { ICcustomer, useNumberYestoday, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, ICcustomerStatus } from "../../../../utils/dictionary"
// 覆盖物legend配置
export const SERVICE_SERVICEICCUSTOMER_LEGEND_MAP = {
    MajorClient: {
        label: '用气大户',
        legendIcon: 'icontuliyongqidahu',
        iconSize: 38,
        icon: 'iconyongqidahu',
        component: 'MajorClient',
        isShow: true,
        dataProp: 'majorClientList',
        detailList: [useNumberYestoday]
    },

    useHotYear: {
        label: '用气大户',
        component: 'useHotYear',
        isShow: true,
        dataProp: 'year',
    },
    BranchCompany: {
        label: '子公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        isShow: true,
        dataProp: 'branchCompanyList',
        detailList: [ICcustomer, useNumberYestoday, warningYestoday]
    },
    WarningICcustomer: {
        label: '报警',
        legendIcon: 'iconyongqidahu2',
        iconSize: 38,
        icon: 'iconyongqidahu2',
        component: 'WarningICcustomer',
        isShow: true,
        dataProp: 'WarningICcustomerList',
        detailList: [useNumberYestoday, ICcustomerStatus]
    }
}

//覆盖物详情
export const SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP = {
    // BranchCompany: {
    //     fields: {
    //         name: {},
    //     },
    // },
    BranchCompany: {
        fields: {
            name: {},
        },
    },

}

// 工商户统计数据
export const DATASTATISTICSLIST = [FTPNumber, warningYestodayTotal, warningYestodayMetersTotal]
// SwitchBox配置 
export const SWICHBOX = [
    { label: '年度销售气量热力', value: true, type: 'useHotYear' },
]