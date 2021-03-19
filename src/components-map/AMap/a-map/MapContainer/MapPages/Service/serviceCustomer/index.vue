<!-- 客户服务 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary/>
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea"/>
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.visible && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.visible"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="config.component"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				@view-detail="showMoreDetail"
				:data="allTypeStationList[config.dataProp]"
				@close="closeOverlayDetail('')"
				:ref="config.component"
			/>
		</template>
		<!-- 2.legend不控制显隐 -->
		<ClickTaskList
			:iconSize="38"
			@overlay-click="handleOverlayClick"
			:detailList="[]"
			:activeIndex="activeIndex"
			:data="allTypeStationList.TaskList"
			ref="OverlayDetail"
			@close="closeOverlayDetail('')"
		/>
		<CustomerHot
			v-if="
				allTypeStationList.CustomerHotList &&
					allTypeStationList.CustomerHotList.length
			"
			:visible="visible"
			:data="allTypeStationList.CustomerHotList"
			ref="OverlayDetail"
		/>

		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:width="450"
			@view-detail="showMoreDetail"
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
				@view-detail="showMoreDetail"
			/>
		</OverlayDetail>
		<portal to="destination">
			<!-- 选择器盒子 -->
			<i-switchBox
				@switch-change="switchChange"
				:data="swichBoxInfo"
				:className="{ left: true }"
			/>
			<!-- 图例 -->
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
			/>
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsList"
				:data="dataStatisticsInfo"
			/>
			<!-- 右侧列表 -->
			<RightPanelWithServiceCustomer
				class="right-panel"
				@list-click="handleListClick"
				:activeOverlay="activeOverlay"
			></RightPanelWithServiceCustomer>
		</portal>
	</div>
