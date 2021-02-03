import request from './request'
const HANGRANURL = '/server'

// 获取最近两天消息列表
export function getRecentMessageList(data) {
	return request({
		url: HANGRANURL + '/message/recentMessage',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 回复消息
export function toReplyMessage(data) {
	return request({
		url: HANGRANURL + '/message/reply',
		method: 'post',
		data: data
	})
}
// 获取未读消息
export function getUnReadMessage(data) {
	return request({
		url: HANGRANURL + '/message/unReadMessage',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}
