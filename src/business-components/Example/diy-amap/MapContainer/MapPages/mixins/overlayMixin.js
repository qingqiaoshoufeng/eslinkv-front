export default {
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
	},
	watch: {
		visible(val) {
			console.log(val, 'val')
			if (val) {
				this.instance.show()
			} else {
				this.instance.hide()
			}
		},
	},
	beforeDestroy() {
		this.instance.setMap(null)
		this.instance = null
	},
}
