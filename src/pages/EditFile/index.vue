<template lang="pug">
  .detail-container
    .preview-wrapper(ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }")
      d-view(@mounted="updateKanboardSize" ref="previewContainer" :style="`transform: scale(${scaleX?scaleX:scaleRatio},${scaleY}) translate3d(0, 0, 0); overflow: hidden;`")
      d-footer(:show="false")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import dView from 'eslinkv-npm/src/components/d-view/index.vue'
	import dFooter from 'eslinkv-npm/src/components/d-footer/index.vue'
	import { getQueryString } from '../../utils'

  @Component({
    components: {
      dView, dFooter
    }
  })
	export default class full extends Vue {
    ready = false
    fitScreen = true
    screenSize = {
      width: 1920,
      height: 1080
    }

    scaleY = 1
    scaleX = 0
    actualScaleRatio = 1

    updateKanboardSize (val) {
      const arr = val.split(';')
      const w = arr[0].replace(/width:(.*)px/, '$1')
      const h = arr[1].replace(/height:(.*)px/, '$1')
      const { clientWidth, clientHeight } = document.body
      this.screenSize.width = clientWidth
      this.screenSize.height = clientHeight
      this.actualScaleRatio = Math.min(clientWidth / w, clientHeight / h)
    }

    get scaleRatio () {
      if (!this.fitScreen) return 1
      const ratio = this.actualScaleRatio
      return ratio < 1 ? ratio : 1
    }

    mounted () {
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
	background: #0f3b69;

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
