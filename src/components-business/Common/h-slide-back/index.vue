<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-slide-bg-back pointer" @click="handleClick"></div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
const { scene } = eslinkV.$store
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
.h-slide-bg-back {
	width: 24px;
	height: 112px;
	background-image: url('./img/back.svg');
}
</style>
