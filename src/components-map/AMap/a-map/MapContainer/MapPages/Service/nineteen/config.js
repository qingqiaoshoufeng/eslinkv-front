
// 引入详情字典
import { OnlineType, TodayApplication, TodayUnproving, TodayPass, TodayProvingTo2, monthAccpet, monthManage, monthManagePercent } from "./dictionary"
// 覆盖物legend配置
export const SERVICE_SERVICENINETEEN_LEGEND_MAP = {
    BranchCompany: {
        label: '子公司',
        legendIcon: 'icontulifengongsi',
        iconSize: 56,
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        visible: true,
        dataProp: 'branchCompanyList',
        detailList: [monthAccpet, monthManage, monthManagePercent]
    },
}

//覆盖物详情
export const SERVICE_SERVICENINETEEN_OVERLAY_MAP = {
    BranchCompany: {
        fields: {
            name: {},
        },
    },
}

// 19厅统计数据
export const DATASTATISTICSLIST = [OnlineType, TodayApplication, TodayUnproving, TodayPass, TodayProvingTo2]