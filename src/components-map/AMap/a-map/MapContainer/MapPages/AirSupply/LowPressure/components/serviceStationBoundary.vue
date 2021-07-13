<!--区域边界线-->
<script>
import overlayMixin from '../../../../../mixins/overlayMixin.js'
export default {
  name: 'serviceStationBoundary',
  props: {
    data: Object,
    active: Object,
  },
  mixins: [overlayMixin],
  data () {
    return {
      instanceArr: [],
      current: ''
    }
  },
  mounted() {
    this.$amap.on('zoomend', this.handleMapZoomChange)
  },
  watch: {
    data (val) {
      if (Object.keys(val).length === 0 || !this.visible) return
      this.drawRegionBoundary()
    },
    active: {
      immediate: true,
      deep: true,
      handler(val) {
        if (this.current) {
          const idx = this.instanceArr.findIndex(v => v.w.extData.name === this.current)
          this.$amap.remove(this.instanceArr[idx])
          this.current = ''
          this.instanceArr.splice(idx, 1)
        }
        if (this.data[val.name] && this.current !== val.name) {
          this.current = val.name
          const instance = new window.AMap.Polygon({
            path: this.data[val.name],
            map: this.$amap,
            strokeWeight: 1,
            fillOpacity: 0.5,
            fillColor: '#0054B7',
            strokeOpacity: '1',
            strokeStyle: 'dashed',
            strokeColor: '#509CE1',
            strokeDasharray: [3, 6],
            extData: {
              name: val.name,
            },
          })
          this.instanceArr.push(instance)
        }
      }
    }
  },
  methods: {
    init () {
      if (Object.keys(this.data).length === 0) return
      this.drawRegionBoundary()
    },
    drawRegionBoundary() {
      this.instanceArr = []
      const map = this.$amap
      if (!map) return false
      Object.values(this.data).forEach(station => {
        const instance = new window.AMap.Polygon({
          path: station,
          map: map,
          zIndex: 2000,
          strokeWeight: 1,
          fillOpacity: 0,
          fillColor: '#0085FF',
          strokeOpacity: 1,
          strokeStyle: 'dashed',
          strokeColor: '#FFDC45',
          strokeDasharray: [5, 2],
        })
        this.instanceArr.push(instance)
      })
    },
    handleMapZoomChange() {
      if (!this.visible) return false
      const operateName = this.$amap.getZoom() > 12 ? 'hide' : 'show'
      this.instanceArr.forEach(instance => {
        instance[operateName]()
      })
    },
  },
  render() {
    return null
  },
  beforeDestroy() {
    this.$amap.off('zoomend', this.handleMapZoomChange)
  },
}
</script>
