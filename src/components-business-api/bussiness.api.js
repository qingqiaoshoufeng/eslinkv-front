import request from './request'

const HANGRANURL = '/server'

// 获取行业用气量对比类型
export function businessAnalysisType (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/type`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 获取杭燃当前时间
export function year (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/year`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
