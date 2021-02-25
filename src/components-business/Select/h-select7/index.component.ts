export const value = {
	api: {
		data: JSON.stringify([
			{"label": "罗茨表", "value": "metertype_01"},
			{"label": "涡轮表", "value": "metertype_02"},
			{"label": "皮膜表", "value": "metertype_03"},
			{"label": "腰轮表", "value": "metertype_04"},
			{"label": "超声波表", "value": "metertype_05"},
			{"label": "远传表", "value": "metertype_06"},
			{"label": "靶式表", "value": "metertype_07"},
		]),
		bind: {
			enable: true,
			role: ['provider']
		}
	},
	layout: {
		size: {
			width: 90,
			height: 24
		},
		position: {
			value: 'relative'
		}
	}
}
