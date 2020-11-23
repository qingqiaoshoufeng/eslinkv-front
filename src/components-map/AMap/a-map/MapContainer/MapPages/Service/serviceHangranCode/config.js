// 覆盖物legend配置
export const SERVICE_SERVICEHANGRANCODE_LEGEND_MAP = {
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
