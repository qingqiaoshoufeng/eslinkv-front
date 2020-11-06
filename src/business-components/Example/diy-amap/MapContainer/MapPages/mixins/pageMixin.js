export default {
	props: {
		legendMap: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	created() {
		this.map = this.$parent.$amap
	},
}
