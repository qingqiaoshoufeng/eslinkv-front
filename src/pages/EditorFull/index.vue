<template lang="pug">
.detail-container
	.preview-wrapper.fit-mode(
		ref="kanboardWrapper",
		:style="{ backgroundColor: platform.panelConfig.background.color, backgroundRepeat: platform.panelConfig.background.repeat, backgroundSize: platform.panelConfig.background.size, backgroundPosition: platform.panelConfig.background.position, backgroundImage: `url(${platform.panelConfig.background.url})` }")
		d-view(
			@mounted="updateSize",
			ref="previewContainer",
			:style="`transform: scale(${scaleX ? scaleX : actualScaleRatio},${scaleY}) translate3d(0, 0, 0); overflow: hidden;`")
		d-detail(:show="false")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
const { dView } = eslinkV
const { platform } = eslinkV.$store
import { getQueryString } from '../../utils'
import dDetail from '../../components/d-detail/index.vue'
@Component({
	components: {
		dView,
		dDetail,
	},
})
export default class full extends Vue {
	platform = platform.state
	scaleY = 1
	scaleX = 0
	actualScaleRatio = 1

	updateSize(val) {
		const w = val.width.replace(/(.*)px/, '$1')
		const h = val.height.replace(/(.*)px/, '$1')
		const { clientWidth, clientHeight } = document.body
		this.actualScaleRatio = Math.min(clientWidth / w, clientHeight / h)
	}

	mounted() {
		if (getQueryString('scale') && !isNaN(getQueryString('scale'))) {
			this.scaleY = Number(getQueryString('scale'))
		}
		if (getQueryString('scaleY') && !isNaN(getQueryString('scaleY'))) {
			this.scaleY = Number(getQueryString('scaleY'))
		}
		if (getQueryString('scaleX') && !isNaN(getQueryString('scaleX'))) {
			this.scaleX = Number(getQueryString('scaleX'))
		}
	}
}
</script>
<style lang="scss">
.detail-container {
	height: 100%;
}

.preview-wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99999;
	display: flex;
	overflow: hidden;

	&.active {
		overflow: auto;
	}

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	#kanban {
		position: relative;
		flex-grow: 0;
		flex-shrink: 0;
	}

	&.fit-mode {
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
}
</style>
