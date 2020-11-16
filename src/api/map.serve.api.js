import request from './request'
import qs from 'qs'

// 集团大厅站点
//模糊匹配所有站点
export function getGrouphallList(data) {
    return request({
        url: '/map/serve/getGrouphallList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export function getBranchCompanyList(data) {
    return request({
        url: '/map/serve/getBranchCompanyList',
        method: 'get',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
