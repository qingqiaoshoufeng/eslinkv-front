export default {
  data() {
    return {
      guides: [], // 大屏绘制版参考线
      canvasZoom: 1,
      autoAlignGuide: true,
      moveStep: 5,
      vLine: [],
      hLine: [],
      vInnerLine: [],
      hInnerLine: [],
      rulerCanvasMoving: false
    }
  },
  methods: {
    handleZoomChange (zoom) {
      this.canvasZoom = zoom
      this.activatedWidgetId = null
    },
    getRefLineParams ({ vLine, hLine }) {
      this.vLine = vLine
      this.hLine = hLine
    },
    getInnerRefLineParams ({ vLine, hLine }) {
      this.vInnerLine = vLine
      this.hInnerLine = hLine
    },
    updateSpacing () {
      requestAnimationFrame(this.$refs.rulerCanvas.setSpacing)
      this.$nextTick(() => {
        this.updatePanelPosition()
      })
    }
  }
}
