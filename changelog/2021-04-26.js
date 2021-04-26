export default {
	version: '1.0.3',
	description: '最新版，持续迭代中',
	list: [
		{
			type: ['fix'],
			content: '标尺不显示bug修复',
		},
		{
			type: ['perf'],
			content:
				'大屏组件区、大屏功能区、大屏画布区、大屏设置区、大屏场景区UI美化',
		},
		{
			type: ['refactor'],
			content: '添加密钥管理，完善密钥管理文档及组件市场开发文档',
		},
		{
			type: ['refactor'],
			content: '组件库代码优化及UI优化',
		},
		{
			type: ['refactor'],
			content: '标尺参考线代码优化及UI优化',
		},
		{
			type: ['refactor'],
			content: '组件区，场景区，设置区可设置显隐',
		},
		{
			type: ['refactor'],
			content: '添加主题配置区',
		},
		{
			type: ['refactor'],
			content: '添加适配模式，目前三种可选，100%宽，100%高，充满屏幕',
		},
		{
			type: [''],
			content: '移除简化 createSandbox 方法',
		},
		{
			type: ['refactor'],
			content: '设置区增加伸缩功能',
		},
		{
			type: ['perf'],
			content: '组件增加单组件精准报错提示',
		},
		{
			type: ['fix'],
			content: '修复画布区小于100%拖拽时，会有残影',
		},
		{
			type: ['fix'],
			content: '画布区组件快速拖拽会有卡顿',
		},
		{
			type: ['fix'],
			content: 'ts 报错优化',
		},
		{
			type: ['perf'],
			content: '移除拖动时的对比参考线，拖动更流畅',
		},
		{
			type: ['perf'],
			content: '添加回车登录功能',
		},
		{
			type: ['fix'],
			content: '修复数据方式切换时，接口不通情况下，json也发生改变',
		},
		{
			type: ['perf'],
			content: '开放自定义上传组件缩略图',
		},
		{
			type: ['perf'],
			content: '预加载组件市场组件，场景过度时更加流畅',
		},
		{
			type: ['perf'],
			content:
				'拖动组件改为translate3d，开启硬件加速，并且可以在整个画布区内拖拽，可溢出，原先不可溢出',
		},
		{
			type: ['perf'],
			content: '动画优化，动画选项优化增加中文提示',
		},
		{
			content: '移除style-parser',
		},
		{
			type: ['perf'],
			content: '添加私有化部署文档',
		},
		{
			type: ['fix'],
			content: '修复实例化场景中无法加载组件市场组件',
		},
		{
			type: ['perf'],
			content: '添加导入导出文档，添加介绍文档',
		},
		{
			type: ['perf'],
			content: '文档，添加目录功能',
		},
		{
			type: ['perf'],
			content:
				'添加分享功能，大屏可以分享，并且可以权限控制：不限制，密码限制，时效限制',
		},
		{
			type: ['perf'],
			content: '分离配置，大屏预览所必须参数，及大屏编辑器所必须参数',
		},
		{
			type: ['perf'],
			content: '添加socket支持，用于满足终端交互',
		},
		{
			type: ['perf'],
			content: '添加事件机制，可在设置区编辑',
		},
		{
			type: ['perf'],
			content: 'sdk 安全防盗优化改造',
		},
		{
			type: ['fix'],
			content: '新建大屏页面，新建参考线，无法保存，且会报错',
		},
	],
}
