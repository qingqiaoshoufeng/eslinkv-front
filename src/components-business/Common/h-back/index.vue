<template>
	<div class="widget-part" :style="styles" @click="back">
		<div class="h-back pointer fn-flex flex-row">
			<img src="/static/icons/back.svg"/>
			<div class="txt">返回</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

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
				window.GoldChart.scene.destroyScene(this.data.sceneId)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.h-back {
		height: 100%;
	}

	.widget-part {
		display: flex;
		align-items: center;

		> img {
			width: 23px;
			height: 23px;
			margin-right: 12px;
		}

		.txt {
			font-size: 32px;
			line-height: 32px;
			color: #FEFFFF;
		}
	}
</style>

