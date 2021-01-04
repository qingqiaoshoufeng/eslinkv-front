const config = {
    animation: true
};
const value = {
    layout: {
        size: {
            width: 992,
            height: 80
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: [
                {title: '微信', index: ['nn16rowdl5r', 'p2wovclspks'], img: '/static/images/e-tab/icon1.svg'},
                {title: '微博', index: ['nn16rowdl5r', 'p2wovclspks'], img: '/static/images/e-tab/icon2.svg'},
                {title: '网站', index: ['nn16rowdl5r', 'p2wovclspks'], img: '/static/images/e-tab/icon3.svg'},
                {title: '头条', index: ['nn16rowdl5r', 'p2wovclspks'], img: '/static/images/e-tab/icon4.svg'},
                {title: '抖音', index: ['nn16rowdl5r', 'p2wovclspks'], img: '/static/images/e-tab/icon5.svg'},
            ]
        }),
    }
}

export {config, value}