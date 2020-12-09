let ICcustomer = {
    label: '工商户',
    DW: '户',
    prop: "iCcustomer",
    Fixed: 0
}

let useNumberYestoday = {
    label: '昨日用气量',
    DW: 'm³',
    prop: "useNumberYestoday",
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
export { ICcustomer, useNumberYestoday, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, ICcustomerStatus }