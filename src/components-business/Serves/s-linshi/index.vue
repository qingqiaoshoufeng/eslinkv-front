<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="s-linshi pos-r">
			<img ref="img" :src="config.config && config.config.img" />
			<div
				class="s-linshi-close pos-a pointer"
				@click="handleClick"
				:style="{ right: `${config.config && config.config.left}px` }"
			></div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
const { scene } = eslinkV.$store
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	methods: {
		handleClick() {
			scene.actions.destroyScene(this.config.config.index)
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss">
.s-linshi {
	height: 100%;

	img {
		height: 100%;
	}
}

.s-linshi-close {
	top: 0;
	right: 0;
	width: 40px;
	height: 40px;
}
</style>
