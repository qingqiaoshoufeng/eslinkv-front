import { getCouplingIncreaseInfo } from "../../../../api/map.serve.api";

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
    label: '今日新增联码数',
    DW: '',
    prop: "today"
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

export { OperationToday, OperationWeek, CouplingNumber, CouplingPercent, NewCouplingNumber, couplingIncreaseToday, couplingIncreaseWeek, couplingIncreaseMonth, ICcustomer, useNumberYestoday, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal }