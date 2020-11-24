// 覆盖物legend配置
export const SERVICE_SERVICEHANGRANCODE_LEGEND_MAP = {
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        icon: 'iconjituandating',
        component: 'Grouphall',
        isShow: true,
        dataProp: 'grouphallList'
    },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        isShow: true,
        dataProp: 'branchCompanyList'
    },
    ServiceStation: {
        label: '综合服务站',
        legendIcon: 'icontulizonghefuwuzhan1',
        icon: 'iconzonghefuwuzhan1',
        component: 'ServiceStation',
        isShow: true,
        dataProp: 'comprehensiveServiceStationList'
    },
    CouplingHot: {
        label: '联码数量热力',
        legendIcon: 'icontulixiaoqireli',
        // icon: 'iconjituandating',
        component: 'CouplingHot',
        isShow: true,
    },
    OperationHot: {
        label: '操作数量热力',
        legendIcon: 'icontulifengongsi',
        // icon: 'iconfengongsi',
        component: 'OperationHot',
        isShow: false,
    },
}

//覆盖物详情
export const SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP = {
    OperationHot: {
        fields: {
            name: {},
        },
    },

    CouplingHot: {
        fields: {
            name: {},
        },
    },
}
