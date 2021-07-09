<template>
  <div>
    <div v-for="(k, i) in data" :key="i">
      <AMapMarker
          :visible="visible"
          :offset="config.offset"
          :position="JSON.parse(JSON.stringify(k.coordinate[0]))"
          :vid="k.carPlateNo"
          ref="marker"
          :autoRotation="true"
          :routeData="JSON.parse(JSON.stringify(k.coordinate))"
      >
        <div :class="['sample', active ? 'active' : '']">
          <img :src="config.carImg" @click="handleMakerClick(k, i)">
        </div>
      </AMapMarker>
      <AMapPolyline
          :visible="visible"
          :path="JSON.parse(JSON.stringify(k.coordinate))"
          :showDir="true"
          v-bind="config.lineConfig"
      ></AMapPolyline>
    </div>
    <OverlayDetail
        v-model="detailShow"
        v-bind="{
	          beforeClose: closeOverlayDetail,
          }"
        :data="detailPosition"
        ref="OverlayDetail"
        :width="240"
    >
      <div class="laser">
        <h4>{{ config.name }}</h4>
        <div class="laser-body">
          <div class="laser-body-num">{{ current.carPlateNo }}</div>
          <img class="laser-body-logo" @click="play" src="../../../../../../../../assets/amap/routePlay.svg">
        </div>
      </div>
    </OverlayDetail>
  </div>
</template>
<script>
import { AMapMarker, AMapPolyline } from '../../../../../lib'
import { OverlayDetail } from '../../../../../components/index'

export default {
  name: 'laserCarRoute',
  props: {
    data: {
      type: Array,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    overlayType: {
      type: String
    },
  },
  components: { AMapMarker, AMapPolyline, OverlayDetail },
  data() {
    return {
      current: { coordinate: [] },
      currentIndex: 0
    }
  },
  computed: {
    detailShow () {
      return !!this.current.carPlateNo
    },
    detailPosition () {
      if (!this.current.coordinate.length) return {}
      const res = this.current.coordinate[this.current.coordinate.length - 1]
      return res
    },
    config () {
      if (this.overlayType === 'LaserCar') {
        return {
          name: '激光巡检车',
          carImg: require('@/assets/amap/laserCar.svg'),
          offset: [-43.5, -47],
          lineConfig: {
            strokeColor: 'rgba(190, 189, 255, 1)',
            strokeOpacity: 1,
            fillColor: "rgba(190, 189, 255, 1)",
            strokeWeight: 6
          }
        }
      } else {
        return {
          name: '抢修指挥车',
          carImg: require('@/assets/amap/commandCar.svg'),
          offset: [-38, -26.5],
          lineConfig: {
            strokeColor: 'rgba(243, 255, 99, 1)', // 线颜色
            strokeOpacity: 1,
            fillColor: 'rgba(243, 255, 99, 1)', // 线颜色
            strokeWeight: 6, // 线宽
          }
        }
      }
    }
  },
  methods: {
    handleMakerClick (marker, i) {
      this.current = marker
      this.currentIndex = i
    },
    closeOverlayDetail () {
      this.current = { coordinate: [] }
    },
    play () {
      this.current = { coordinate: [] }
      this.$refs.marker[this.currentIndex].startRouteAnimation()
    }
  }
}
</script>

<style lang="scss" scoped>
.laser {
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    color: #FFDC45;
  }
  .laser-body {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .laser-body-num {
      width: 98px;
      height: 32px;
      background: #0057A9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #FFFFFF;
    }
    .laser-body-logo {
      width: 33px;
      height: 33px;
    }
  }
}
</style>
