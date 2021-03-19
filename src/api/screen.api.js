import request from './request'
import qs from 'qs'
const prefix = '/node'
export function abc (data) {
    return request({
        url: `${prefix}/board/save`,
        method: 'post',
        data: qs.stringify(data),
        headers
    })
}
