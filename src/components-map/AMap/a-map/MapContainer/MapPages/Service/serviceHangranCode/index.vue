<!-- 杭燃码 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 1.区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea" />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in overlayMap">
			<component
				v-if="
					config.visible &&
					allTypeStationList[config.dataProp] &&
					allTypeStationList[config.dataProp].length &&
					config.component
				"
				:key="config.component"
				:visible="config.visible"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				:data="allTypeStationList[config.dataProp]"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				:ref="config.component"
				@close="closeOverlayDetail('')"
			/>
		</template>

		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:width="detialBoxWidth"
			v-bind="{
				beforeClose: closeOverlayDetail,
				...OverlayDetailProp,
			}"
			@view-detail="showOverlayDetail"
			ref="OverlayDetail"
			:left="left"
		>
			<component
				:is="detailComponentName"
				:data="activeOverlay"
				:detailInfo="detailInfo"
			/>
			<!-- <TipDetial :data="activeOverlay" :detailInfo="detailInfo"  /> -->
			<!-- <ClickTipDetial :data="activeOverlay" :detailInfo="detailInfo" /> -->
		</OverlayDetail>

		<portal to="destination">
			<!-- 图例 -->
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
				:style="mapLegendStyle"
			/>

			<!-- 统计数据 -->
			<DataStatistics
				style="top: 240px"
				:position="'left'"
				:dataStatisticsList="dataStatisticsList"
				:data="couplingIncreaseInfo"
			/>
			<!-- 选择器盒子 -->
			<i-switchBox @switch-change="switchChange" :data="swichBoxInfo" />
		</portal>
	</div>
</template>
<script>
// 页面覆盖物组件
import pageMixin from '../../../../mixins/pageMixin'
import { lnglat2container, latlngtopx } from '../../../../utils/latlngtopx'
import {
	SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
	SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
	DATASTATISTICSLIST,
	SWICHBOX,
} from './config'
import {
	getCouplingIncreaseInfo,
	getHangranCodeDetailInfo,
	getHangranCodeList,
	getHangranCodeHotList,
	clickGetBranchCompanyDetialInfo,
} from '@/components-map-api/map.serve.api'

