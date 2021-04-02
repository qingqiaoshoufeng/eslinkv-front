<template lang="pug">
.detail-container
	.preview-wrapper.fit-mode(
		ref="kanboardWrapper",
		:style="{ backgroundColor: platform.panelConfig.background.color, backgroundRepeat: platform.panelConfig.background.repeat, backgroundSize: platform.panelConfig.background.size, backgroundPosition: platform.panelConfig.background.position, backgroundImage: `url(${platform.panelConfig.background.url})` }")
		d-view(
			@mounted="updateKanboardSize",
			ref="previewContainer",
			:style="`transform: scale(${scaleX ? scaleX : actualScaleRatio},${scaleY}) translate3d(0, 0, 0); overflow: hidden;`")
		d-detail(:show="false")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { dView, dDetail, platform } from 'eslinkv-sdk'
import { getQueryString } from '../../utils'

@Component({
	components: {
		dView,
		dDetail,
	},
})
export default class full extends Vue {
	platform = platform.state
	screenSize = {
		width: 1920,
		height: 1080,
	}

	scaleY = 1
	scaleX = 0
	actualScaleRatio = 1

	updateKanboardSize(val) {
		const arr = val.split(';')
		const w = arr[0].replace(/width:(.*)px/, '$1')
		const h = arr[1].replace(/height:(.*)px/, '$1')
		const { clientWidth, clientHeight } = document.body
		this.screenSize.width = clientWidth
		this.screenSize.height = clientHeight
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
		outline: rgba(255, 255, 255, 0.2) 1px dotted;
	}

	&.fit-mode {
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
}
</style>
