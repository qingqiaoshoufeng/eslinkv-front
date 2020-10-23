import request from './request'
import qs from 'qs'
// 查询看板列表
export default (data) => {
	return request({
		url: '/material/page',
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
