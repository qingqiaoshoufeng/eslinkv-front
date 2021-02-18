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
	import mixins from '../../mixins'
	import {config, value} from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			handleClick() {
				window.GoldChart.scene.destroyScene(this.config.config.index)
			}
		},
		created() {
			this.configValue = this.parseConfigValue(config, value)
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

