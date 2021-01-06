// 19厅数统计数据
let OnlineType = {
    label: '线上业务类型数量',
    DW: '',
    prop: "busi_type",
}

let TodayApplication = {
    label: '昨日业务申请',
    DW: '',
    prop: "apply_nbr",
}

let TodayUnproving = {
    label: '昨日待审核',
    DW: '',
    prop: "pending_nbr",
}
let TodayPass = {
    label: '昨日审核通过',
    DW: '',
    prop: "accept_nbr",
}
let TodayUnPass = {
    label: '昨日审核未通过',
    DW: '',
    prop: "accept_not_nbr",
}
let TodayProvingTo2 = {
    label: '昨日审核率',
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
    DW: '%',
    prop: "finished_m_rate",
    Fixed: 2,
    defaultVal: 0
}
export { OnlineType, TodayApplication, TodayUnproving, TodayPass, TodayUnPass, TodayProvingTo2, monthAccpet, monthManage, monthManagePercent }