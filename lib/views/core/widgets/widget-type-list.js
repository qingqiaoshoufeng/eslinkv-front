
/**
 * @description 缺少diy的label
 */
const types = [].reduce((result, next) => {
	const {type, label, widgets} = next
	if (widgets) {
		widgets.forEach(({type, label}) => {
			if (result[type]) return
			result[type] = label
		})
	} else {
		result[type] = label
	}
	return result
}, {})

export default types
