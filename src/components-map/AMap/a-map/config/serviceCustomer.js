//legend配置
export const SERVICELEGENDCUSTOMERMAP = {
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        icon: 'iconjituandating',
        component: 'Grouphall',
    },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi',
        component: 'BranchCompany',
    },
    ServiceNetworkStation: {
        label: '服务网点',
        legendIcon: 'icontulifuwuwangdian',
        icon: 'iconfuwuwangdian',
        component: 'ServiceNetworkStation',
    },
    ThreeSocialLinkage: {
        label: '三社联动',
        legendIcon: 'icontulisansheliandong',
        icon: 'iconsansheliandong',
        component: 'ThreeSocialLinkage',
    }
}

export const SERVICELEGEND_CUSTOMER = {
    Grouphall: true,
    BranchCompany: true,
    ServiceNetworkStation: true,
    ThreeSocialLinkage: true
}

//覆盖物详情
export const OVERLAYINFOMAP_SERVICE_CUSTOMER = {
    BranchCompany: {
        name: {},
    },
    ServiceNetworkStation: {
        name: {}
    },
    ThreeSocialLinkage: {
        name: {},
    },
    Grouphall: {
        name: {},
    }
}
