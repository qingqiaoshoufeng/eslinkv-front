import {
    ValveOpenFinish, time,
    DevicedId, DeviceName, DeviceLocation, F_BatteryVoltage, SolarCell, GatewaySingal, deviceType, inletPressure, outletPressure, MC, TEMP, inletTemperature, outletTemperature, h2S, ch4
} from './dictionary'
export const WARNSTATIONS_OVER_LAY = {
    WarningStations: {
        fields: {
            name: {
                style: {
                    fontSize: '32px',
                    color: '#FFDC45',
                },
                errColor: '#FFDC45',
            },
        },
    },
}

export const DETAILLIST = [ValveOpenFinish, time,
    DevicedId, DeviceName, DeviceLocation, F_BatteryVoltage, SolarCell, GatewaySingal, deviceType, inletPressure, outletPressure, inletTemperature, outletTemperature, h2S, ch4, MC, TEMP,
]