let ICcustomer = {
    label: '工商户',
    DW: '户',
    prop: "iCcustomer",
    Fixed: 0
}

let useNumberToday = {
    label: '今日用气量',
    DW: 'm³',
    prop: "useNumberToday",
    Fixed: 2
}
let useNumberYear = {
    label: '年度用气量',
    DW: 'm³',
    prop: "useNumberYear",
    Fixed: 2
}
let useNumberMonth = {
    label: '本月用气量',
    DW: 'm³',
    prop: "useNumberMonth",
    Fixed: 2
}

let ICcustomerStatus = {
    label: '流量异常',
    DW: '',
    prop: "ICcustomerStatus"
}

let warningYestoday = {
    label: '昨日报警',
    DW: '次',
    prop: "warningYestoday",
    Fixed: 0
}
let FTPNumber = {
    label: '远传表(台)',
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
export { ICcustomer, useNumberToday, useNumberYear, useNumberMonth, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, ICcustomerStatus }