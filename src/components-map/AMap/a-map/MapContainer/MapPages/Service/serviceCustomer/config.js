// 覆盖物legend配置
export const SERVICE_SERVICECUSTOMER_LEGEND_MAP = {
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        icon: 'iconjituandating',
        component: 'Grouphall',
    },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
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

//覆盖物详情
export const SERVICE_SERVICECUSTOMER_OVERLAY_MAP = {
    BranchCompany: {
        fields: {
            name: {},
        },
    },
    ServiceNetworkStation: {
        fields: {
            name: {},
        },
    },
    ThreeSocialLinkage: {
        fields: {
            name: {},
        },
        isShowMore: true,
    },
    Grouphall: {
        fields: {
            name: {},
        },
    },
}
