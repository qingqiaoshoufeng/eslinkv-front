export default {
	config: [
		{
			prop: 'info.id',
			label: '看板id',
			type: 'func-text-panel'
		},
		{
			prop: 'info.name',
			label: '看板名称',
			type: 'func-input-panel'
		},
		{
			prop: 'info.remark',
			label: '看板描述',
			type: 'func-textarea-panel'
		},
		{
			type: 'func-size-panel'
		},
		{
			prop: 'background.color',
			label: '背景色',
			type: 'func-color-panel'
		},
	],
	style: [
		{
			prop: 'config.layout.size.width',
			label: '宽',
			type: 'func-input'
		},
		{
			prop: 'config.layout.size.height',
			label: '高',
			type: 'func-input'
		}
	],
	base: [
		{
			prop: 'id',
			label: '组件id',
			type: 'func-text',
		},
		{
			prop: 'type',
			label: '组件类型',
			type: 'func-text',
		},
	]
}
