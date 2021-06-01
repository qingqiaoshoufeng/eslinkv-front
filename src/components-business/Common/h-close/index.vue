<template lang="pug">
.widget-part(:style="styles")
	img.img.pointer(src="./close.svg", @click="back")
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	data() {
		return {
			screen: {},
		}
	},
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	methods: {
		back() {
			if (!this.data.sceneId) return
			this.screen.setSceneIndex(this.data.sceneId)
		},
	},
	mounted() {
		this.screen = this.$screen
	},
}
</script>
<style lang="scss" scoped>
.img {
	width: 100%;
	height: 100%;
}
</style>
