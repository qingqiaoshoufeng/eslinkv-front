let DevicedId = {
    label: '编号',
    DW: '',
    prop: "deviceId",
}
let deviceType = {
    label: '类型',
    DW: '',
    prop: "deviceType",
}
let inletPressure = {
    label: '进口压力',
    DW: 'kPa',
    prop: "inletPressure",
    Fixed: 2
}
let outletPressure = {
    label: '出口压力',
    DW: 'kPa',
    prop: "outletPressure",
    Fixed: 2
}
let inletTemperature = {
    label: '进口温度',
    DW: '°C',
    prop: "inletTemperature",
    Fixed: 2
}
let outletTemperature = {
    label: '出口温度',
    DW: '°C',
    prop: "outletTemperature",
    Fixed: 2
}
let h2S = {
    label: '硫化氢',
    DW: 'ppm',
    prop: "h2S",
}
let ch4 = {
    label: '甲烷',
    DW: 'LEL',
    prop: "ch4",
}


export {
    DevicedId, deviceType, inletPressure, outletPressure, inletTemperature, outletTemperature, h2S, ch4
}