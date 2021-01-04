const config = {animation: true}
const value = {
    layout: {
        size: {
            width: 790,
            height: 250
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: [
                {
                    name: '公建户工程',
                    itemStyle: {
                        color: '#fc853e',
                    },
                },
                {
                    name: '改管工程',
                    itemStyle: {
                        color: '#fc853e',
                    },
                },
                {
                    name: '民用户工程',
                    itemStyle: {
                        color: '#fc853e',
                    },
                },
                {
                    name: '干线工程',
                    itemStyle: {
                        color: '#fc853e',
                    },
                },
                {
                    name: '场站工程',
                    itemStyle: {
                        color: '#fc853e',
                    },
                },
                {
                    name: 'a1',
                },
                {
                    name: 'a2',
                },
                {
                    name: 'b1',
                },
                {
                    name: 'c',
                },
            ],
            links: [
                {
                    source: '公建户工程',
                    target: 'b1',
                    value: 1,
                    lineStyle: {
                        color: "'#314656'",
                    },
                },
                {
                    source: '改管工程',
                    target: 'b1',
                    value: 1,
                    lineStyle: {
                        color: "'#314656'",
                    },
                },
                {
                    source: '民用户工程',
                    target: 'b1',
                    value: 1,
                    lineStyle: {
                        color: "'#314656'",
                    },
                },
                {
                    source: '干线工程',
                    target: 'b1',
                    value: 1,
                    lineStyle: {
                        color: "'#314656'",
                    },
                },
                {
                    source: '场站工程',
                    target: 'b1',
                    value: 1,
                    lineStyle: {
                        color: "'#314636'",
                    },
                },
                {
                    source: 'b1',
                    target: 'a2',
                    value: 1,
                },
                {
                    source: 'b',
                    target: 'b1',
                    value: 1,
                    lineStyle: {
                        color: "'#332156'",
                    },
                },
                {
                    source: 'b1',
                    target: 'a1',
                    value: 1,
                    lineStyle: {
                        color: "'#344656'",
                    },
                },
                {
                    source: 'b1',
                    target: 'c',
                    value: 1,
                    lineStyle: {
                        color: "'#317656'",
                    },
                },
            ],
        }),
    },
}

export {config, value}