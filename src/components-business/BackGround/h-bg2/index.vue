<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-bg2" @click="handleClick">
		</div>
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
	.h-bg2 {
		background-color: rgba(0, 0, 0, 0);
		width: 3500px;
		height: 1050px;
	}

</style>

