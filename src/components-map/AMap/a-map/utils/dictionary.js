
let OperationToday = {
    label: '今日操作',
    DW: '次',
    prop: "operationToday"
};
let OperationWeek = {
    label: '本周操作',
    DW: '次',
    prop: "operationWeek"
}
let CouplingNumber = {
    label: '联码户数',
    DW: '户',
    prop: "couplingNumber"
}
let CouplingPercent = {
    label: '联码率',
    DW: '%',
    prop: "couplingPercent"
}
let NewCouplingNumber = {
    label: '本月新增联码户数',
    DW: '次',
    prop: "newCouplingNumber"
}
let couplingIncreaseToday = {
    label: '昨日新增联码数',
    DW: '',
    prop: "yesterday"
}
let couplingIncreaseWeek = {
    label: '近一周新增联码数',
    DW: '',
    prop: "week"
}
let couplingIncreaseMonth = {
    label: '上月新增联码数',
    DW: '',
    prop: "lastMonth"
}
let ICcustomer = {
    label: '工商户',
    DW: '户',
    prop: "iCcustomer"
}
// 工商户详情
let useNumberYestoday = {
    label: '昨日用气量',
    DW: 'm³',
    prop: "useNumberYestoday"
}

let ICcustomerStatus = {
    label: '流量异常',
    DW: '',
    prop: "ICcustomerStatus"
}

let warningYestoday = {
    label: '昨日报警',
    DW: '次',
    prop: "warningYestoday"
}
let FTPNumber = {
    label: '工商户远传流量计',
    DW: '次',
    prop: "longPass"
}
let warningYestodayTotal = {
    label: '昨日报警次数',
    DW: '',
    prop: "yesterdayCallNumber"
}
let warningYestodayMetersTotal = {
    label: '昨日报警表数',
    DW: '',
    prop: "yesterdayMeterNumer"
}

// 高压统计数据
let HighPressureGasStation = {
    label: '门站',
    DW: '',
    prop: "gageStation"
}
let emergencyAirSourceStation = {
    label: '应急气源站',
    DW: '',
    prop: "emergencyAirSourceStation"
}
let HighPressureHighPressureGasStation = {
    label: '高中压调压站',
    DW: '',
    prop: "pressureRegulatingStation"
}
let HighPressureLineLength = {
    label: '高压管线长度(m)',
    DW: '',
    prop: "pipelineLength"
}
let HighPressureCarNumber = {
    label: '高压巡检车辆',
    DW: '',
    prop: "car"
}

let HighPressureInspectionNumber = {
    label: '高压巡检人员',
    DW: '',
    prop: "inspectPeople"
}
let HighPressurePreservationNumber = {
    label: '高压场站维保人员',
    DW: '',
    prop: "repairPeople"
}
// 中低压数据配置
let LowPressureMediumline = {
    label: '中压管线(m)',
    DW: '',
    prop: "lowLength"
}
let LowPressureLowline = {
    label: '低压管线(m)',
    DW: '',
    prop: "smallLength"
}
let LowPressureGreenServeStation = {
    label: '绿色能源综合服务站',
    DW: '',
    prop: "greenStation"
}
let LowPressureManageStation = {
    label: '管网运行管理站',
    DW: '',
    prop: "gwxxStation"
}
let LowPressureOnNumber = {
    label: '地上抢修点',
    DW: '',
    prop: "up",
    type: 'warning'
}
let LowPressureUnderNumber = {
    label: '地下抢修点',
    DW: '',
    prop: "down",
    type: 'warning'
}
// lng站统计数据
let LNGstationNumber = {
    label: 'LNG站点',
    DW: '',
    prop: "lINGStation",
}
// 其他 站统计数据
let commonUseNumber = {
    label: '常用钢瓶用户数量',
    DW: '',
    prop: "user",
}
let registerNumber = {
    label: '在册钢瓶数量',
    DW: '',
    prop: "register",
}

