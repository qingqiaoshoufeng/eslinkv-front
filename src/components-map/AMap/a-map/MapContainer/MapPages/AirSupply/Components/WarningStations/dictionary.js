
const ValveOpenFinish = {
    label: '阀门状态',
    DW: '',
    prop: 'valveOpenFinish',
    style: {
        color: '#ffd200',
        minWidth: '70%',
        fontWeight: '700'
    }
}
const time = {
    label: '时间',
    DW: '',
    prop: 'createDate'
}

const DevicedId = {
    label: '编号',
    DW: '',
    prop: 'deviceId'
}
const DeviceName = {
    label: '设备名称',
    DW: '',
    prop: 'deviceName'
}
const DeviceLocation = {
    label: '设备坐标',
    DW: '',
    prop: 'deviceLocation'
}
const F_BatteryVoltage = {
    label: '电池电压',
    DW: 'V',
    prop: 'f_batteryVoltage'
}
const SolarCell = {
    label: '太阳能电压',
    DW: 'V',
    prop: 'solarCell'
}
const GatewaySingal = {
    label: '信号强度',
    DW: 'dBm',
    prop: 'gatewaySingal'
}
const deviceType = {
    label: '类型',
    DW: '',
    prop: 'deviceType'
}
const inletPressure = {
    label: '进口压力',
    DW: 'kPa',
    prop: 'inletPressure',
    Fixed: 2
}
const outletPressure = {
    label: '出口压力',
    DW: 'kPa',
    prop: 'outletPressure',
    Fixed: 2
}
const MC = {
    label: '井盖状态',
    DW: '',
    prop: 'mc'
}
const TEMP = {
    label: '温度',
    DW: '°C',
    prop: 'temp',
    Fixed: 2
}

const inletTemperature = {
    label: '进口温度',
    DW: '°C',
    prop: 'inletTemperature',
    Fixed: 2
}
const outletTemperature = {
    label: '出口温度',
    DW: '°C',
    prop: 'outletTemperature',
    Fixed: 2
}
const h2S = {
    label: '硫化氢',
    DW: 'ppm',
    prop: 'h2S'
}
const ch4 = {
    label: '甲烷',
    DW: 'LEL',
    prop: 'ch4'
}


export {
    ValveOpenFinish, time,
    DevicedId, DeviceName, DeviceLocation, F_BatteryVoltage, SolarCell, GatewaySingal, deviceType, inletPressure, outletPressure, inletTemperature, outletTemperature, MC, TEMP, h2S, ch4
}
