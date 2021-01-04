const config = {animation: true}
const value = {
    layout: {
        size: {
            width: 1016,
            height: 540
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            videoSrc: '/cdn/videos/sanshe.MOV',
            poster: '/static/images/hangranma-bg.png',
        }),
    },
}

export {config, value}