// 客户服务统计数据
let citizenNumber = {
    label: '居民户',
    DW: '',
    prop: "resident",
}
let publicBuildNumber = {
    label: '公建户',
    DW: '',
    prop: "surname",
}
let industryNumber = {
    label: '工业户',
    DW: '',
    prop: "industry",
}
let businessServe = {
    label: '营业服务网点',
    DW: '',
    prop: "service",
}
// 客户服务详情数据
let citizenNumberDetial = {
    label: '居民户',
    DW: '户',
    prop: "citizenNumberDetial",
}
let publicBuildNumberDetial = {
    label: '公建户',
    DW: '户',
    prop: "publicBuildNumberDetial",
}
let industryNumberDetial = {
    label: '工业户',
    DW: '户',
    prop: "industryNumberDetial",
}
let monthAccountDetial = {
    label: '本月开户',
    DW: '户',
    prop: "monthAccountDetial",
}
let monthInstallDetial = {
    label: '本月安装',
    DW: '户',
    prop: "monthInstallDetial",
}
let monthFireDetial = {
    label: '本月点火',
    DW: '户',
    prop: "monthFireDetial",
}
// 客户服务任务工单详情
let serviceCustomerPipeline = {
    label: '渠道',
    DW: '户',
    prop: "channel",
}
let serviceCustomerCustomer = {
    label: '客户',
    DW: '户',
    prop: "customer",
}
let serviceCustomerAddress = {
    label: '地址',
    DW: '户',
    prop: "address",
}
let serviceCustomerStatus = {
    label: '状态',
    DW: '户',
    prop: "statusText",
}


// 19厅数统计数据
let OnlineType = {
    label: '线上业务服务类型',
    DW: '',
    prop: "busi_type",
}

let TodayApplication = {
    label: '今日业务申请',
    DW: '',
    prop: "apply_nbr",
}

let TodayUnproving = {
    label: '今日待审核',
    DW: '',
    prop: "pending_nbr",
}
let TodayPass = {
    label: '今日审核通过',
    DW: '',
    prop: "accept_nbr",
}
let TodayProvingTo2 = {
    label: '今日2小时审核率',
    DW: '',
    prop: "accept_2hour_rate",
}
// 19厅详情接口
let monthAccpet = {
    label: '本月已受理',
    DW: '单',
    prop: "accept_m_nbr",
    defaultVal: 0
}
let monthManage = {
    label: '本月已办结',
    DW: '单',
    prop: "finished_m_nbr",
    defaultVal: 0
}
let monthManagePercent = {
    label: '本月办结率',
    DW: '单',
    prop: "finished_m_rate",
    defaultVal: 0
}


// accept_2hour_rate: 0
// accept_nbr: "150"
// apply_all_nbr: "55694"
// apply_nbr: "295"
// busi_type: "5"
// pending_nbr: "105"


export { OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber, couplingIncreaseToday, couplingIncreaseWeek, couplingIncreaseMonth, ICcustomer, useNumberYestoday, ICcustomerStatus, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, HighPressureGasStation, emergencyAirSourceStation, HighPressureHighPressureGasStation, HighPressureLineLength, HighPressureCarNumber, HighPressureInspectionNumber, HighPressurePreservationNumber, LowPressureMediumline, LowPressureLowline, LowPressureGreenServeStation, LowPressureManageStation, LowPressureOnNumber, LowPressureUnderNumber, LNGstationNumber, commonUseNumber, registerNumber, citizenNumber, publicBuildNumber, industryNumber, businessServe, citizenNumberDetial, publicBuildNumberDetial, industryNumberDetial, monthAccountDetial, monthInstallDetial, monthFireDetial, OnlineType, TodayApplication, TodayUnproving, TodayPass, TodayProvingTo2, monthAccpet, monthManage, monthManagePercent, serviceCustomerPipeline, serviceCustomerCustomer, serviceCustomerAddress, serviceCustomerStatus }