import request from './request'
import qs from 'qs'
const DATAURL = '/data'

//合并数仓数据
function mergeArgument() {
    let data = {
        projectId: 823,
        // queryId:
    }
}
//门站列表
export function getGasStationList(data) {
    return request({
        url: DATAURL + '/map/home/getGasStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//地下抢修点
export function getUndergroundRepairStationList(data) {
    return request({
        url: DATAURL + '/map/home/getUndergroundRepairStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//分布式能源
export function getDistributedEnergyResourceList(data) {
    return request({
        url: DATAURL + '/map/home/getDistributedEnergyResourceList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//应急气源站
export function getEmergencyAirSourceStationList(data) {
    return request({
        url: DATAURL + '/map/home/getEmergencyAirSourceStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//高压管线
export function getHighPressureLine(data) {
    return request({
        url: DATAURL + '/map/home/getHighPressureLine',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//高压管线在建中
export function getHighPressureLineProcess(data) {
    return request({
        url: DATAURL + '/map/home/getHighPressureLineProcess',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//低压线
export function getLowPressureLine(data) {
    return request({
        url: DATAURL + '/map/home/getLowPressureLine',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//中压线
export function getMiddlePressureLine(data) {
    return request({
        url: DATAURL + '/map/home/getMiddlePressureLine',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//巡检车辆
export function getInspectionCarList(data) {
    return request({
        url: DATAURL + '/map/home/getInspectionCarList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//巡检人员
export function getInspectionPersonList(data) {
    return request({
        url: DATAURL + '/map/home/getInspectionPersonList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//液压站
export function getLiquefiedGasStationList(data) {
    return request({
        url: DATAURL + '/map/home/getLiquefiedGasStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//LNG站
export function getLNGStationList(data) {
    return request({
        url: DATAURL + '/map/home/getLNGStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//调压站
export function getPressureRegulatingStationList(data) {
    return request({
        url: DATAURL + '/map/home/getPressureRegulatingStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// 综合服务站
export function getComprehensiveServiceStationList(data) {
    return request({
        url: DATAURL + '/map/home/getComprehensiveServiceStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// 管网运行管理站
export function getPipeManageMentStationList(data) {
    return request({
        url: DATAURL + '/map/home/getPipeManageMentStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//加气站
export function getNaturalGasStationList(data) {
    return request({
        url: DATAURL + '/map/home/getNaturalGasStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//态势感知
export function getWarningList(data) {
    return request({
        url: DATAURL + '/map/home/getWarningList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

//模糊匹配所有站点
export function getAllTypeStationList(data) {
    return request({
        url: DATAURL + '/map/home/getAllTypeStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export function getBranchCompanyWithDetialInfoList(data) {
    return request({
        url: DATAURL + '/map/serve/getBranchCompanyWithDetialInfoList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}


export function getStateList(data) {
    return request({
        url: DATAURL + '/map/serve/getStateList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}


// 集团大厅站点
export function getGrouphallList(data) {
    return request({
        url: DATAURL + '/map/serve/getGrouphallList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 子公司
export function getBranchCompanyList(data) {
    return request({
        url: DATAURL + '/map/serve/getBranchCompanyList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// 服务网点
export function getServiceNetworkStationList(data) {
    return request({
        url: DATAURL + '/map/serve/getServiceNetworkStationList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 三社联动
export function getThreeSocialLinkageList(data) {
    return request({
        url: DATAURL + '/map/serve/getThreeSocialLinkageList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}


// 销气热力
export function getHeatMapList(data) {
    return request({
        url: DATAURL + '/map/serve/getHeatMapList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// 获取统计数据列表
export function getDataStatisticsList(data) {
    return request({
        url: DATAURL + '/map/serve/getDataStatisticsList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取工商户列表
export function getICcustomerList(data) {
    return request({
        url: DATAURL + '/map/serve/getICcustomerList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}