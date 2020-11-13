//态势感知列表
export const PROJECTSITUATIONAWARENESSLIST = [
    {
        content: '大农港路管网工程',
        address: '丁桥大农港路',
        status: 1,
        statusText: '延期',
        outday: 3,
        progress: '75%',
        stage: '开工',
        lng: 120.23463249206542,
        lat: 30.35978585158513,
        id: 1,
    },
    {
        content: '八方杰座大厦',
        address: '七堡大王庙路6号',
        status: 0,
        statusText: '正常',
        remainday: 67,
        progress: '80%',
        stage: '开工',
        lng: 120.26220560073853,
        lat: 30.297175362933245,
        id: 2,
    },
    {
        content: '百汇中心',
        address: '余杭镇禹航路966号',
        status: 0,
        statusText: '正常',
        remainday: 10,
        progress: '审核中',
        stage: '审核',
        lng: 119.93479371070862,
        lat: 30.275088701672438,
        id: 8,
    },
    {
        content: '新月商业园区',
        address: '临平经济开发区兴中路342号',
        status: 0,
        statusText: '正常',
        stage: '开工',
        remainday: 32,
        progress: '90%',
        lng: 120.25424480438232,
        lat: 30.437555564267768,
        id: 3,
    },
    {
        content: '农夫乐园',
        address: '余杭区东西大道',
        status: 0,
        statusText: '正常',
        remainday: 19,
        progress: '80%',
        stage: '开工',
        lng: 120.05518198013306,
        lat: 30.386555096848916,
        id: 4,
    },
    {
        content: '万科智谷',
        address: '石祥路208号',
        status: 0,
        statusText: '正常',
        remainday: 10,
        progress: '96%',
        stage: '开工',
        lng: 120.15817880630495,
        lat: 30.333963064963992,
        id: 5,
    },
    {
        content: '留下商贸中心',
        address: '西湖区留下大街107号',
        status: 0,
        statusText: '正常',
        outday: 0,
        progress: '100%',
        stage: '竣工',
        lng: 120.05026817321777,
        lat: 30.24449825100856,
        id: 6,
    },
    {
        content: '山水时代大厦',
        address: '奔竞大道与市心北路交叉路口',
        status: 0,
        statusText: '正常',
        // remainday: 60,
        progress: '招标中',
        stage: '招标',
        lng: 120.2441382408142,
        lat: 30.242042076168723,
        id: 7,
    },
    // {
    //     content: '鸿兴城·巧克力广场',
    //     address: '萧山区鸿兴路332号',
    //     status: 1,
    //     statusText: '延期',
    //     outday: 1,
    //     progress: '92%',
    //     lng: 120.34113764762878,
    //     lat: 30.22036019573785,
    //     id: '09',
    // },
    // {
    //     content: '中恒大厦',
    //     address: '浦沿街道东信大道69号',
    //     status: 0,
    //     statusText: '正常',
    //     remainday: 39,
    //     progress: '55%',
    //     lng: 120.13868451118469,
    //     lat: 30.177594232906227,
    //     id: 10,
    // },
    // {
    //     content: '正泰中自科技园',
    //     address: '江干区六号大街260号',
    //     status: 0,
    //     statusText: '正常',
    //     remainday: 66,
    //     progress: '37%',
    //     lng: 120.36983728408812,
    //     lat: 30.306401371032354,
    //     id: 11,
    // },
];
//legend配置
export const PROJECTLEGEND = {
    ZHAOBIAO: {
        label: '招标',
        icon: 'icontulizhaobiao',
        component: 'Overlay',
        isShow: true,
    },
    SHENHE: {
        label: '审核',
        icon: 'icontulishenhe',
        component: 'Overlay',
        isShow: true,
    },
    KAIGONG: {
        label: '开工',
        icon: 'icontulikaigong',
        component: 'Overlay',
        isShow: true,
    },
    JUNGONG: {
        label: '竣工',
        icon: 'icontulijungong',
        component: 'Overlay',
        isShow: true,
    },
    // YANQI: {
    //     label: '延期',
    //     icon: 'icongongchengyanqi',
    //     component: 'Overlay',
    //     isShow: true,
    // },
};

export const OVERLAYTYPEMAP = {
    开工: {
        icon: 'iconkaigong',
        type: 'KAIGONG',
    },
    审核: {
        icon: 'iconshenhe',
        type: 'SHENHE',
    },
    招标: {
        icon: 'iconzhaobiao',
        type: 'ZHAOBIAO',
    },
    竣工: {
        icon: 'iconjungong',
        type: 'JUNGONG',
    },
};