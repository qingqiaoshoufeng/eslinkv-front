export default {
	version: '1.1.0',
	description: '最新版，持续迭代中',
	list: [
		{
			type: ['perf'],
			content: '移除部分内置组件',
		},
		{
			type: ['perf'],
			content:
				'组件事件更新优化，支持路径来源编辑，支持目标数据编辑，支持更新加工，支持多个',
		},
		{
			type: ['perf'],
			content:
				'右侧设置区，展现形式优化，增加d-right-swiper-list、s-right-swiper-eye组件，优化显示/隐藏的展现形式，优化列表的展现形式',
		},
		{
			type: ['perf'],
			content: '添加组件搜索',
		},
		{
			type: ['perf'],
			content: '优化组件数据扁平化',
		},
		{
			type: ['perf'],
			content: '场景区优化，支持拖拽改变他的所在层级，支持树形展示',
		},
		{
			type: ['perf'],
			content: 'class 单例改造',
		},
		{
			type: ['perf'],
			content: '分离npm包，@eslinkv/core @eslinkv/vue2',
		},
		{
			type: ['refactor'],
			content: '画布区抓手动作优化',
		},
		{
			type: ['refactor'],
			content:
				'删除组件优化，删除组件后将进入回收站，可对组件进行恢复，场景增加清空当前场景组件的功能',
		},
	],
}
