<template>
	<div class="d-editor-box pos-r fn-flex">
		<widgets ref="widgets" :class="{ 'd-editor-fullscreen': platform.fullscreen }"/>
		<kanboard-editor ref="kanboardEditor" @kanboard-edited="$emit('kanboard-edited')"/>
	</div>
</template>
<script lang="ts">
	import widgets from '../../components/d-widget-list/index'
	import kanboardEditor from './kanboard-editor/index'
	import platform from '../../store/platform.store'
	import {Vue, Component, Provide} from 'vue-property-decorator'

	@Component({
		components: {
			widgets,
			kanboardEditor
		}
	})
	export default class editor extends Vue {
		platform = platform.state
		@Provide('kanboardEditor') kanboardEditor = this.$refs.kanboardEditor
	}
</script>
<style lang="scss" scoped>
	.d-editor-box {
		width: 100%;
		height: 100%;

		.d-editor-fullscreen {
			position: fixed;
		}

		/deep/ {

			.widgets-panel.fixed + .center {
				width: calc(100% - 428px) !important;
				margin-left: 428px !important;
			}
		}
	}
</style>
