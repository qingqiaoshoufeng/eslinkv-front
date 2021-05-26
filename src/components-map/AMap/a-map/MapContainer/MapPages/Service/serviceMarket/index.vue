<!-- 销售 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 区域描边 -->
		<SaleAreaBoundary />
		<!-- 态势感知 -->
		<!-- <ListOverlay @overlay-click="handleOverlayClick" /> -->

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.visible && stationDataMap[config.dataProp]"
				:key="legend"
				v-bind="config"
				:overlayType="legend"
				:is="config.component"
				:data="stationDataMap[config.dataProp]"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		/>
		<heatmap
			:data="heatData"
			v-if="heatData.length"
			:visible="heatmapShow"
		/>
		<portal to="destination">
			<!-- 选择器盒子 -->
			<i-switchBox
				@switch-change="switchChange"
				:data="swichBoxInfo"
				:className="{ left: true }"
			/>
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsList"
				:data="dataStatisticsInfo"
			/>
			<!-- 图例 -->
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
			/>
		</portal>
	</div>
</template>
<script>
// 页面覆盖物组件
import MapMarkerIcon from '@/components-map/AMap/a-map/components/MapMarkerIcon'
import { SwitchBox, SaleAreaBoundary } from '../Components/index.js'
import heatmap from './heatmap'
// 页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	DataStatistics,
	MapLegend,
} from '../../../../components/index.js'
import {
	SERVICE_SERVICEMARKET_OVERLAY_MAP,
	SERVICE_SERVICEMARKET_LEGEND_MAP,
	DATASTATISTICSLIST,
} from './config'

const { scene } = eslinkV.$store
export default {
	name: 'serviceMarket',
	components: {
		RegionBoundary,
		MapMarkerIcon,
		heatmap,
		OverlayDetail,
		DataStatistics,
		SaleAreaBoundary,
		iSwitchBox: SwitchBox,
		MapLegend,
	},
	data() {
		return {
			stationDataMap: {},
			dataStatisticsList: DATASTATISTICSLIST,
			dataStatisticsInfo: {},
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICEMARKET_OVERLAY_MAP,
			),
			legendMap: SERVICE_SERVICEMARKET_LEGEND_MAP,
			mapLegendStyle: { left: '18%' },
			legendMultiple: true,
			showOverlayDetail: false,
			heatmapShow: false,
			heatData: [],
			activeOverlay: {},
			center: [120.131259, 30.263295],
			zoom: 10,
			swichBoxInfo: [{ label: '年度销售气量热力', value: false, type: 'saleHeat' }],
		}
	},
	created() {
		this.$amap = this.$parent.$amap
		this.$amap.setZoom(this.zoom, 100)
		this.$amap.setCenter(this.center, 100)
		this.getSaleMapDataResult()
		this.getRightIndex()
		this.getHeatCount()
	},
	methods: {
		async getHeatCount () {
			const res = await this.$api.map.serve.getSaleHeatCount()
			this.heatData = res.total
		},
		async getRightIndex () {
			this.dataStatisticsInfo = await this.$api.map.serve.getSaleRightIndex()
		},
		// 获取所有站点数据
		async getSaleMapDataResult() {
			const params = {
				types: [
					'BranchCompany'
				].toString(),
			}
			const res = await this.$api.map.serve.getSaleMapDataResult(
				params,
			)
			this.stationDataMap = {
				...this.stationDataMap,
				...res,
			}
		},
		// 切换热力图显示隐藏
		switchChange(data) {
			this.swichBoxInfo = data
			const [{ value }] = this.swichBoxInfo
			this.heatmapShow = value
		},
		// 暂留
		closeOverlayDetail(done) {
			const { overlayType } = this.activeOverlay
			if (overlayType === 'WARNEVENT') {
				scene.actions.setSceneIndex(INDEXSCENEMAP.ServiceMarket)
				this.showRoutePlan = false
			}
			this.showOverlayDetail = false
			this.$amap.setZoom(11, 100)
			done()
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			// this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true
			const { lng, lat } = overlay
			overlay.overlayType = overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
			// this.$amap.setZoom(14, 100)
			// if (isCenter) {
			// 	this.$nextTick(() => {
			// 		this.$amap.panTo([lng, lat], 100)
			// 	})
			// }
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
