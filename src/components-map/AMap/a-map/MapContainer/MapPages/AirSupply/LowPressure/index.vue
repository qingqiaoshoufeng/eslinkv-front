<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 报警点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
			:width="
				activeWarnData.overlayType === 'VoltageRegulator' ? 700 : 400
			"
			ref="WarnEvent"
		>
			<VoltageRegulator
				:data="activeWarnData"
				v-if="activeWarnData.overlayType === 'VoltageRegulator'"
			></VoltageRegulator>
		</WarnEvent>
		<!-- 特殊 中低压管网需要legend控制显隐 -->
		<AMapTile
			ref="mapTile"
			:visible="!!tilesQuery.length && !showRoutePlan"
			:getTileUrl="getTileUrl"
		/>
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				v-if="stationDataMap[config.dataProp]"
				:activeItem="activeOverlayMap[legend] || undefined"
				:ref="legend"
				:is="config.component"
				:visible="config.visible"
				:overlayIcon="config.legendIcon"
				:overlayWarmIcon="config.overlayWarmIcon"
				:overlayType="config.component"
				:iconSize="config.iconSize"
        @moveto="handlerMoveto"
        :showOverlayName="config.showOverlayName"
				:data="stationDataMap[config.dataProp]"
				@overlay-click="handleOverlayClick"
				@close="closeOverlayDetail('', false)"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				beforeClose: closeOverlayDetail,
				...OverlayDetailProp,
			}"
			ref="OverlayDetail"
			:width="activeOverlay.type === 'VoltageRegulator' ? 700 : 400"
		>
			<VoltageRegulator
				:data="activeOverlay"
				v-if="activeOverlay.type === 'VoltageRegulator'"
			></VoltageRegulator>
		</OverlayDetail>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsConfigMap"
				:data="dataStatisticsData"
			/>
			<!-- 图例 -->
			<MapLegend
				v-if="!showRoutePlan"
				:data="legendMap"
				class="map-legend"
			/>
			<!-- 右侧列表 -->
			<RightPanel
				class="right-panel"
				@overlay-click="handleListClick"
				v-bind="{
					stationList,
					rightListActiveItemMap,
					markerConfig: legendMap,
				}"
				ref="RightPanel1"
			></RightPanel>
		</portal>
    <serviceStationBoundary :data="serviceStationBoundaryData" :active="activeOverlay" :visible="legendMap.ServiceStation.visible"></serviceStationBoundary>
    <serviceStationBoundary :data="pipeManageMentStationList" :active="activeOverlay" :visible="legendMap.PipeManageMentStation.visible"></serviceStationBoundary>
	</div>
</template>
<script>
import { AMapTile } from '../../../../lib'
import VoltageRegulator from './components/VoltageRegulator'
import serviceStationBoundary from './components/serviceStationBoundary'
import MapMarkerIcon from '@/components-map/AMap/a-map/components/MapMarkerIcon.vue'
// 页面所需公共组件
import { OverlayDetail, MapLegend } from '../../../../components/index.js'
import { DataStatistics } from '../../../../components'
import laserCarRoute from '../Components/RoutePlan/laserCarRoute'
import commandCarRoute from '../Components/RoutePlan/commandCarRoute'

import {
	DATASTATISTICSLIST,
	AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
	AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
} from './config.js'
import getHangZhouGasGISPosition from '../../../../utils/getHangZhouGasGISPosition'
import {
	getAllTypeStationList,
	getStationAreaRange,
	getStatisticsInfo,
} from '@/components-map-api/map.airSupply.api'
const componentPageArr = [
	// legend覆盖物
	'ServiceStation',
	'PipeManageMentStation',
	'UndergroundRepairStation',
	'OngroundRepairStation',
	'InspectionPerson',
	'InspectionCar',
  'WarningStations',
  // 报警点位
	'WarnEvent',
	// 右侧报警列表
	'RightPanel',
	'WarningStations',
]
// 页面所需公共组件
const componentCommonArr = ['DataStatistics', 'OverlayDetail', 'MapLegend']
// 异步加载组件函数
const componentPageMap = {}
const componentCommonMap = {}
componentPageArr.map(componentName => {
	componentPageMap[componentName] = () =>
		import(/* webpackInclude:/\.(vue)$/ */ '../Components/' + componentName)
})
componentCommonArr.map(componentName => {
	componentCommonMap[componentName] = () =>
		import(
			/* webpackInclude:/\.(vue)$/ */ '../../../../components/' +
				componentName
		)
})

