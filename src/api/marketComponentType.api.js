import request, { headers } from './request'

export function create (data) {
    return request({
        url: '/market/componentType/create',
        method: 'post',
        data,
        headers
    })
}

export function update (data) {
    return request({
        url: '/market/componentType/update',
        method: 'post',
        data,
        headers
    })
}

export function destroy (data) {
    return request({
        url: '/market/componentType/destroy',
        method: 'post',
        data,
        headers
    })
}

export function getAllComponentType (data) {
    return request({
        url: '/market/componentType/list',
        method: 'post',
        data,
        headers
    })
}
