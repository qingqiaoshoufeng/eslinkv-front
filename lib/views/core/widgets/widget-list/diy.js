const diy = (widgets = []) => {
	return {
		label: '自定义',
		name: 'diy',
		widgets: [
			...widgets,
			{
				type: 'combination',
				label: '组合小工具',
				widgets: [
					{
						type: 'combination',
						label: '组合小工具',
						config: {
							layout: {
								size: {
									width: 400,
									height: 360
								},
								position: {
									value: 'relative'
								}
							}
						}
					},
				]
			}
		]
	}
}

export default diy
