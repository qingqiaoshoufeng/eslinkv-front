export function debug(type, msg) {
	if (process.env.NODE_ENV !== 'production') {
		/**
		 * @description
		 *
		 * 日志打印轨迹
		 *
		 * ruler 尺
		 * component 组件
		 */
		// const key = ['ruler', 'component']
		const key = []
		if (key.indexOf(type) !== -1) {
			console.log(type, msg)
		}
	}
}
