const config = {
    animation: true
};
const value = {
    layout: {
        size: {
            width: 326,
            height: 720
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            list: [
                {
                    name: '小和山绿色能源体验中心',
                    detail: '绿色能源体验中心是一个集合知识、趣味、互动、休闲等多个元素的综合性体验点。 它以“绿色能源·国际杭州”为基调，充分诠释“城市的绿色客厅、行业的文化高地、员工的灵魂空间”核心理念，推动“城市国际化、能源绿色化”发展。'
                },
                {
                    name: '天目山路燃气优家旗舰店',
                    detail: `杭燃优家客户中心旗舰店是营业厅中的体验互动中心。“让家庭更温暖、让家庭更美味、让家庭更幸福、让城市更绿色”，旗舰店展示各类杭燃优家产品，并有智能机器人“苒苒”为您解答各类燃气业务相关问题。`
                },
                {
                    name: '应急指挥中心',
                    detail: `应急指挥中心是集团公司生产运行信息中枢和总指挥部。了解城市燃气管网运行，应急处置的“大脑”。`
                }
            ]
        })
    }
}
export {value, config}