<template></template>
<script>
import overlayMixin from '../../../../../mixins/overlayMixin.js'

export default {
  name: 'carRoute',
  mixins: [overlayMixin],
  data() {
    return {
      duration: 6, // 6秒内播放完毕
      passedPathData: [],
    }
  },
  methods: {
    init () {
      this.drawLine(this.data[0].coordinate)
    },
    drawLine(passedPathData = []) {
      if (!this.$amap) {
        return false
      }
      this.reset()
      const map = this.$amap
      // 1.已行驶路径
      const pathDataAll = [...passedPathData]
      this.pathAll = new AMap.Polyline({
        map: map,
        path: pathDataAll,
        showDir: true,
        strokeColor: 'rgba(99, 199, 255, 1)', // 线颜色
        strokeOpacity: 1,
        fillColor: 'rgba(99, 199, 255, 1)', // 线颜色
        strokeWeight: 6, // 线宽
      })
      // 2.车辆位置
      const markerPose = passedPathData[passedPathData.length - 1]
      this.marker = new AMap.Marker({
        map: map,
        position: markerPose,
        icon: require('@/assets/amap/laserCar.svg'),
        autoRotation: true,
      })
      this.instanceArr.push(this.pathAll)
      this.instanceArr.push(this.marker)
      // 3.轨迹回放
      if (passedPathData.length > 1) {
        const startAnimation = () => {
          // 计算速度
          const totalDistance = AMap.GeometryUtil.distanceOfLine(
              passedPathData,
          )
          const speed =
              totalDistance / 1000 / (this.duration / 60 / 60)
          this.marker.moveAlong(passedPathData, speed)
        }
        startAnimation()
      }
    },
    reset() {
      if (this.$amap) {
        this.passedPolyline && this.$amap.remove(this.passedPolyline)
        this.marker && this.$amap.remove(this.marker)
        this.pathAll && this.$amap.remove(this.pathAll)
      }
    },
  },
  beforeDestroy() {
    this.reset()
    this.$amap = null
  },
}
</script>

<style lang="scss">
.amap-icon {
  width: 32px !important;
  height: 16px !important;

  > img {
    width: 32px !important;
  }
}

.warnoverlay-gif {
  position: absolute;
  display: block;
  width: 100px;
  height: 35px;
  margin-top: -14px;
  margin-left: 19px;
  transform: translateX(-50%);
}
</style>
