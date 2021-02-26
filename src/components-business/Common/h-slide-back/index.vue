<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-slide-bg-back pointer" @click="handleClick"></div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import {value} from './index.component'
	import scene from 'eslinkv-npm/src/store/scene.store'

	export default {
		mixins: [mixins],
		created() {

			this.configValue = this.parseConfigValue(value)
		},
		methods: {
			handleClick() {
				if (this.data.sceneId)
					scene.actions.destroyScene(this.data.sceneId)
			}
		}
	}
</script>
<style lang="scss" scoped>

	.h-slide-bg-back {
		background-image: url('./img/back.svg');
		width: 24px;
		height: 112px;
	}
</style>

