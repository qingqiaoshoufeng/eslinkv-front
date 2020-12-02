
// 引入详情字典
import { citizenNumber, publicBuildNumber, industryNumber, businessServe } from "../../../../utils/dictionary"


// 覆盖物legend配置
export const SERVICE_SERVICECUSTOMER_LEGEND_MAP = {
    // Grouphall: {
    //     label: '集团大厅',
    //     legendIcon: 'icontulijituandating',
    //     iconSize:56,
    //     icon:'iconjituandating',
    //     component: 'Grouphall',
    //     isShow: true,
    // },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        iconSize: 56,
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        isShow: true,
    },
    ServiceNetworkStation: {
        label: '服务网点',
        legendIcon: 'icontulifuwuwangdian',
        iconSize: 38,
        icon: 'iconfuwuwangdian',
        component: 'ServiceNetworkStation',
        isShow: true,
    },
    ThreeSocialLinkage: {
        label: '三社联动',
        legendIcon: 'icontulisansheliandong',
        iconSize: 38,
        icon: 'iconsansheliandong',
        component: 'ThreeSocialLinkage',
        isShow: true,
    }
}

//覆盖物详情
export const SERVICE_SERVICECUSTOMER_OVERLAY_MAP = {
    // BranchCompany: {
    //     fields: {
    //         name: {},
    //     },
    // },
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
// 客户服务页面统计数据
export const DATASTATISTICSLIST = [citizenNumber, publicBuildNumber, industryNumber, businessServe]