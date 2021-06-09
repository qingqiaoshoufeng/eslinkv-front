<template lang="pug">
.widget-part(:style="styles")
	img.img.pointer(src="./close.svg", @click="back")
</template>
<script lang="ts">
import { widgetMixin, Editor } from '@eslinkv/vue2'
import { value } from './index.component'

export default {
	data() {
		return {
			screen: {},
			editor: Editor.Instance(),
		}
	},
	mixins: [widgetMixin],
	created(): void {
		this.configValue = this.parseConfigValue(value)
	},
	methods: {
		back(): void {
			this.editor.selectSceneIndex(this.data.sceneId)
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