</template>
<script>
    // 页面覆盖物组件
	import {
		INDEXSCENEMAP,
		THREESOCIALLINKAGE_SCENEINDEX,
		THREESOCIALLINKAGE_COMPONENTINDEX
	} from '../../../../config'

	import {
		DATASTATISTICSLIST,
		SWICHBOX,
		SERVICE_SERVICECUSTOMER_LEGEND_MAP,
		SERVICE_SERVICECUSTOMER_OVERLAY_MAP,
		SERVICE_SERVICECUSTOMER_UN_LEGEND_MAP
	} from './config.js'
	import scene from 'eslinkv-npm/src/store/scene.store'
	import instance from 'eslinkv-npm/src/store/instance.store'
	const componentPageArr = [
		'ThreeSocialLinkage',
		'ServiceNetworkStation',
		'BranchCompany',
		'RightPanelWithServiceCustomer',
		'TipDetial',
		'TaskList',
		'ClickTaskList',
		'CustomerHot',
		'SwitchBox',
		'SaleAreaBoundary'
	]
	// 页面所需公共组件
	const componentCommonArr = [
		'DataStatistics',
		'RegionBoundary',
		'OverlayDetail',
		'MapLegend'
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
		name: 'ServiceCustomer',
		components: {
			...componentPageMap,
			...componentCommonMap,
			iSwitchBox: componentPageMap.SwitchBox
		},
		data () {
			return {
				overlayInfoConfigMap: Object.freeze(
					SERVICE_SERVICECUSTOMER_OVERLAY_MAP
				),
				showOverlayDetail: false,
				activeOverlay: {},
				OverlayDetail: null,
				legendMap: SERVICE_SERVICECUSTOMER_LEGEND_MAP,
				legendMultiple: true,
				center: [120.22476196, 30.30531764],
				zoom: 11,
				allTypeStationList: {},
				dataStatisticsList: DATASTATISTICSLIST,
				dataStatisticsInfo: {
					citizenNumber: 0,
					publicBuildNumber: 0,
					industryNumber: 0,
					businessServe: 0
				},
				activeArea: '',
				detailInfo: {},
				isShowMore: false,
				activeIndex: null,
				swichBoxInfo: SWICHBOX,
				visible: false
			}
		},

		created () {
			this.$amap = this.$parent.$amap
			this.$amap.setZoom(this.zoom, 100)
			this.$amap.setCenter(this.center, 100)
		},
		computed: {
			OverlayDetailProp () {
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
						showMore
					} = legendConfig
					return {
						data: activeOverlay,
						iconSize,
						showCloseBtn,
						overlayDetailConfig,
						showMore
					}
				} else {
					return {}
				}
			}
		},

		methods: {
			// 切换热力图显示隐藏
			switchChange (data, type) {
				this.swichBoxInfo = data
				const [{ value }] = this.swichBoxInfo

				this.visible = value
			},
			// 详情弹框展示更多详情
			showMoreDetail () {
				this.showThreeSocialLinkageDetail()
			},
			// 获取三社联动热力数据信息
			async getThreeSocialLinkagecustmerHot () {
				const res = await this.$api.map.serve.getThreeSocialLinkagecustmerHot()

				this.allTypeStationList.CustomerHotList = res.customer
			},
			// 点击覆盖物icon
			async handleOverlayClick (overlay, overlayType1, isCenter = false) {
				this.activeOverlay = {}
				this.detailInfo = {}
				this.showOverlayDetail = false
				const { lng, lat, type, name, id, overlayType } = overlay
				const params = {
					name,
					id,
					type
				}
				// 如果点击到分公司覆盖物 请求覆盖物详情
				if (['BranchCompany'].includes(overlayType)) {
					this.detailInfo = await this.getDetailInfo(params)
					// 如果点击到任务工单覆盖物 直接过滤该条工单数据不必请求
				} else if (overlayType === 'TaskList') {
					overlay.activeIndex = this.allTypeStationList.TaskList.findIndex(
						item => item.id === overlay.id
					)
					this.isShowMore = false
					// 触发点击右侧栏相同效果
					this.handleListClick(overlay)
					return
				}
				this.activeOverlay = overlay

				this.showOverlayDetail = this.$refs[overlayType][0].mouseIn
				// 判断是否展示更多详情按钮
				this.isShowMore = ['ThreeSocialLinkage'].includes(overlayType)
				if (['ThreeSocialLinkage', 'TaskList'].includes(overlayType)) {
					this.$amap.setZoom(14, 100)
					this.$amap.panTo([lng, lat], 100)
				}
			},
			// 关闭详情
			closeOverlayDetail (done) {
				const { overlayType } = this.activeOverlay
				this.showOverlayDetail = false
				this.activeOverlay = {}
				this.detailInfo = {}
				this.$amap.setZoom(this.zoom, 100)
				this.$amap.panTo(this.center, 100)
				this.activeIndex = -1
				done && done()
			},
			// 点击右侧栏
			handleListClick (item) {
				const {
					name,
					time,
					activeIndex,
					overlayType,
					lng,
					lat,
					address
				} = item
				if (overlayType === 'ThreeSocialLinkage') {
					this.$refs.ThreeSocialLinkage[0].mouseIn = true
					this.handleOverlayClick(item)
					return
				}
				// 更新任务工单位置
				this.allTypeStationList.TaskList[activeIndex] = {
					...this.allTypeStationList.TaskList[activeIndex],
					lng,
					lat
				}
				this.isShowMore = false
				this.activeIndex = activeIndex
				this.activeOverlay.activeIndex = activeIndex
				this.activeOverlay = {
					...item,
					detailList:
						SERVICE_SERVICECUSTOMER_UN_LEGEND_MAP.TaskList.detailList
				}

				this.detailInfo = item
				this.$amap.setZoom(14, 100)
				this.$amap.panTo([lng, lat], 100)
				this.showOverlayDetail = true
			},
			// 打开三社联动更多详情场景
			showThreeSocialLinkageDetail () {
				const { id } = this.activeOverlay
				// 打开三社联动的弹框
        THREESOCIALLINKAGE_COMPONENTINDEX.forEach(i => {
          this.$api.map.serve.getServiceCustomerThreeSocialDetail({ id }).then(res => {
            instance.actions.updateComponent(i, {
              data: res
            })
            scene.actions.createSceneInstance(THREESOCIALLINKAGE_SCENEINDEX)
          })
        })
			},
			// 客户服务统一数据
			async getDataStatisticsList () {
				this.dataStatisticsInfo = await this.$api.map.serve.getServiceCustomerStatisticsInfo()
			},
			// 查询客户服务站点列表
			async getAllTypeStationList () {
				const params = {
					types: [
						'NetworkStation',
						'BranchCompany',
						'ThreeSocialLinkage'
					].toString()
				}
				const res = await this.$api.map.serve.getServiceCustomerStationList(
					params
				)
				this.allTypeStationList = { ...this.allTypeStationList, ...res }
			},
			// 查询三社联动站点列表

			// 获取任务工单列表
			async getTasklist () {
				const TaskList = await this.$api.map.serve.getServiceCustomerTaskList()
				this.allTypeStationList = {
					...this.allTypeStationList,
					TaskList
				}
			},
			// 查看详情接口
			getDetailInfo (params) {
				return this.$api.map.serve.getServiceCustomerDetialInfo(params)
			}
		},
		mounted () {
			document.addEventListener('DestroyScene', () => {
				this.closeOverlayDetail('')
			})
			this.getDataStatisticsList()
			this.getAllTypeStationList()
			this.getTasklist()
			this.getThreeSocialLinkagecustmerHot()
			const [{ value }] = this.swichBoxInfo

			this.visible = value
		}
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
