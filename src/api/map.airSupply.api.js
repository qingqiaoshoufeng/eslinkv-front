import request from './request'
import qs from 'qs'

// 集团大厅站点
//模糊匹配所有站点
export function getAirSupplyDataStatisticsList(data) {
    return request({
        url: '/map/airSupply/getAirSupplyDataStatisticsList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
},
export function getAirSupplyHighPressureList(data) {
    return request({
        url: '/map/airSupply/getAirSupplyHighPressureList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}


