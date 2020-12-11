import request from './request'
import qs from 'qs'
const DATAURL = '/data'
const HANGRANURL = '/server'
// 获取所有站点数据类型
//模糊匹配所有站点
export function getAllTypeStationList(data) {
    return request({
        url: HANGRANURL + '/applyAir/mapDataResult',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 高压统计数据
export function getHighPressureStatisticsInfo(data) {
    return request({
        url: HANGRANURL + '/airFeed/rightIndex',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 高压管网（包括是否建成）
export function getHighPressurePipe(data) {
    return request({
        url: HANGRANURL + '/applyAir/applyAirPipeResult',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
//站点实时数据
export function getStationRealTimeInfo(data) {
    return request({
        url: HANGRANURL + '/airFeed/gasStationData',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
//高中压工艺报警
export function getProcessWarningList(data) {
    return request({
        url: HANGRANURL + '/highMidPressure/list',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
//高中压事件报警
export function getEventWarningList(data) {
    return request({
        url: HANGRANURL + '/situationAwareness/caseList',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}


//巡检人员路径轨迹
export function getEmployeeGpsTrack(data) {
    return request({
        url: HANGRANURL + '/situationAwareness/employeeGpsTrack',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 集团大厅站点
//模糊匹配所有站点
export function getAirSupplyDataStatisticsList(data) {
    return request({
        url: DATAURL + '/map/airSupply/getAirSupplyDataStatisticsList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
// 高压站
export function getAirSupplyHighPressureList(data) {
    return request({
        url: DATAURL + '/map/airSupply/getAirSupplyHighPressureList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
