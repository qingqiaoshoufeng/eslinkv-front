import request from './request'
const prefix = '/node'

export function create (data) {
    return request({
        url: `${prefix}/market/componentType/create`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function update (data) {
    return request({
        url: `${prefix}/market/componentType/update`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function destroy (data) {
    return request({
        url: `${prefix}/market/componentType/destroy`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getAllComponentType (data) {
    return request({
        url: `${prefix}/market/componentType/list`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
