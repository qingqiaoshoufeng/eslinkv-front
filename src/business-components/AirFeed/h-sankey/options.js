const colors = ['#4A7CDE', '#2CA0C5', '#28A486', '#2A4CC3', '#6A49F0', '#2BAEC0', '#32F6B0', '#3A5ACC', '#0057FF']

export default {
	series: {
		type: 'sankey',
		layout: 'none',
		focusNodeAdjacency: 'allEdges',
		itemStyle: {
			borderWidth: 0,
		},
		label: {
			formatter: '{b}: {c}',
			color: '#ffffff',
			fontSize: 18
		},
		data: [
			{
				name: 'a',
				value: 100,
				itemStyle: {
					color: '#00ff00'
				}
			}, {
				name: 'a1',
				value: 40
			}, {
				name: 'a2',
				value: 30
			}, {
				name: 'a3',
				value: 30
			}, {
				name: 'b',
				value: 40
			}, {
				name: 'b1',
				value: 20
			}, {
				name: 'b2',
				value: 20
			}, {
				name: 'c',
				value: 20
			}, {
				name: 'c1',
				value: 8
			}, {
				name: 'c2',
				value: 2
			}, {
				name: 'c3',
				value: 2
			}, {
				name: 'c4',
				value: 2
			}, {
				name: 'c5',
				value: 2
			}, {
				name: 'c6',
				value: 2
			}, {
				name: 'c7',
				value: 2
			}],
		links: [{
			source: 'a',
			target: 'a1',
			value: 40,
			lineStyle: {
				opacity: 0.4,
				color: '#4A7CDE'
			}
		}, {
			source: 'a',
			target: 'a2',
			value: 30
		}, {
			source: 'a',
			target: 'a3',
			value: 30
		}, {
			source: 'b',
			target: 'b1',
			value: 20
		}, {
			source: 'b',
			target: 'b2',
			value: 20
		}, {
			source: 'c',
			target: 'c1',
			value: 8
		}, {
			source: 'c',
			target: 'c2',
			value: 2
		}, {
			source: 'c',
			target: 'c3',
			value: 2
		}, {
			source: 'c',
			target: 'c4',
			value: 2
		}, {
			source: 'c',
			target: 'c5',
			value: 2
		}, {
			source: 'c',
			target: 'c6',
			value: 2
		}, {
			source: 'c',
			target: 'c7',
			value: 2
		}]
	}
};
