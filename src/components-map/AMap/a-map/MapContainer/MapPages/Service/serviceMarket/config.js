// 覆盖物legend配置
export const SERVICE_SERVICEMARKET_LEGEND_MAP = {
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        icon: 'iconjituandating',
        component: 'Grouphall',
        isShow: true,
    },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        isShow: true,
    },
    HeatMap: {
        label: '销气热力',
        legendIcon: 'icontulixiaoqireli',
        component: 'HeatMap',
        isShow: true,
    }
}

//覆盖物详情
export const SERVICE_SERVICEMARKET_OVERLAY_MAP = {
    Grouphall: {
        fields: {
            name: {},
        },
    },

    BranchCompany: {
        fields: {
            name: {},
        },
    },
    HeatMap: {
        fields: {
            name: {},
        },
    },
}