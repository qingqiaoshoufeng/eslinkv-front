import request from './request'

export default (data) => request.post('/oss/uploadFile', data)
