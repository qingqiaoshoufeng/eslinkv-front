import request from './request'
import qs from 'qs'

const HANGRANURL = '/server'

/**
 * 获取杭燃码地图部分数据子公司列表
 * @param {Object} data eg:{types: [
        'BranchCompany', // 子公司
    ].toString()}
 */
export function getHangranCodeList (data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapDataResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 获取杭燃码地图热力图数据列表
 * @params {null}
 */
export function getHangranCodeHotList (data) {
    return request({
        url: `${HANGRANURL}/gasCode/heatCount`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 获取杭燃码门站详情
 * @params {null}
 */
export function getHangranCodeDetailInfo (data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapDetailInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 点击查询杭燃码下服务厅详情
export function clickGetBranchCompanyDetialInfo (data) {
    return request({
        url: `${HANGRANURL}/gasCode/mapBranchCompanyInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 联码新增统计数据
 * @params {null}
 */
export function getCouplingIncreaseInfo (data) {
    return request({
        url: `${HANGRANURL}/gasCode/addNum`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 获取杭燃码、19厅地图部分数据子公司列表
 * @param {Object} data eg:{types: [
        'BranchCompany', // 子公司
        'MajorClient'    // 工商户
    ].toString()}
 */
export function getICcustomerStationList (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/mapDataResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 获取工商户门站详情
 * @param {Object} data eg:{
        name:'工商户名称',
        id:'工商户id',
        stationType:'工商户节点类型',
    };
 */
export function getICcustomerDetailInfo (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/mapDetailInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 获取工商户报警汇总信息（统计信息）
 * @params {null}
 */
export function getICcustomerCallingInfo (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/callResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 获取工商户年用气热力图
 * @params {null}
 */
export function getICcustomerHotInfo (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/heatCount`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 工商户前二十（右侧及页面）
 * @params {null}
 */
export function getICcustomerSituationAwareness (data) {
    return request({
        url: `${HANGRANURL}/businessAnalysis/yesterdayUseOrder`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 19厅模块
/**
 * 查询19厅统计数据（数仓接口所以以下参数固定写死）
 * @param {Object} data eg:{
        projectId: 20,
        queryId: 898,
        params: '',
    };
 */
export function getNineteenStatisticsInfo (data) {
    return request({
        url: 'server/api/impalaByQueryId',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


/**
 * 查询19厅站点详情
 * @param {Object} data eg:{
        chartQueryType: 0,
        dataAnalyseId: 901,
        dataType: 0,
        projectId: 20,
        queryId: 901,
        type: '子公司名称',
    };
 */
export function getNineteenStationDetailInfo (data) {
    return request({
        url: '/server/api/impalaByQueryId',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 客户服务模块
/**
 * 查询客户服务站点列表
 * @param {Object} data eg:{
        types: [
            'NetworkStation',      // 服务网点（暂时移除后续补充）
            'BranchCompany',       // 子公司
            'ThreeSocialLinkage',  // 三社联动
        ].toString(),
    }
 */
export function getServiceCustomerStationList (data) {
    return request({
        url: `${HANGRANURL}/threeSocial/mapDataResult`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 查询客户服务统计数据
 * @params {null}
 */
export function getServiceCustomerStatisticsInfo (data) {
    return request({
        url: `${HANGRANURL}/threeSocial/houseNum`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 查询客户服务站点详情
 * @param {Object} data eg:{
        name：'站点名称',
        id：'站点id',
        type:'站点类型',
    };
 */
export function getServiceCustomerDetialInfo (data) {
    return request({
        url: `${HANGRANURL}/threeSocial/mapDetailInfo`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 客户服务任务工单列表
 * @params {null}
 */
export function getServiceCustomerTaskList (data) {
    return request({
        url: `${HANGRANURL}/threeSocial/task`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 客户服务三社联动信息
 * @params {null}
 */
export function getServiceCustomerThreeSocialList (data) {
    return request({
        url: `${HANGRANURL}/threeSocial/event`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 客户服务三社联动信息
 * @params {null}
 */
export function getServiceCustomerThreeSocialDetail (data) {
    return request({
        url: `${HANGRANURL}/threeSocial/eventDetail`,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


/**
 * 三社联动 客户分布热力列表
 * @params {null}
 */
export function getThreeSocialLinkagecustmerHot (data) {
    return request({
        url: HANGRANURL + '/threeSocial/heatCount',
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
