import request from './request'
import qs from 'qs'
const HANGRANURL = '/hangran'
const DATAURL = '/data'
// 获取杭燃码地图部分数据 分公司、集团大厅、综合服务站
export function getHangranCodeList(data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapDataResult`,
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取工商户地图数据 勇用大户、分公司
export function getICcustomerList1(data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapDataResult`,
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// 集团大厅站点
//模糊匹配所有站点
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
// 分公司
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


export function getAllTypeStationList(data) {
    return request({
        url: DATAURL + '/map/serve/getAllTypeStationList',
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
