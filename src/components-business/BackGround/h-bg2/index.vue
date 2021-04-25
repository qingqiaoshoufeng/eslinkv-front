<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-bg2" @click="handleClick"></div>
	</div>
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
		handleClick() {
			if (this.data.sceneId) {
				scene.actions.destroyScene(this.data.sceneId)
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
