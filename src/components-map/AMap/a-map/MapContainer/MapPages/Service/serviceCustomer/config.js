
// 引入详情字典
import { citizenNumber, publicBuildNumber, industryNumber, businessServe, citizenNumberDetial, publicBuildNumberDetial, industryNumberDetial, monthAccountDetial, monthInstallDetial, monthFireDetial, serviceCustomerPipeline, serviceCustomerCustomer, serviceCustomerAddress, serviceCustomerStatus, activity, community, households, } from "./dictionary"


// 覆盖物legend配置
export const SERVICE_SERVICECUSTOMER_LEGEND_MAP = {

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
    // ServiceNetworkStation: {
    //     label: '服务网点',
    //     legendIcon: 'icontulifuwuwangdian',
    //     iconSize: 38,
    //     icon: 'iconfuwuwangdian',
    //     component: 'ServiceNetworkStation',
    //     visible: false,
    //     dataProp: 'networkStationList',
    //     detailList: []
    // },
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

    ThreeSocialLinkage: {
        fields: {
            name: {},
        },
        isShowMore: true,
    },
}
// 客户服务页面统计数据
export const DATASTATISTICSLIST = [citizenNumber, publicBuildNumber, industryNumber, businessServe, activity, community, households,]


// SwitchBox配置
export const SWICHBOX = [
    { label: '客户分布热力', value: false, type: 'customer' },
]