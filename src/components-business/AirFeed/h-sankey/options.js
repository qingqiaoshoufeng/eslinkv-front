const colors = ['#4A7CDE', '#2CA0C5', '#28A486', '#2A4CC3', '#6A49F0', '#2BAEC0', '#32F6B0', '#3A5ACC', '#0057FF']

export default function getOption (links) {
	const list = []
	let linkMark = ''
	let colorIndex = -1
	links.forEach(v => {
		if (linkMark !== v.source) {
			linkMark = v.source
			colorIndex++
			list.push({
				name: v.source,
				value: v.sourceValue,
				itemStyle: {
					color: colors[colorIndex]
				}
			})
		} else {
			list.push({
				name: v.target,
				value: v.value,
				itemStyle: {
					color: colors[colorIndex]
				}
			})
		}
		v.lineStyle = {
			opacity: 0.4,
			color: colors[colorIndex]
		}
	})
    return {
        series: {
            type: 'sankey',
            layout: 'none',
            focusNodeAdjacency: 'allEdges',
            itemStyle: {
                borderWidth: 0
            },
            label: {
                formatter: '{b}: {c}',
                color: '#ffffff',
                fontSize: 18
            },
            data: list,
            links: links
        }
    }
}
