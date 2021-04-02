<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 报警点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
			ref="WarnEvent"
		></WarnEvent>
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
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="config.component"
				:iconSize="config.iconSize"
				:showOverlayName="config.showOverlayName"
				:detailList="config.detailList"
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
			:width="400"
		></OverlayDetail>
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
				v-model="activeTab"
				@overlay-click="handleListClick"
				v-bind="{
					stationList,
					rightListActiveItemMap,
				}"
				ref="RightPanel1"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
// 页面覆盖物组件
// 页面覆盖物组件
import {} from '../Components/index.js'
import { AMapTile } from '../../../../lib'

// 页面所需公共组件
import { OverlayDetail, MapLegend } from '../../../../components/index.js'
import { DataStatistics } from '../../../../components'

import {
	INDEXSCENEMAP,
	OVERLAYINFOMAP_AIRSUPPLY,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../config'
import {
	DATASTATISTICSLIST,
	AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
	AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
} from './config.js'
import getHangZhouGasGISPosition from '../../../../utils/getHangZhouGasGISPosition'

const componentPageArr = [
	// legend覆盖物
	'ServiceStation',
	'PipeManageMentStation',
	'UndergroundRepairStation',
	'OngroundRepairStation',
	'InspectionPerson',
	'InspectionCar',
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
		AMapTile,
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
	},
	data() {
		return {
			overlayInfoConfigMap: Object.freeze(
				AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
			),
			activeOverlay: {},
			activeWarnData: {},
			center: [120.151562, 30.293297],
			zoom: 12.5,
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'eventWarning',
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
		// 获取所有站点数据
		async getAllTypeStationList() {
			const params = {
				types: [
					'ServiceStation', // '综合服务站',
					'PipeManageMentStation', // '管网运行管理站',
					'UndergroundRepairStation', // '地下抢修点',
					'OngroundRepairStation', // '地上抢修点',
				].toString(),
			}
			const res = await this.$api.map.airSupply.getAllTypeStationList(
				params,
			)
			let {
				serviceStationList,
				pipeManageMentStationList,
				undergroundRepairStationList,
				ongroundRepairStationList,
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
			]
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsData = await this.$api.map.airSupply.getStatisticsInfo(
				{ type: 'LowPressure' },
			)
		},
		// 获取瓦片函数
		getTileUrl(x, y, zoom) {
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
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			const { lng, lat } = overlay
			overlay.overlayType = overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
		},
		closeOverlayDetail(done) {
			const { overlayType } = this.activeOverlay
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
