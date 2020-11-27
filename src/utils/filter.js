export const toThousand = value => {
	if (!value) {
		return ''
	} else {
		return Number(Math.ceil(value)).toLocaleString()
	}
}
