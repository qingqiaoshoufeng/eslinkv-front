// 覆盖物legend配置
export const AIRSUPPLY_LNG_LEGEND_MAP = {
	LNGStation: {
		label: 'LNG站',
		legendIcon: 'icontulilNG',
		icon: 'iconlng',
		component: 'LNGStation',
		isShow: true,
	},
}

//覆盖物详情
export const AIRSUPPLY_LNG_OVERLAY_MAP = {
	LNGStation: {
		fields: {
			name: {},
		},
	},
	WARN: {
		fields: {
			content: {
				style: {
					fontSize: '24px',
				},
			},
			address: {
				style: {
					fontSize: '18px',
					color: '#00DDFF',
				},
				errColor: '#FF7217',
			},
		},
		isShowMore: true,
	},
	WARNEVENT: {
		fields: {
			content: {
				style: {
					fontSize: '24px',
				},
			},
			address: {
				style: {
					fontSize: '18px',
					color: '#00DDFF',
				},
				errColor: '#FF7217',
			},
		},
		isShowMore: true,
	},
}
