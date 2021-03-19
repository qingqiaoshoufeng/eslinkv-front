import request from './request'
const prefix = '/node'

export function create (data) {
    return request({
        url: `${prefix}/market/component/create`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function update (data) {
    return request({
        url: `${prefix}/market/component/update`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function destroy (data) {
    return request({
        url: `${prefix}/market/component/destroy`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function list (data) {
    return request({
        url: `${prefix}/market/component/list`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function detail (data) {
    return request({
        url: `${prefix}/market/component/detail`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export function checkSuccess (data) {
    return request({
        url: `${prefix}/market/component/checkSuccess`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function checkError (data) {
    return request({
        url: `${prefix}/market/component/checkError`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getVersionList (data) {
    return request({
        url: `${prefix}/market/component/version`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
