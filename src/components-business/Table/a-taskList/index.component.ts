import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        titles: true
    }
};
const configSource = {
    config: {
        fields: {
            title: getInput('titles', '标题'),
        }
    }
}
const value = {
    layout: {
        size: {
            width: 992,
            height: 201
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify([
            {
                time: '06/03 09:11',
                channel: '李萌萌',
                businessType: '滨江区滨盛路1508号',
                statusDesc: '设备巡检故障',
            },
            {
                time: '06/03 09:11',
                channel: '李萌萌',
                businessType: '滨江区滨盛路1508号',
                statusDesc: '设备巡检故障',
            },
            {
                time: '06/03 09:11',
                channel: '在线客服',
                businessType: '滨江区滨盛路1508号',
                statusDesc: '设备巡检故障',
            },
            {
                time: '06/03 09:11',
                channel: '李萌萌',
                businessType: '滨江区滨盛路1508号',
                statusDesc: '设备巡检故障',
            },
            {
                time: '06/03 09:11',
                channel: '李萌萌',
                businessType: '滨江区滨盛路1508号',
                customer: '李的萌萌',
                statusDesc: '设备巡检故障',
            },
            {
                time: '06/03 09:11',
                channel: '李萌萌',
                businessType: '滨江区滨盛路1508号',
                statusDesc: '设备巡检故障',
            },
        ]),
    },
    config: {
        titles: ['时间', '报警人', '地点', '工单内容']
    }
}
export {configSource, config, value}