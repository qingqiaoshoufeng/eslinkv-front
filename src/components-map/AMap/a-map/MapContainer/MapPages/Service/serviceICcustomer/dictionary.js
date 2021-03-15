const ICcustomer = {
    label: '工商户',
    DW: '户',
    prop: 'iCcustomer',
    Fixed: 0
}

const useNumberYesterday = {
    label: '昨日用气量',
    DW: 'm³',
    prop: 'useNumberYesterday',
    Fixed: 2
}
const useNumberMonth = {
    label: '本月用气量',
    DW: 'm³',
    prop: 'useNumberMonth',
    Fixed: 2
}
const useNumberLastMonth = {
    label: '上月用气量',
    DW: 'm³',
    prop: 'useNumberLastMonth',
    Fixed: 2
}
const useNumberYear = {
    label: '年度用气量',
    DW: 'm³',
    prop: 'useNumberYear',
    Fixed: 2
}


const ICcustomerStatus = {
    label: '流量异常',
    DW: '',
    prop: 'ICcustomerStatus'
}

const warningYestoday = {
    label: '昨日报警',
    DW: '次',
    prop: 'warningYestoday',
    Fixed: 0
}
const FTPNumber = {
    label: '远传表(台)',
    DW: '次',
    prop: 'longPass'
}
const warningYestodayTotal = {
    label: '昨日报警次数',
    DW: '',
    prop: 'yesterdayCallNumber'
}
const warningYestodayMetersTotal = {
    label: '昨日报警表数',
    DW: '',
    prop: 'yesterdayMeterNumer'
}
export { ICcustomer, useNumberYesterday, useNumberMonth, useNumberLastMonth, useNumberYear, warningYestoday, FTPNumber, warningYestodayTotal, warningYestodayMetersTotal, ICcustomerStatus }
