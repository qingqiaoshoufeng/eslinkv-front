import request from './request'
import qs from 'qs'
const prefix = '/node'

export function list (data) {
    return request({
        url: `${prefix}/screen/list`,
        method: 'post',
        data: qs.stringify(data),
    })
}
