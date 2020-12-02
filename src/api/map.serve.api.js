import request from './request'
import qs from 'qs'
const HANGRANURL = '/server'
const DATAURL = '/data'
// 获取杭燃码地图部分数据 分公司、集团大厅、综合服务站
export function getHangranCodeList(data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapDataResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取杭燃码地图热力图部分数据
export function getHangranCodeHotList(data) {
    return request({
        url: `${HANGRANURL}/gasCode/heatCount`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取杭燃码门站详情
export function getHangranCodeDetailInfo(data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapDetailInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 联码新增统计数据
export function getCouplingIncreaseInfo(data) {
    return request({
        url: `${HANGRANURL}/gasCode/addNum`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

// 累积联码用户数
export function getAccumulativeTotal(data) {
    return request({
        url: `${HANGRANURL}/gasCode/accumulativeTotal`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取工商户地图数据 用气大户、分公司
export function getICcustomerStationList(data) {
    console.log(data, 7777777)
    return request({
        url: `${HANGRANURL}/businessAnalysis/mapDataResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取工商户门站详情
export function getICcustomerDetailInfo(data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/mapDetailInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取工商户报警汇总信息
export function getICcustomerCallingInfo(data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/callResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取工商户年用气热力图
export function getICcustomerHotInfo(data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/heatCount`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 态势感知列表
export function getICcustomerSituationAwareness(data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/situationAwareness`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 获取态势感知调出场景详情
export function getICcustomerWarningDetialInfo(data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/situationAwarenessDetailInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 19厅模块
// 查询19厅服务物列表
export function getNineteenStationList() {

}
// 查询19厅统计数据
export function getNineteenStatisticsInfo() {

}
// 查询工商户站点详情



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
