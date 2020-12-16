import { DevicedId, deviceType, inletPressure, outletPressure, inletTemperature, outletTemperature, h2S, ch4 } from './dictionary'
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

export const DETAILLIST = [DevicedId, deviceType, inletPressure, outletPressure, inletTemperature, outletTemperature, h2S, ch4]