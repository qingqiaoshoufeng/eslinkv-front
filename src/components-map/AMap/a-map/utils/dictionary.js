
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
let useNumberYestoday = {
    label: '昨日用气量',
    DW: 'm³',
    prop: "useNumberYestoday"
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
    prop: "GasStation"
}
let HighPressurePressureRegulatingStation = {
    label: '调压站',
    DW: '',
    prop: "PressureRegulatingStation"
}
let HighPressureHighPressureGasStation = {
    label: '高中压调压站',
    DW: '',
    prop: "HighPressureGasStation"
}
let HighPressureLineLength = {
    label: '高压管线长度(km)',
    DW: '',
    prop: "HighPressureLineLength"
}
let HighPressureCarNumber = {
    label: '高压巡检车辆',
    DW: '',
    prop: "CarNumber"
}

let HighPressureInspectionNumber = {
    label: '高压巡检人员',
    DW: '',
    prop: "InspectionNumber"
}
let HighPressurePreservationNumber = {
    label: '高压场站维保人员',
    DW: '',
    prop: "PreservationNumber"
}
// 中低压数据配置
let LowPressureMediumline = {
    label: '中压管线(km)',
    DW: '',
    prop: "Mediumline"
}
let LowPressureLowline = {
    label: '低压管线(km)',
    DW: '',
    prop: "Lowline"
}
let LowPressureGreenServeStation = {
    label: '绿色能源综合服务站',
    DW: '',
    prop: "GreenServeStation"
}
let LowPressureManageStation = {
    label: '管网运行管理站',
    DW: '',
    prop: "ManageStation"
}
let LowPressureOnNumber = {
    label: '地上抢修点',
    DW: '',
    prop: "OnNumber",
    type: 'warning'
}
let LowPressureUnderNumber = {
    label: '地下抢修点',
    DW: '',
    prop: "UnderNumber",
    type: 'warning'
}
// lng站统计数据
let LNGstationNumber = {
    label: 'LNG站点',
    DW: '',
    prop: "stationNumber",
}




export { OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber, couplingIncreaseToday, couplingIncreaseWeek, couplingIncreaseMonth, ICcustomer, useNumberYestoday, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, HighPressureGasStation, HighPressurePressureRegulatingStation, HighPressureHighPressureGasStation, HighPressureLineLength, HighPressureCarNumber, HighPressureInspectionNumber, HighPressurePreservationNumber, LowPressureMediumline, LowPressureLowline, LowPressureGreenServeStation, LowPressureManageStation, LowPressureOnNumber, LowPressureUnderNumber, LNGstationNumber }