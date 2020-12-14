// 19厅数统计数据
let OnlineType = {
    label: '线上业务类型数量',
    DW: '',
    prop: "busi_type",
}

let TodayApplication = {
    label: '今日业务申请',
    DW: '',
    prop: "apply_nbr",
}

let TodayUnproving = {
    label: '今日待审核',
    DW: '',
    prop: "pending_nbr",
}
let TodayPass = {
    label: '今日审核通过',
    DW: '',
    prop: "accept_nbr",
}
let TodayUnPass = {
    label: '今日审核未通过',
    DW: '',
    prop: "TodayUnPass",
}
let TodayProvingTo2 = {
    label: '今日2小时审核率',
    DW: '',
    prop: "accept_2hour_rate",
}
// 19厅详情接口
let monthAccpet = {
    label: '本月已受理',
    DW: '单',
    prop: "accept_m_nbr",
    defaultVal: 0
}
let monthManage = {
    label: '本月已办结',
    DW: '单',
    prop: "finished_m_nbr",
    defaultVal: 0
}
let monthManagePercent = {
    label: '本月办结率',
    DW: '单',
    prop: "finished_m_rate",
    defaultVal: 0
}
export { OnlineType, TodayApplication, TodayUnproving, TodayPass, TodayUnPass, TodayProvingTo2, monthAccpet, monthManage, monthManagePercent }