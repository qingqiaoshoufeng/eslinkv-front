<!-- 工商户 -->
<template>
	<div class="ICcustomer1">
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea" @input="saleAreaChange" />

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in overlayMap">
			<component
				v-if="config.visible && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.visible"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:ref="config.component"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
				@close="closeOverlayDetail('')"
				:activeIndex="activeIndex"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:width="450"
			v-bind="{
				beforeClose: closeOverlayDetail,
				...OverlayDetailProp,
			}"
			ref="OverlayDetail"
		>
			<TipDetial
				:data="activeOverlay"
				:detailInfo="detailInfo"
				:isShowMore="isShowMore"
			/>
		</OverlayDetail>
		<portal to="destination">
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
			/>
			<DataStatistics
				:dataStatisticsList="dataStatisticsList"
				:data="ICcustomerDetailInfo"
			/>
			<RightPanelWithServiceICcustomer
				class="right-panel"
				@overlay-click="handleListClick"
				:activeOverlay="activeOverlay"
			/>
			<!-- 选择器盒子 -->
			<i-switchBox
				@switch-change="switchChange"
				:data="swichBoxInfo"
				:className="{ left: true }"
			/>
		</portal>
	</div>
</template>
<script>
// 页面覆盖物组件
import {
	SERVICE_SERVICEICCUSTOMER_LEGEND_MAP,
	SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP,
	DATASTATISTICSLIST,
	SWICHBOX,
} from './config'
import {
	ICcustomer_WARN__SCENEINDEX,
	ICcustomer_WARN__COMPONENTINDEX,
} from '../../../../config'
import {
	getICcustomerStationList,
	getICcustomerCallingInfo,
	getICcustomerHotInfo,
	getICcustomerDetailInfo,
	getICcustomerSituationAwareness,
} from '@/components-map-api/map.serve.api'

const componentPageArr = [
	'RightPanelWithServiceICcustomer',
	'BranchCompany',
	'MajorClient',
	'WarningICcustomer',
	'TipDetial',
	'SaleAreaBoundary',
	'SwitchBox',
	'useHotYear',
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
	name: 'serviceICcustomer',
	components: {
		...componentPageMap,
		...componentCommonMap,
		iSwitchBox: componentPageMap.SwitchBox,
	},
	data() {
		const {
			MajorClient,
			BranchCompany,
			WarningICcustomer,
		} = SERVICE_SERVICEICCUSTOMER_LEGEND_MAP
		return {
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP,
			),
			dataStatisticsList: DATASTATISTICSLIST,
			overlayMap: SERVICE_SERVICEICCUSTOMER_LEGEND_MAP,
			legendMap: { MajorClient, BranchCompany },
			legendMultiple: true,
			showOverlayDetail: false,
			activeOverlay: {},
			center: [120.22476196, 30.30531764],
			zoom: 11,
			allTypeStationList: {},
			detailInfo: {},
			ICcustomerDetailInfo: {},
			isShowMore: false,
			activeArea: '',
			swichBoxInfo: SWICHBOX,
			WarningDetialInfo: {},
			activeIndex: null,
		}
	},
	computed: {
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
			} else {
				return {}
			}
		},
	},
	created() {
		this.$amap = this.$parent.$amap
		this.$amap.setZoom(this.zoom, 100)
		this.$amap.panTo(this.center, 100)
	},

	methods: {
		showMoreDetail() {},
		// 板块图变化
		saleAreaChange(val) {},
		// 切换热力图显示隐藏
		switchChange(data, type) {
			this.swichBoxInfo = data
			const [{ value }] = this.swichBoxInfo
			this.overlayMap.useHotYear.visible = value
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false
			this.activeOverlay = {}
			this.detailInfo = {}

			this.$amap.setZoom(this.zoom, 100)
			this.$amap.panTo(this.center, 100)
			done && done()
		},
		// 点击地图marker
		handleOverlayClick(overlay, overlayType, isCenter = false) {
			this.activeOverlay = {}
			this.detailInfo = {}
			this.showOverlayDetail = false

			overlay.overlayType = overlayType || overlay.overlayType
			const {
				lng,
				lat,
				id,
				overlayType: type,
				detailList,
				name,
				status,
				activeIndex,
				type: stationType,
			} = overlay
			const params = {
				stationType,
				name,
				id,
			}
			this.activeArea = name
			this.activeOverlay = overlay
			this.activeIndex = activeIndex || this.activeIndex
			this.getDetailInfo(params, status)

			this.isShowMore = [''].includes(type)
			if (['MajorClient', 'WarningICcustomer'].includes(type)) {
				this.$amap.setZoom(14, 100)
				this.$amap.panTo([lng, lat], 100)
			}
		},
		// 请求子公司数据列表
		async getAllTypeStationList() {
			const params = {
				types: ['ICcustomer', 'BranchCompany'].toString(),
			}
			const res = await getICcustomerStationList(params)
			this.allTypeStationList = { ...this.allTypeStationList, ...res }
		},

		// 联码新增统计数据
		async getDataStatisticsList() {
			this.ICcustomerDetailInfo = await getICcustomerCallingInfo()
		},

		// 获取热力图信息
		async getAllHotList() {
			const res = await getICcustomerHotInfo()
			this.allTypeStationList = { ...this.allTypeStationList, ...res }
		},
		// 获取站点详情
		async getDetailInfo(params, status) {
			this.detailInfo = await getICcustomerDetailInfo(params)
			if (status && status === '0') {
				this.detailInfo.ICcustomerStatus = '已处理'
			} else if (status && status === '1') {
				this.detailInfo.ICcustomerStatus = '待处理'
			}

			this.showOverlayDetail = this.$refs[
				this.activeOverlay.overlayType
			][0].mouseIn
		},
		// 获取右侧table列表报警信息
		async getWarningList(params) {
			const WarningICcustomerList = await getICcustomerSituationAwareness(
				params,
			)
			this.allTypeStationList = {
				...this.allTypeStationList,
				WarningICcustomerList,
			}
		},
		handleListClick(item) {
			this.$refs.WarningICcustomer[0].mouseIn = true
			this.activeOverlay = item
			this.handleOverlayClick(item)
		},
	},
	mounted() {
		this.getDataStatisticsList()
		this.getAllTypeStationList()
		this.getWarningList()
		this.getAllHotList()
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
