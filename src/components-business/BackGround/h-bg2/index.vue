<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-bg2" @click="handleClick"></div>
	</div>
</template>
<script lang="ts">
import { widgetMixin } from '@eslinkv/vue2'
import { Editor } from '@eslinkv/core'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	created(): void {
		this.configValue = this.parseConfigValue(value)
	},
	methods: {
		handleClick(): void {
			if (this.data.sceneId) {
				this.editor.closeScene(this.data.sceneId)
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.h-bg2 {
	width: 3500px;
	height: 1050px;
	background-color: rgba(0, 0, 0, 0);
}
</style>
