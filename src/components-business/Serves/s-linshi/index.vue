<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="s-linshi pos-r">
			<img ref="img" :src="config.config&&config.config.img"/>
			<div class="s-linshi-close pos-a pointer" @click="handleClick"
				 :style="{right:`${config.config&&config.config.left}px`}"></div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import {customConfig, value} from './index.component'
	import scene from 'eslink-npm/src/store/scene.store'

	export default {
		mixins: [mixins],
		methods: {
			handleClick() {
				scene.actions.destroyScene(this.config.config.index)
			}
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
		right: 0;
		top: 0;
		width: 40px;
		height: 40px;
	}
</style>

