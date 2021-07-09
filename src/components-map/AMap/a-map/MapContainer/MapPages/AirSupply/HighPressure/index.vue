<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 工艺报警和事件报警报警地图点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
      :width="
				activeWarnData.overlayType === 'VoltageRegulator' ? 700 : 400
			"
		>
      <VoltageRegulator
          :data="activeWarnData"
          v-if="activeWarnData.overlayType === 'VoltageRegulator'"
      ></VoltageRegulator>
    </WarnEvent>
		<!-- 行政区域覆盖物 -->
		<RegionBoundary v-if="!isShowSatellite" />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				v-if="stationDataMap[config.dataProp]"
				:ref="config.component"
				:activeItem="activeOverlayMap[legend] || undefined"
				:is="config.component"
				:visible="config.visible"
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="legend"
				:iconSize="config.iconSize"
				:showOverlayName="config.showOverlayName"
				:detailList="config.detailList"
				:data="stationDataMap[config.dataProp]"
				:showOverlayDetail="showOverlayDetail"
				@moveto="handlerMoveto"
				@overlay-click="handleOverlayClick"
				@close="closeOverlayDetail('', false)"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				beforeClose: closeOverlayDetail,
				position: overlayDetailPosition,
				...overlayDetailProp,
			}"
			@view-detail="viewDetail"
			ref="OverlayDetail"
      :width="400"
		>
    </OverlayDetail>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsConfigMap"
				:data="dataStatisticsData"
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
					rightListActiveItemMap,
					markerConfig: legendMap,
				}"
				ref="RightPanel"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
// 页面覆盖物组件
// 页面所需配置项
import {
	AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP,
	AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP,
	DATA_STATISTICS_MAP,
} from './config.js'
import pageMixin from '../../../../mixins/pageMixin'
import {
	getAllTypeStationList,
	getStatisticsInfo,
	getHighPressurePipe,
} from '@/components-map-api/map.airSupply.api'
import VoltageRegulator from '../LowPressure/components/VoltageRegulator'
import laserCarRoute from '../Components/RoutePlan/laserCarRoute'

