import request from './request'
const prefix = '/node'

export function uploadFile (data) {
    return request({
        url: prefix + '/upload/file',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}