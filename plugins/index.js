export function debug(type, msg) {
	if (process.env.NODE_ENV !== 'production') {
		/**
		 * @description
		 *
		 * ruler 尺
		 */
		// const key = ['ruler', 'component']
		const key = []
		if (key.indexOf(type) !== -1) {
			console.log(type, msg)
		}
	}
}
