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
				v-if="config.visible && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.visible"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
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
		/>
		<heartmap
			v-if="
				allTypeStationList.CustomerHotList &&
				allTypeStationList.CustomerHotList.length
			"
			:visible="heatmapShow"
			:data="allTypeStationList.CustomerHotList"
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
import {
	BranchCompany,
	HeatMap,
	SwitchBox,
	SaleAreaBoundary,
} from '../Components/index.js'
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
} from './config'

const { scene } = eslinkV.$store
export default {
	name: 'serviceMarket',
	components: {
		RegionBoundary,
		heatmap,
		OverlayDetail,
		BranchCompany,
		DataStatistics,
		SaleAreaBoundary,
		iSwitchBox: SwitchBox,
		HeatMap,
		MapLegend,
	},
	data() {
		return {
			dataStatisticsList: [], // todo
			dataStatisticsInfo: {}, // todo
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICEMARKET_OVERLAY_MAP,
			),
			legendMap: SERVICE_SERVICEMARKET_LEGEND_MAP,
			mapLegendStyle: { left: '18%' },
			legendMultiple: true,
			showOverlayDetail: false,
			heatmapShow: false,
			activeOverlay: {},
			center: [120.131259, 30.263295],
			zoom: 10,
			allTypeStationList: {},
			swichBoxInfo: [
				{ label: '年度销售气量热力', value: false, type: 'saleHeat' },
			],
		}
	},
	created() {
		this.$amap = this.$parent.$amap
		this.$amap.setZoom(this.zoom, 100)
		this.$amap.setCenter(this.center, 100)
	},
	methods: {
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
			// this.activeOverlay = {};
			this.$amap.setZoom(11, 100)
			done()
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true
			const { lng, lat } = overlay
			overlay.overlayType = overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
			this.$amap.setZoom(14, 100)
			if (isCenter) {
				this.$nextTick(() => {
					this.$amap.panTo([lng, lat], 100)
				})
			}
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
