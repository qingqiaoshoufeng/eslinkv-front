import request from './request'
const HANGRANURL = '/server'
/**
 * 获取所有站点数据类型，根据传入的type字段动态返回数据
 * @param {Object} data eg:{ types: [
    'InspectionPerson', //'巡检人员',
	'InspectionCar', // '巡检车辆',
	'GasStation', // '门站',
	'PressureRegulatingStation', // '调压站',
	'EmergencyAirSourceStation', // '应急气源站',
	'ServiceStation', // '综合服务站',
	'PipeManageMentStation', // '管网运行管理站',
	 'UndergroundRepairStation', // '地下抢修点',
	'LNGStation', // 'LNG站',
	'LiquefiedGasStation', // '液化气站',
	'NaturalGasStation', // '加气站',
	'DistributedEnergyResource', // '分布式能源',
	'MiddleAndLowPressureValve'  //中低压阀门
   ].toString()}
 *
 */
export function getAllTypeStationList(data) {
	return request({
		url: HANGRANURL + '/applyAir/mapDataResult',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}
/**
 * 供气模块: 右侧统计汇总数据，根据子页面获取数据
 * @param {*} data
 {
	type:'子页面字段'  // 高压('HighPressure')  中低压('LowPressure')  LNG('LNG')  其他('UCAN')
 }
 */
export function getStatisticsInfo(data) {
	return request({
		url: HANGRANURL + '/airFeed/rightIndex',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * 高压管网（包括是否建成）
 * 返回数据 {highPressureLine_Process:'高压管网建设中数据',highPressureLine:'高压管网数据'}
 */
export function getHighPressurePipe() {
	return request({
		url: HANGRANURL + '/applyAir/applyAirPipeResult',
		method: 'get',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}
/**
 * 站点实时数据(瞬时流量，压力等数据) 暂时只有门站、调压站，有其他站点的实时数据，需后端在此接口上增加字段
 * @param {Object} data
 {
	 	id:'站点id',
        name:'站点名称',
		type:'站点类型',  // 门站('GasStation') 调压站('PressureRegulatingStation')
 }
 */
export function getStationRealTimeInfo(data) {
	return request({
		url: HANGRANURL + '/airFeed/gasStationData',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * 阀门实时数据
 * @param {*} data
 {
	 id:'阀门id'
 }
 */
export function getLowMidDevice(data) {
	return request({
		url: HANGRANURL + '/situationAwareness/lowMidDevice',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * 高中压工艺报警：返回近24小时工艺报警数据
 * @param {*} data
 {
	 priority: '工艺报警等级', // 一级（1） 二级（2） 三级（3）
	 status: '是否处理',        // 已处理（0） 未处理（1）
 }
 */
export function getProcessWarningList(data) {
	return request({
		url: HANGRANURL + '/highMidPressure/list',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * 高中压事件报警列表：返回近24小时报警数据
 * @param {*} data
 {
	repairType: '报警类型',   抢修（'抢修'）  维修（'维修'）
	repairState: '是否处理',  已处理(0)      未处理(1)
 }
 */
export function getEventWarningList(data) {
	return request({
		url: HANGRANURL + '/situationAwareness/caseList2',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * 巡检人员路径轨迹: 根据巡检人员名字，出发时间，到达时间（如果已经到达则有到达时间）获取该时间段内 系统内巡检人员的轨迹数据
 * @param {*} data
{
	employeeName:'巡检人员姓名',
	callDate:'接单派人时间',
	arriveDate:'到达时间'
}
 */
export function getEmployeeGpsTrack(data) {
	return request({
		url: HANGRANURL + '/situationAwareness/employeeGpsTrack',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * 本月LNG场站采购Top10
 * @param {*} data

 */
export function getLngPurchaseTopTen(data = {}) {
	return request({
		url: HANGRANURL + '/LNG/purchaseTopTen',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * LNG最新订单
 * @param {*} data

 */
export function getLngLatestOrders(data = {}) {
	return request({
		url: HANGRANURL + '/LNG/latestOrders',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

/**
 * LNG最新订单
 * @param {*} data

 */
export function getLngStationCounts(data = {}) {
	return request({
		url: HANGRANURL + '/LNG/stationCount',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

export function getLngMapDataResult(data) {
	return request({
		url: HANGRANURL + '/LNG/mapDataResult',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

export function getLngStationData(data) {
	return request({
		url: HANGRANURL + '/LNG/lngStationData',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}


export function getLowMapDetailInfo(data) {
	return request({
		url: HANGRANURL + '/applyAir/mapDetailInfo',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

export function getPressAlarmList(data) {
	return request({
		url: HANGRANURL + '/applyAir/alarmList',
		method: 'get',
		params: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}