const componentPageArr = [
	// legend覆盖物
	'HighPressureLine',
	'HighPressureLine_Process',
	'GasStation',
	'PressureRegulatingStation',
	'EmergencyAirSourceStation',
	'InspectionPerson',
	'InspectionCar',
	// 报警点位
	'WarnEvent',
	// 右侧报警列表
	'RightPanel',
]
// 页面所需公共组件
const componentCommonArr = [
	'DataStatistics',
	'RegionBoundary',
	'OverlayDetail',
	'MapLegend',
]
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
	name: 'HighPressure',
	inject: ['parentInfo'],
	mixins: [pageMixin],
	components: {
    VoltageRegulator,
    laserCarRoute,
		...componentPageMap,
		...componentCommonMap,
	},
	data() {
		return {
			center: [120.131259, 30.263295],
			zoom: 10.2,
			overlayInfoConfigMap: Object.freeze(
				AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP,
			),
			legendMap: AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP,
			activeTab: 'processWarning',
			dataStatisticsConfigMap: DATA_STATISTICS_MAP,
			dataStatisticsData: {},
			activeOverlay: {},
			activeWarnData: {},
			activeStationData: {},
			showOverlayDetail: false,
			stationDataMap: {},
			visibleMore: false,
			overlayDetailPosition: '',
			stationList: [],
			isShowSatellite: false,
		}
	},
	computed: {
		// 详情弹窗所需props
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
		rightListActiveItemMap() {
			const { activeWarnData, activeStationData } = this
			return {
				processWarning: activeWarnData,
				eventWarning: activeWarnData,
				overlayList: activeStationData,
			}
		},
	},
	created() {
		this.$amap = this.$parent.$amap
		// 选取几个点位，在可视范围内以适当zoom显示
		const fitMapPositionArr = [
			{
				lng: 120.248177,
				lat: 30.426391,
			},
			{
				lng: 119.920883,
				lat: 30.106665,
			},
			{
				lng: 119.90885,
				lat: 30.141069,
			},
		]
		this.mapFitView2(fitMapPositionArr)
	},
	mounted() {
		this.getAllTypeStationList()
		this.getDataStatisticsInfo()
		this.getHighPressurePipe()
	},
	methods: {
		// 1.获取所有站点数据
		async getAllTypeStationList() {
			const params = {
				types: [
					'GasStation', // '门站',
					'PressureRegulatingStation', // '调压站',
					'EmergencyAirSourceStation', // '应急气源站',
          'CommandCar', // '抢修指挥车',
          'LaserCar', // '激光巡检车',
				].toString(),
			}
			const res = await getAllTypeStationList(params)
			this.stationDataMap = { ...this.stationDataMap, ...res }
			const {
				gasStationList,
				pressureRegulatingStationList,
				emergencyAirSourceStationList,
			} = res
			this.stationList = [
				...gasStationList,
				...pressureRegulatingStationList,
				...emergencyAirSourceStationList,
			]
		},
		// 2.获取高压统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsData = await getStatisticsInfo({
				type: 'HighPressure',
			})
		},
		// 3.获取高压管网，高压管网建设中数据
		async getHighPressurePipe() {
			const pipeData = await getHighPressurePipe()
			this.stationDataMap = {
				...this.stationDataMap,
				...pipeData,
			}
		},
		resetActiveOverlay(activeItem) {
			const arr = ['activeOverlay', 'activeWarnData', 'activeStationData']
			arr.forEach(item => {
				if (item !== activeItem) {
					this[item] = {}
				}
			})
		},
		handlerMoveto({ type }) {
			if (type === 'WarningStations') {
				this.$amap.panTo([120.131259, 30.363295], 100)
				this.closeOverlayDetail('', false)
			} else {
				this.$amap.panTo(this.center, 100)
				this.closeWarnEventDetail()
			}
		},
		setZoomAndPanTo(lng, lat, zoom = 14) {
			this.$amap.setZoom(zoom, 100)
			this.$amap.panTo([lng, lat], 100)
			this.overlayDetailPosition = zoom == 14 ? 'top' : ''
		},
		// 点击marker第一次显示详情，第二次关闭弹窗
		handleOverlayClick(overlay, overlayType) {
			if (this.activeOverlay === overlay) {
				this.activeOverlay.detail = null
				this.closeOverlayDetail()
				return false
			}
			overlay.overlayType = overlayType || overlay.overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
		},
		closeOverlayDetail(done, isZoom = true) {
			this.showOverlayDetail = false
			this.activeOverlay = {}
			this.activeStationData = {}
			if (isZoom) {
				this.setZoomAndPanTo(...this.center, this.zoom)
			}
			if (done) {
				done()
			}
		},
		handleListClick(overlay, listType) {
			const { lng, lat } = overlay
			// 关闭站点详情弹窗
			if (this.showOverlayDetail) {
				this.showOverlayDetail = false
				this.activeOverlay = {}
			}
			// 点位列表 和 事件报警做区分
			switch (listType) {
				case 'StationList':
					this.resetActiveOverlay('activeStationData')
					this.activeStationData = overlay
					break
				default:
					this.resetActiveOverlay('activeWarnData')
					this.activeWarnData = overlay
					this.overlayDetailPosition = 'top'
			}
			this.setZoomAndPanTo(lng, lat + 0.006)
		},
		closeWarnEventDetail(isZoom = true) {
			this.activeWarnData = {}
			isZoom && this.setZoomAndPanTo(...this.center, this.zoom)
		},
		closeStationListDetail(isZoom = true) {
			this.activeStationData = {}
			console.log('closeStationListDetail')
			isZoom && this.setZoomAndPanTo(...this.center, this.zoom)
		},
		// 查看详情调用组件内部的方法
		viewDetail() {
			const { overlayType } = this.activeOverlay
			if (this.$refs[overlayType]) {
				this.$refs[overlayType][0].viewDetail(this.activeOverlay)
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.map-legend {
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
