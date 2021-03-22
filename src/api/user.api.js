import request, { headers } from './request'

// 登陆
export function login (data) {
    return request({
        url: '/user/login',
        method: 'post',
        headers,
        data
    })
}
