import request from './request'
import qs from 'qs'

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
// 事件警报
export function getEventWarningList(data) {
    return request({
        url: DATAURL + '/map/airSupply/getEventWarningList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

