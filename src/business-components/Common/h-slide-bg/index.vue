<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;}`">
		<div class="h-slide-bg pos-r">
			<div class="h-slide-bg-back pos-a pointer" @click="handleClick"></div>
		</div>
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
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		},
		methods: {
			handleClick() {
				if (this.data.sceneId)
					GoldChart.scene.destroyScene(this.data.sceneId)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.h-slide-bg {
		width: 100%;
		height: 1050px;
		background: rgba(11, 0, 90, 0.9);
		border-left: 1px solid #00DDFF;
	}

	.h-slide-bg-back {
		background-image: url('./img/back.svg');
		width: 24px;
		height: 112px;
		left: 0;
		top: 50%;
		margin-top: -56px;
	}
</style>

