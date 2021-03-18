import request from './requestForNode'
const prefix = '/node'

// 登陆
export function login (data) {
    return request({
        url: prefix + '/user/login',
        method: 'post',
        data: data
    })
}