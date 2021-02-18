<template lang="pug">
	.widget-part(:style="styles")
		img.img.pointer(src="./close.svg" @click="back")
</template>
<script>
	import mixins from '../../mixins'
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(config, value);
		},
		methods: {
			back() {
				if (!this.data.sceneId) return
				window.GoldChart.scene.setSceneIndex(this.data.sceneId)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.img {
		width: 100%;
		height: 100%;
	}
</style>

