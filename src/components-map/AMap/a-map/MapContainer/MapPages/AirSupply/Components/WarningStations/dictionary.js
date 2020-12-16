

let ValveOpenFinish = {
    label: '阀门状态',
    DW: '',
    prop: "valveOpenFinish",
    style: {
        color: '#ffd200',
        "minWidth": "70%",
        "fontWeight": "700"
    }
}
let time = {
    label: '时间',
    DW: '',
    prop: "createDate",
}

let DevicedId = {
    label: '编号',
    DW: '',
    prop: "deviceId",
}
let DeviceName = {
    label: '设备名称',
    DW: '',
    prop: "deviceName",
}
let DeviceLocation = {
    label: '设备坐标',
    DW: '',
    prop: "deviceLocation",
}
let F_BatteryVoltage = {
    label: '电池电压（V）',
    DW: '',
    prop: "f_batteryVoltage",
}
let SolarCell = {
    label: '太阳能电压(V)',
    DW: '',
    prop: "solarCell",
}
let GatewaySingal = {
    label: '信号强度（dBm）',
    DW: '',
    prop: "gatewaySingal",
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
let MC = {
    label: '井盖状态',
    DW: 'kPa',
    prop: "mc",
}
let TEMP = {
    label: '温度(℃)',
    DW: 'kPa',
    prop: "temp",
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
    ValveOpenFinish, time,
    DevicedId, DeviceName, DeviceLocation, F_BatteryVoltage, SolarCell, GatewaySingal, deviceType, inletPressure, outletPressure, MC, TEMP, inletTemperature, outletTemperature, h2S, ch4
}