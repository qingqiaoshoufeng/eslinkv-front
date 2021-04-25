<template lang="pug">
.widget-part(:style="styles")
	img.img.pointer(src="./close.svg", @click="back")
</template>
<script>
const { widgetMixin, scene } = eslinkV
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	methods: {
		back() {
			if (!this.data.sceneId) return
			scene.actions.setSceneIndex(this.data.sceneId)
		},
	},
}
</script>
<style lang="scss" scoped>
.img {
	width: 100%;
	height: 100%;
}
</style>