const componentPageArr = [
	'CouplingHot',
	'OperationHot',
	'SwitchBox',
	'BranchCompany',
	'ServiceStation',
	'TipDetial',
	'ClickTipDetial',
	'SaleAreaBoundary',
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
	name: 'hangranCode',
	mixins: [pageMixin],
	components: {
		...componentPageMap,
		...componentCommonMap,
		iSwitchBox: componentPageMap.SwitchBox,
	},
	data() {
		const { BranchCompany } = SERVICE_SERVICEHANGRANCODE_LEGEND_MAP
		return {
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
			),
			dataStatisticsList: DATASTATISTICSLIST,
			overlayMap: SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
			legendMap: {
				BranchCompany,
			},

			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			legendMultiple: true,
			showOverlayDetail: false,
			center: [120.90522766, 30.74965084],
			zoom: 10,
			allTypeStationList: {},
			detailInfo: {},
			couplingIncreaseInfo: {},
			activeArea: '',
			left: 10,
			swichBoxInfo: SWICHBOX,
			intervalId: null,
			detialBoxWidth: 480, // 详情弹框宽度
			detailComponentName: 'TipDetial',
			params: [
				[-0.3, 0.4, 0.2],
				[-0.31, 0.4, 0.15],
				[0.08, 0.4, 0.4],
				[-0.34, 0.4, 0.13],
			],
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
			}
			return null
		},
	},
	created() {
		this.$amap = this.$parent.$amap
		this.$nextTick(() => {
			this.mapFitView(-0.3, 0.4, 0.35)
		})
	},
	methods: {
		// 关闭详情
		closeOverlayDetail(done) {
			const { overlayType } = this.activeOverlay
			this.showOverlayDetail = false
			this.activeOverlay = {}
			this.detailInfo = {}
			this.carouseComplBranchCompanyInfo()
			this.activeArea = ''
			done && done()
		},
		// 点击地图marker
		async handleOverlayClick(overlay, overlayType, isCenter = false) {
			this.activeOverlay = {}
			this.detailInfo = {}
			this.showOverlayDetail = false
			this.detailComponentName = 'ClickTipDetial'
			this.clearInterval()
			const {
				lng,
				lat,
				id,
				overlayType: type,
				detailList,
				name,
			} = overlay
			const params = {
				name,
			}
			const res = await this.clickGetBranchCompanyDetialInfo(params)
			this.activeOverlay = overlay
			this.activeOverlay.detailList = res
			this.detialBoxWidth = 500
			this.showOverlayDetail = this.$refs.BranchCompany[0].mouseIn
		},
		// 联码新增统计数据
		async getDataStatisticsList() {
			this.couplingIncreaseInfo = await getCouplingIncreaseInfo()
		},
		// 请求集团大厅，子公司，综合服务站数据列表
		async getAllTypeStationList() {
			const params = {
				types: [
					'BranchCompany',
					'ComprehensiveServiceStation',
				].toString(),
			}

			this.detialBoxWidth = 480
			return getHangranCodeList(params)
		},
		// 获取热力图信息
		async getAllHotList() {
			let res
			try {
				res = await getHangranCodeHotList()
			} catch (error) {
				res = {}
			}

			this.allTypeStationList = { ...this.allTypeStationList, ...res }
		},
		// 获取站点详情
		async getDetailInfo(params) {
			this.detailInfo = await getHangranCodeDetailInfo(params)
			this.showOverlayDetail = true
		},
		// 获取点击站点服务站详情
		async clickGetBranchCompanyDetialInfo(params) {
			return clickGetBranchCompanyDetialInfo(params)
		},
		// 切换热力图显示隐藏
		switchChange(data, type) {
			if (type === 'coupling' && data[0].value) {
				data[1].value = false
			} else if (type === 'operation' && data[1].value) {
				data[0].value = false
			}
			this.swichBoxInfo = data
			const [{ value: value1 }, { value: value2 }] = this.swichBoxInfo
			this.overlayMap.CouplingHot.visible = value1
			this.overlayMap.OperationHot.visible = value2
		},
		// 开启定时器 展示公司详情
		carouseComplBranchCompanyInfo() {
			this.detailComponentName = 'TipDetial'
			let index = 0

			const length = this.allTypeStationList.branchCompanyList.length
			if (this.intervalId || this.intervalId == 0) {
				this.clearInterval()
			}
			this.intervalId = setInterval(() => {
				const currentIndex = index++ % length
				this.activeOverlay = {
					...this.allTypeStationList.branchCompanyList[currentIndex],
					type: 'BranchCompany',
					overlayType: 'BranchCompany',
					detailList:
						SERVICE_SERVICEHANGRANCODE_LEGEND_MAP.BranchCompany
							.detailList,
				}
				this.detailInfo = this.activeOverlay.gasCodeMapDetailInfoVO
				const { lat, lng } = this.activeOverlay
				const { x, y } = latlngtopx([lng, lat], this.$amap)
				this.showOverlayDetail = true
				this.$amap.panBy(x, y)
			}, 5000)
		},
		// 关闭定时器
		clearInterval() {
			clearInterval(this.intervalId)
			this.intervalId = null
		},
	},
	watch: {
		// 监听三社联动处理切换场景后产生多余定时器bug
		'allTypeStationList.branchCompanyList': {
			handler(val) {
				if (val && val.length) {
					this.carouseComplBranchCompanyInfo()
				}
			},
			immediate: true,
		},
	},
	async mounted() {
		const res = await this.getAllTypeStationList()
		this.allTypeStationList = { ...this.allTypeStationList, ...res }
		this.getAllHotList()
		this.getDataStatisticsList()
	},
	beforeDestroy() {
		this.clearInterval()
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
