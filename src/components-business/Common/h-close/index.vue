<template>
	<div class="widget-part" :style="styles">
		<img src="./close.svg" @click="back" class="img pointer"/>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart from '../../../openApi'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				sceneId: ''
			})
		}
	}

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
		methods: {
			back() {
				if (!this.data.sceneId) return
				GoldChart.scene.setSceneIndex(this.data.sceneId)
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

