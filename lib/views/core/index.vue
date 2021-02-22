<template>
	<div class="step kanboard-editer-box pos-r fn-flex">
		<widgets ref="widgets" :class="{ 'canvas-fullscreen': isFullscreen }"/>
		<kanboard-editor ref="kanboardEditor" @fullscreenchange="handleFullscreenChange"
						 @kanboard-edited="$emit('kanboard-edited')"/>
	</div>
</template>
<script>
	import widgets from '../../components/d-widget-list/index'
	import kanboardEditor from './kanboard-editor/index'

	export default {
		name: 'edit-kanboard',
		provide() {
			return {kanboardEditor: this.$refs.kanboardEditor}
		},
		components: {
			widgets,
			kanboardEditor
		},
		data() {
			return {
				isFullscreen: false,
			}
		},
		methods: {
			refillConfig(config) {
				if (this.$refs.kanboardEditor) return this.$refs.kanboardEditor.refillConfig(config)
			},
			handleFullscreenChange(status) {
				this.isFullscreen = status
			},
			setContentPosition(left = 0, top = 0) {
				this.$refs.kanboardEditor.setContentPosition(left, top)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.kanboard-editer-box {
		width: 100%;
		height: 100%;

		/deep/ {
			.canvas-fullscreen {
				position: fixed;
			}

			.widgets-panel.fixed + .center {
				width: calc(100% - 428px) !important;
				margin-left: 428px !important;
			}
		}
	}
</style>
