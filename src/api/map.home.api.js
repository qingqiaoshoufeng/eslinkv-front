import request from './request'
import qs from 'qs'

//门站列表
export function gasStationList(data) {
	return request({
		url: '/map/home/gasStationList',
		method: 'get',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}
