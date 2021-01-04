<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-bg2" @click="handleClick">
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		},
		methods: {
			handleClick() {
				if (this.data.sceneId)
					window.GoldChart.scene.destroyScene(this.data.sceneId)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.h-bg2 {
		background-color: rgba(0, 0, 0, 0);
		width: 3500px;
		height: 1050px;
	}

</style>

