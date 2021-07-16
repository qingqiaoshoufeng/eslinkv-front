调压站
<template>
	<BaseOverlay2
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			data: dataInner,
		}"
		@click="handleClick"
	/>
</template>
<script>
import BaseOverlay2 from '../../../../components/BaseOverlay2'
import { getPressureRegulatingStationList } from '@/components-map-api/map.mock.api'
import { getStationRealTimeInfo, getStationSwitchState } from '@/components-map-api/map.airSupply.api'

export default {
	name: 'PressurereGulatingStation',
	components: {
    BaseOverlay2,
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
		overlayIcon: {
			type: String,
			default: '',
		},
		overlayType: {
			type: String,
			default: '',
		},
		data: {
			type: Array,
		},
		detailList: {
			type: Array,
			default() {
				return []
			},
		},
	},
	data() {
		return {
			apiFun: getPressureRegulatingStationList,
			propDwMap: {
				flow: 'm³/h',
				inPressure: 'MPa',
				inTemp: '℃',
				outPressure: 'MPa',
				outTemp: '℃',
				todayAirFeed: 'm³',
			},
      dataInner: [],
      switchStateTimer: null,
    }
	},
  watch: {
	  data: {
	    deep: true,
      immediate: true,
      async handler (val) {
        clearInterval(this.switchStateTimer)
        await this.getStationSwitchState()
        this.switchStateTimer = setInterval(() => {
          this.getStationSwitchState()
        }, 10000)
      }
    }
  },
	methods: {
    async getStationSwitchState () {
      const stationPoseMap = {
        临平调压站: 'right',
        半山调压站: 'right',
        '320阀室': 'top',
        良渚调压站: 'top',
        西部应急气源站: 'left',
        东部应急气源站: 'top',
        西部应急气源站: 'left',
        苏嘉路阀室: 'right',
        之江调压站: 'right',
      }
      const res = await getStationSwitchState()
      const req = JSON.parse(JSON.stringify(this.data))
      this.dataInner = req.map(item => {
        item.pose = stationPoseMap[item.name]
        item.icon = res[item.name] ? 'icontulitiaoyazhan' : 'icontiaoyazhan1'
        return item
      })
    },
		async handleClick(marker) {
			if (!marker.detail) {
				const { id = '', name = '', type = '' } = marker
				let data = {}
				const dataComp = {}
				try {
					data = await getStationRealTimeInfo({
						id,
						name,
						type,
					})
				} catch (error) {
					console.log(error, '接口出错')
				}
				Object.keys(data).forEach(prop => {
					const dw = this.propDwMap[prop]
					if (typeof data[prop] !== 'object') {
						return false
					}
					data[prop].forEach((item, index) => {
						const { name, value } = item
						const propInner = prop + index
						dataComp[propInner] = {
							label: name,
							value: value, // .toFixed(2),
							dw,
						}
					})
				})
				marker.detail = dataComp
			}
			this.$emit(
				'overlay-click',
				marker,
				'PressureRegulatingStation',
				false,
			)
		},
	},
  beforeDestroy () {
    clearInterval(this.switchStateTimer)
    this.switchStateTimer = null
  }
}
</script>
