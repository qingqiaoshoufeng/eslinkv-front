const OperationToday = {
	label: '今日操作',
	DW: '次',
	prop: 'operationToday',
}
const OperationWeek = {
	label: '本周操作',
	DW: '次',
	prop: 'operationWeek',
}
const CouplingNumber = {
	label: '联码户数',
	DW: '户',
	prop: 'couplingNumber',
}
const CouplingPercent = {
	label: '联码率',
	DW: '%',
	prop: 'couplingPercent',
}
const NewCouplingNumber = {
	label: '本月新增联码户数',
	DW: '次',
	prop: 'newCouplingNumber',
}
const couplingIncreaseToday = {
	label: '昨日新增联码数',
	DW: '',
	prop: 'yesterday',
}
const couplingIncreaseWeek = {
	label: '近一周新增联码数',
	DW: '',
	prop: 'week',
}
const couplingIncreaseMonth = {
	label: '上月新增联码数',
	DW: '',
	prop: 'lastMonth',
}
// 工商户详情
const ICcustomer = {
	label: '工商户',
	DW: '户',
	prop: 'iCcustomer',
}

const useNumberYestoday = {
	label: '昨日用气量',
	DW: 'm³',
	prop: 'useNumberYestoday',
}

const ICcustomerStatus = {
	label: '流量异常',
	DW: '',
	prop: 'ICcustomerStatus',
}

const warningYestoday = {
	label: '昨日报警',
	DW: '次',
	prop: 'warningYestoday',
}
const FTPNumber = {
	label: '工商户远传流量计',
	DW: '次',
	prop: 'longPass',
}
const warningYestodayTotal = {
	label: '昨日报警次数',
	DW: '',
	prop: 'yesterdayCallNumber',
}
const warningYestodayMetersTotal = {
	label: '昨日报警表数',
	DW: '',
	prop: 'yesterdayMeterNumer',
}

// 高压统计数据
const HighPressureGasStation = {
	label: '门站',
	DW: '',
	prop: 'gageStation',
}
const emergencyAirSourceStation = {
	label: '应急气源站',
	DW: '',
	prop: 'emergencyAirSourceStation',
}
const HighPressureHighPressureGasStation = {
	label: '高中压调压站',
	DW: '',
	prop: 'pressureRegulatingStation',
}
const HighPressureLineLength = {
	label: '高压管线长度(km)',
	DW: '',
	prop: 'pipelineLength',
}
const HighPressureCarNumber = {
	label: '高压巡检车辆',
	DW: '',
	prop: 'car',
}

const HighPressureInspectionNumber = {
	label: '高压巡检人员',
	DW: '',
	prop: 'inspectPeople',
}
const HighPressurePreservationNumber = {
	label: '高压场站维保人员',
	DW: '',
	prop: 'repairPeople',
}
// 中低压数据配置
const LowPressureMediumline = {
	label: '中压管线(km)',
	DW: '',
	prop: 'lowLength',
}
const LowPressureLowline = {
	label: '低压管线(km)',
	DW: '',
	prop: 'smallLength',
}
const LowPressureGreenServeStation = {
	label: '绿色能源综合服务站',
	DW: '',
	prop: 'greenStation',
}
const LowPressureManageStation = {
	label: '管网运行管理站',
	DW: '',
	prop: 'gwxxStation',
}
const LowPressureOnNumber = {
	label: '地上抢修点',
	DW: '',
	prop: 'up',
	type: 'warning',
}
const LowPressureUnderNumber = {
	label: '地下抢修点',
	DW: '',
	prop: 'down',
	type: 'warning',
}
const LowPressurePassRate = {
	label: '合格率',
	DW: '',
	prop: 'passRate',
}
// lng站统计数据
const LNGstationNumber = {
	label: 'LNG站点',
	DW: '',
	prop: 'lINGStation',
}
// 其他 站统计数据
const commonUseNumber = {
	label: '常用钢瓶用户数量',
	DW: '',
	prop: 'user',
}
const registerNumber = {
	label: '在册钢瓶数量',
	DW: '',
	prop: 'register',
}

// 客户服务统计数据
const citizenNumber = {
	label: '居民户',
	DW: '',
	prop: 'resident',
}
const publicBuildNumber = {
	label: '公建户',
	DW: '',
	prop: 'surname',
}
const industryNumber = {
	label: '工业户',
	DW: '',
	prop: 'industry',
}
const businessServe = {
	label: '营业服务网点',
	DW: '',
	prop: 'service',
}
// 客户服务详情数据
const citizenNumberDetial = {
	label: '居民户',
	DW: '户',
	prop: 'citizenNumberDetial',
}
const publicBuildNumberDetial = {
	label: '公建户',
	DW: '户',
	prop: 'publicBuildNumberDetial',
}
const industryNumberDetial = {
	label: '工业户',
	DW: '户',
	prop: 'industryNumberDetial',
}
const monthAccountDetial = {
	label: '本月开户',
	DW: '户',
	prop: 'monthAccountDetial',
}
const monthInstallDetial = {
	label: '本月安装',
	DW: '户',
	prop: 'monthInstallDetial',
}
const monthFireDetial = {
	label: '本月点火',
	DW: '户',
	prop: 'monthFireDetial',
}
// 客户服务任务工单详情
const serviceCustomerPipeline = {
	label: '渠道',
	DW: '',
	prop: 'channel',
}
const serviceCustomerCustomer = {
	label: '客户',
	DW: '',
	prop: 'customer',
}
const serviceCustomerAddress = {
	label: '地址',
	DW: '',
	prop: 'address',
}
const serviceCustomerStatus = {
	label: '状态',
	DW: '',
	prop: 'statusText',
}
// const emergencyAirSourceStation = {
// 	label: '状态',
// 	DW: '',
// 	prop: 'emergencyAirSourceStation',
// }
const greenEnergyStation = {
	label: '状态',
	DW: '',
	prop: 'greenEnergyStation',
}
const naturalGasStation = {
	label: '状态',
	DW: '',
	prop: 'naturalGasStation',
}
const storageDistributionStation = {
	label: '状态',
	DW: '',
	prop: 'storageDistributionStation',
}

export {
	OperationToday,
	OperationWeek,
	CouplingNumber,
	CouplingPercent,
	NewCouplingNumber,
	couplingIncreaseToday,
	couplingIncreaseWeek,
	couplingIncreaseMonth,
	ICcustomer,
	useNumberYestoday,
	ICcustomerStatus,
	warningYestoday,
	FTPNumber,
	warningYestodayTotal,
	warningYestodayMetersTotal,
	HighPressureGasStation,
	emergencyAirSourceStation,
	HighPressureHighPressureGasStation,
	HighPressureLineLength,
	HighPressureCarNumber,
	HighPressureInspectionNumber,
	HighPressurePreservationNumber,
	LowPressureMediumline,
	LowPressureLowline,
	LowPressureGreenServeStation,
	LowPressureManageStation,
	LowPressureOnNumber,
	LowPressureUnderNumber,
	LNGstationNumber,
	commonUseNumber,
	registerNumber,
	citizenNumber,
	publicBuildNumber,
	industryNumber,
	LowPressurePassRate,
	businessServe,
	citizenNumberDetial,
	publicBuildNumberDetial,
	industryNumberDetial,
	monthAccountDetial,
	monthInstallDetial,
	monthFireDetial,
	serviceCustomerPipeline,
	serviceCustomerCustomer,
	serviceCustomerAddress,
	serviceCustomerStatus,
}
