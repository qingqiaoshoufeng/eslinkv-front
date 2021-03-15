调压站
<template>
	<BaseOverlay
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
	import { BaseOverlay } from '../../../../components/index'
	export default {
		name: 'PressurereGulatingStation',
		components: {
			BaseOverlay
		},
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			overlayIcon: {
				type: String,
				default: ''
			},
			overlayType: {
				type: String,
				default: ''
			},
			data: {
				type: Array
			},
			detailList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			const apiFun = this.$sysApi.map.mock.getPressureRegulatingStationList
			return {
				apiFun: apiFun,
				propDwMap: {
					flow: 'm³/h',
					inPressure: 'MPa',
					inTemp: '℃',
					outPressure: 'MPa',
					outTemp: '℃',
					todayAirFeed: 'm³'
				},
				mouseIn: false
			}
		},
		computed: {
			dataInner () {
				const { data = [] } = this
				const stationPoseMap = {
					临平调压站: 'right',
					半山调压站: 'right',
					'320阀室': 'top',
					良渚调压站: 'top',
					西部应急气源站: 'left',
					东部应急气源站: 'top',
					西部应急气源站: 'left',
					苏嘉路阀室: 'right',
					之江调压站: 'right'
				}
				return this.data.map((item) => {
					item.pose = stationPoseMap[item.name]
					return item
				})
			}
		},
		methods: {
			async handleClick (marker) {
				if (!marker.detail) {
					const { id = '', name = '', type = '' } = marker
					let data = {}
					const dataComp = {}
					try {
						data = await this.$sysApi.map.airSupply.getStationRealTimeInfo(
							{
								id,
								name,
								type
							}
						)
					} catch (error) {
						console.log(error, '接口出错')
					}
					Object.keys(data).forEach((prop) => {
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
								dw
							}
						})
					})
					marker.detail = dataComp
				}
				this.$emit(
					'overlay-click',
					marker,
					'PressureRegulatingStation',
					false
				)
			}
		}
	}
</script>
