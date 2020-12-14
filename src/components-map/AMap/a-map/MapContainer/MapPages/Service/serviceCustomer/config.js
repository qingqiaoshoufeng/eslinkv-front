
// 引入详情字典
import { citizenNumber, publicBuildNumber, industryNumber, businessServe, citizenNumberDetial, publicBuildNumberDetial, industryNumberDetial, monthAccountDetial, monthInstallDetial, monthFireDetial, serviceCustomerPipeline, serviceCustomerCustomer, serviceCustomerAddress, serviceCustomerStatus, activity, community, households, } from "./dictionary"


// 覆盖物legend配置
export const SERVICE_SERVICECUSTOMER_LEGEND_MAP = {
    // Grouphall: {
    //     label: '集团大厅',
    //     legendIcon: 'icontulijituandating',
    //     iconSize:56,
    //     icon:'iconjituandating',
    //     component: 'Grouphall',
    //     isShow: true,
    // },
    BranchCompany: {
        label: '子公司',
        legendIcon: 'icontulifengongsi',
        iconSize: 56,
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        visible: true,
        dataProp: 'branchCompanyList',
        detailList: [citizenNumberDetial, publicBuildNumberDetial, industryNumberDetial, monthAccountDetial, monthInstallDetial, monthFireDetial]


    },
    ServiceNetworkStation: {
        label: '服务网点',
        legendIcon: 'icontulifuwuwangdian',
        iconSize: 38,
        icon: 'iconfuwuwangdian',
        component: 'ServiceNetworkStation',
        visible: false,
        dataProp: 'networkStationList',
        detailList: []
    },
    ThreeSocialLinkage: {
        label: '三社联动',
        legendIcon: 'icontulisansheliandong',
        showOverlayName: false,
        iconSize: 38,
        icon: 'iconsansheliandong',
        component: 'ThreeSocialLinkage',
        visible: true,
        dataProp: 'threeSocialLinkageList',
        detailList: []
    },
    // TaskList: {
    //     label: '任务工单',
    //     legendIcon: 'iconrenwugongdan',
    //     iconSize: 38,
    //     icon: 'iconrenwugongdan',
    //     component: 'TaskList',
    //     visible: false,
    //     dataProp: 'TaskList',
    //     detailList: [serviceCustomerPipeline, serviceCustomerCustomer, serviceCustomerAddress, serviceCustomerStatus]
    // },
    // CustomerHot: {
    //     label: '客户分布热力',
    //     visible: true,
    //     component: 'CustomerHot',
    //     visible: true,
    //     dataProp: 'CustomerHotList',
    //     detailList: []
    // }
    // ClickTaskList: {
    //     label: '任务工单',
    //     legendIcon: 'iconrenwugongdan',
    //     iconSize: 38,
    //     icon: 'iconrenwugongdan',
    //     component: 'ClickTaskList',
    //     isShow: true,
    //     dataProp: 'ClickTaskList',
    //     detailList: []
    // }
}
export const SERVICE_SERVICECUSTOMER_UN_LEGEND_MAP = {
    TaskList: {
        label: '任务工单',
        legendIcon: 'iconrenwugongdan',
        iconSize: 38,
        icon: 'iconrenwugongdan',
        component: 'TaskList',
        visible: false,
        dataProp: 'TaskList',
        detailList: [serviceCustomerPipeline, serviceCustomerCustomer, serviceCustomerAddress, serviceCustomerStatus]
    },
}
//覆盖物详情
export const SERVICE_SERVICECUSTOMER_OVERLAY_MAP = {
    // BranchCompany: {
    //     fields: {
    //         name: {},
    //     },
    // },
    ServiceNetworkStation: {
        fields: {
            name: {},
        },
    },
    ThreeSocialLinkage: {
        fields: {
            name: {},
        },
        isShowMore: true,
    },
    Grouphall: {
        fields: {
            name: {},
        },
    },
}
// 客户服务页面统计数据
export const DATASTATISTICSLIST = [citizenNumber, publicBuildNumber, industryNumber, businessServe, activity, community, households,]


// SwitchBox配置
export const SWICHBOX = [
    { label: '客户分布热力', value: true, type: 'customer' },
]