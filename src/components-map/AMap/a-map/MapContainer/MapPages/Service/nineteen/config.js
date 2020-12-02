
// 引入详情字典
import { OnlineType, TodayApplication, TodayUnproving, TodayPass, TodayProvingTo2, monthAccpet, monthManage, monthManagePercent } from "../../../../utils/dictionary"
// 覆盖物legend配置
export const SERVICE_SERVICENINETEEN_LEGEND_MAP = {
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
        isShow: true,
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