
// 引入详情字典
import { ICcustomer, useNumberYestoday, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, ICcustomerStatus, useNumberToday, useNumberYear, useNumberMonth, useNumberYesterday, useNumberLastMonth, } from "./dictionary"
// 覆盖物legend配置
export const SERVICE_SERVICEICCUSTOMER_LEGEND_MAP = {
    MajorClient: {
        label: '非居民',
        legendIcon: 'icontuliyongqidahu',
        iconSize: 38,
        icon: 'iconyongqidahu',
        component: 'MajorClient',
        visible: true,
        dataProp: 'iCcustomerList',
        detailList: [useNumberYesterday, useNumberMonth, useNumberLastMonth, useNumberYear,]
    },

    useHotYear: {
        label: '年度热力',
        component: 'useHotYear',
        visible: false,
        dataProp: 'year',
        legendIcon: '',
    },
    BranchCompany: {
        label: '子公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        visible: true,
        dataProp: 'branchCompanyList',
        detailList: [ICcustomer, useNumberYesterday, useNumberMonth, useNumberLastMonth, useNumberYear,]
    },
    WarningICcustomer: {
        label: '报警',
        legendIcon: 'iconyongqidahu2',
        iconSize: 38,
        icon: 'iconyongqidahu2',
        component: 'WarningICcustomer',
        visible: true,
        dataProp: 'WarningICcustomerList',
        detailList: [useNumberYesterday, useNumberMonth, useNumberLastMonth, useNumberYear,]
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
export const DATASTATISTICSLIST = [ICcustomer, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal]
// SwitchBox配置
export const SWICHBOX = [
    { label: '年度工商户用气热力', value: false, type: 'useHotYear' },
]
