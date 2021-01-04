const config = { animation: true }
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
                [132, '132天'],
                [201, '201天'],
                [93, '93天'],
                [256, '256天'],
                [71, '71天'],
            ],
        }),
    },
}

export {config, value}