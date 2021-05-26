<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 报警点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
		></WarnEvent>
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, key) in legendMap">
			<component
				v-if="config.visible && stationDataMap[config.dataProp]"
				v-bind="config"
				:key="key"
				:is="config.component"
				:overlayType="key"
				:data="stationDataMap[config.dataProp]"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			v-bind="{
				beforeClose: closeOverlayDetail,
				...overlayDetailProp,
			}"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="500"
		/>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsConfigMap"
				:data="dataStatisticsInfo"
			/>
			<!-- 图例 -->
			<MapLegend :data="legendMap" class="map-legend" />
			<!-- 右侧列表 -->
			<RightPanel
				class="right-panel"
				v-model="activeTab"
				@overlay-click="handleListClick"
				v-bind="{
					stationList,
					markerConfig: legendMap
				}"
				ref="RightPanel"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
// 页面覆盖物组件
import {
	WarnEvent,
} from '../Components/index.js'
import RightPanel from './components/RightPanel'
import MapMarkerIcon from '@/components-map/AMap/a-map/components/MapMarkerIcon'
// 页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
	DataStatistics,
} from '../../../../components/index.js'

// 场景相关配置
import {
	INDEXSCENEMAP,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../config/scene'
// 页面配置
import {
	DATASTATISTICSLIST,
	AIRSUPPLY_LNG_OVERLAY_MAP,
	AIRSUPPLY_LNG_LEGEND_MAP,
} from './config.js'
const { scene } = eslinkV.$store

export default {
	name: 'LNG',
	components: {
		RightPanel,
		WarnEvent,
		MapMarkerIcon,
		RegionBoundary,
		OverlayDetail,
		MapLegend,
		DataStatistics,
	},
	watch: {
		center(val) {
			this.$amap.panTo(val, 100)
		},
	},
	created() {
		this.$amap = this.$parent.$amap
		this.$amap.setZoom(this.zoom, 100)
		this.$amap.setCenter(this.center, 100)
	},
	computed: {
		overlayDetailProp() {
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
			return {}
		},
	},
	mounted() {
		this.getAllTypeStationList()
		this.getDataStatisticsInfo()
	},
	data() {
		return {
			overlayInfoConfigMap: Object.freeze(AIRSUPPLY_LNG_OVERLAY_MAP),
			center: [120.131259, 30.263295],
			zoom: 10.7,
			activeOverlay: {},
			activeWarnData: {},
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'eventWarning',
			legendMap: AIRSUPPLY_LNG_LEGEND_MAP,
			overlayMap: AIRSUPPLY_LNG_LEGEND_MAP,
			dataStatisticsConfigMap: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				stationNumber: 8,
			},
			stationDataMap: {},
			stationList: [],
		}
	},
	methods: {
		closeStationListDetail() {
			this.$amap.setZoom(this.zoom, 100)
			this.$amap.setCenter(this.center, 100)
		},
		setCenter(center) {
			this.center = center || this.center
		},
		// 获取所有站点数据
		async getAllTypeStationList() {
			const params = {
				types: Object.keys(AIRSUPPLY_LNG_LEGEND_MAP).toString()
			}
			const res = await this.$api.map.airSupply.getLngMapDataResult(
				params,
			)
			this.stationDataMap = { ...this.stationDataMap, ...res }
			this.stationList = [
				...res.branchCompanyList,
				...res.emergencyAirSourceStationList,
				...res.greenEnergyStationList,
				...res.naturalGasStationList,
				// ...res.storageDistributionStationList,
				// ...res.yardsStationList,
			]
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsInfo = await this.$api.map.airSupply.getLngStationCounts()
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			const { lng, lat } = overlay
			overlay.overlayType = overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
			// if (isCenter) {
			// 	this.setZoomAndPanTo(lng, lat + 0.005);
			// }
		},
		closeOverlayDetail(done) {
			const { overlayType } = this.activeOverlay
			if (overlayType === 'WARNEVENT') {
				scene.actions.setSceneIndex(INDEXSCENEMAP.AirSupplyLNG)
				this.showRoutePlan = false
			}
			this.showOverlayDetail = false
			this.activeOverlay = {}
			// this.$amap.setZoom(11, 100);
			this.$amap.setZoom(this.zoom, 100)
			this.$amap.setCenter(this.center, 100)
			done && done()
		},
		viewOverlayDetail(overlay) {},
		setZoomAndPanTo(lng, lat) {
			this.$amap.setZoom(14, 100)
			this.$nextTick(() => {
				this.$amap.panTo([lng, lat], 100)
			})
		},
		handleListClick(overlay) {
			if (this.showOverlayDetail) {
				this.showOverlayDetail = false
				this.activeOverlay = {}
			}
			const { lng, lat } = overlay
			this.activeWarnData = overlay
			this.setZoomAndPanTo(lng, lat)
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
	transform: translateX(-50%);
}
</style>