export default {
	name: 'LowPressure',
	components: {
		MapMarkerIcon,
		VoltageRegulator,
    serviceStationBoundary,
		AMapTile,
    laserCarRoute,
    commandCarRoute,
		...componentPageMap,
		...componentCommonMap,
	},
	created() {
		this.$amap = this.$parent.$amap
		this.$amap.setZoom(this.zoom, 100)
		this.$amap.setCenter(this.center, 100)
	},
	mounted() {
		this.getAllTypeStationList()
		this.getDataStatisticsInfo()
		this.getStationAreaRange()
	},
	data() {
		return {
			overlayInfoConfigMap: Object.freeze(
				AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
			),
			activeOverlay: {},
			activeWarnData: {},
      serviceStationBoundaryData: {},
      pipeManageMentStationList: {},
			center: [120.151562, 30.293297],
			zoom: 12.5,
			showOverlayDetail: false,
			showRoutePlan: false,
			legendMap: AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
			overlayMap: AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
			dataStatisticsConfigMap: DATASTATISTICSLIST,
			dataStatisticsData: {},
			stationDataMap: {},
			dataReady: false,
			stationList: [],
			activeStationData: {},
		}
	},
	computed: {
		tilesQuery() {
			const {
				MiddlePressureLine,
				LowPressureLine,
				PressureRegulatingStation,
			} = this.legendMap
			const {
				visible: visibleM,
				tileQuery: tileQueryM,
			} = MiddlePressureLine
			const { visible: visibleL, tileQuery: tileQueryL } = LowPressureLine
			const {
				visible: visibleP,
				tileQuery: tileQueryP,
			} = PressureRegulatingStation
			const queryArr = []
			if (visibleM) {
				queryArr.push(tileQueryM)
			}
			if (visibleL) {
				queryArr.push(tileQueryL)
			}
			if (visibleP) {
				queryArr.push(tileQueryP)
			}
			// 条件变化刷新地图
			if (queryArr.length && this.$refs.mapTile) {
				this.$refs.mapTile.reload()
			}
			return queryArr
		},
		// 点击右侧点位列表，从overlay组件内部触发click事件
		activeOverlayMap() {
			const { activeStationData } = this
			if (JSON.stringify(activeStationData) === '{}') {
				return {}
			} else {
				const { overlayType } = activeStationData
				return {
					[overlayType]: activeStationData,
				}
			}
		},
    handlerMoveto({ type }) {
      if (type === 'WarningStations') {
        this.$amap.panTo([120.131259, 30.363295], 100)
        this.closeOverlayDetail('', false)
      }
    },
		OverlayDetailProp() {
			const { activeOverlay, overlayInfoConfigMap, legendMap } = this
			if (JSON.stringify(activeOverlay) !== '{}') {
				const { overlayType } = activeOverlay
				// 详情展示信息配置
				const overlayDetailConfig =
					overlayInfoConfigMap[overlayType] || {}
				const legendConfig = legendMap[overlayType] || {}
				// 图标大小，是否显示关闭按钮，是否显示查看详情
				const {
					iconSize = 38,
					showPopCloseBtn: showCloseBtn,
					showMore,
				} = legendConfig
				return {
					data: activeOverlay,
					iconSize,
					showCloseBtn,
					overlayDetailConfig,
					showMore,
				}
			}
		},
		rightListActiveItemMap() {
			const { activeWarnData, activeStationData } = this
			return {
				processWarning: activeWarnData,
				eventWarning: activeWarnData,
				overlayList: activeStationData,
			}
		},
	},
	methods: {
	  async getStationAreaRange () {
      const res = await getStationAreaRange({
        type: 'PipeManageMentStation,ServiceStation'
      })
      this.serviceStationBoundaryData = res.serviceStationList
      this.pipeManageMentStationList = res.pipeManageMentStationList
    },
		// 获取所有站点数据
		async getAllTypeStationList() {
			const params = {
				types: [
					'ServiceStation', // '综合服务站',
					'PipeManageMentStation', // '管网运行管理站',
					'UndergroundRepairStation', // '地下抢修点',
					'OngroundRepairStation', // '地上抢修点',
					'VoltageRegulator', // '调压器',
          'MiddleAndLowPressureValve', // 中低压阀门
          'CommandCar', // '抢修指挥车',
					'LaserCar', // '激光巡检车',
				].toString(),
			}
			const res = await getAllTypeStationList(params)
			let {
				serviceStationList,
				pipeManageMentStationList,
				undergroundRepairStationList,
				ongroundRepairStationList,
				voltageRegulatorList,
			} = res
			// 数据为防止重叠特殊处理---开始
			pipeManageMentStationList = pipeManageMentStationList.map(item => {
				const { lat } = item
				return {
					...item,
					lat: lat + 0.003,
				}
			})
			ongroundRepairStationList = ongroundRepairStationList.map(item => {
				const { lat } = item
				return {
					...item,
					lat: lat - 0.003,
				}
			})
			// 数据为防止重叠特殊处理---结束
			this.stationDataMap = {
				...this.stationDataMap,
				...res,
				serviceStationList,
				pipeManageMentStationList,
				undergroundRepairStationList,
				ongroundRepairStationList,
			}
			// 右侧点位列表数据
			this.stationList = [
				...serviceStationList,
				...pipeManageMentStationList,
				...undergroundRepairStationList,
				...ongroundRepairStationList,
				...voltageRegulatorList,
			]
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsData = await getStatisticsInfo({
				type: 'LowPressure',
			})
      this.dataStatisticsData.passRate  = (this.dataStatisticsData.passRate * 100).toFixed(1) + '%'
		},
		// 获取瓦片函数
		getTileUrl(x, y, zoom) {
		  if (!this.tilesQuery.length) return ''
			const tilesQuery = String(this.tilesQuery)
			const {
				leftBottomX,
				leftBottomY,
				rightTopX,
				rightTopY,
				width,
				height,
				min,
				max,
			} = getHangZhouGasGISPosition(x, y, zoom)
			return `/pipenetwork/arcgis/rest/services/HZRQ/HZRQ_local/MapServer/export?dpi=96&transparent=true&format=png8&layers=show%3A${tilesQuery}&bbox=${leftBottomX}%2C${leftBottomY}%2C${rightTopX}%2C${rightTopY}&bboxSR=2385&imageSR=2385&size=${width}%2C${height}&f=image`
		},
		handleOverlayClick(overlay, overlayType) {
			overlay.overlayType = overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false
			this.activeOverlay = {}
			this.activeStationData = {}
			done && done()
		},
		setZoomAndPanTo(lng, lat) {
			this.$amap.setZoom(14, 100)
			this.$nextTick(() => {
				this.$amap.panTo([lng, lat], 100)
			})
		},
		handleListClick(overlay, listType) {
			const { lng, lat } = overlay
			// 关闭站点详情弹窗
			if (this.showOverlayDetail) {
				this.showOverlayDetail = false
				this.activeOverlay = {}
			}
			switch (listType) {
				case 'StationList':
					this.activeStationData = overlay
					break
				default:
					this.activeWarnData = overlay
					this.overlayDetailPosition = 'top'
			}
			this.setZoomAndPanTo(lng, lat + 0.006)
		},
		closeWarnEventDetail() {
			this.activeWarnData = {}
			this.$amap.setZoom(this.zoom, 100)
			this.$amap.setCenter(this.center, 100)
		},
	},
}
</script>
<style lang="scss" scoped>
.map-legend {
	position: absolute;
	bottom: 50px;
	left: 50%;
	z-index: 99;
	transform: translateX(-50%);
}
</style>
