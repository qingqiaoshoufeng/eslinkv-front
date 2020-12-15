<!-- 客户服务 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
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
//页面覆盖物组件
import {
	ThreeSocialLinkage,
	ServiceNetworkStation,
	Grouphall,
	BranchCompany,
	RightPanelWithServiceCustomer,
	TipDetial,
	TaskList,
	ClickTaskList,
	CustomerHot,
	SwitchBox,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../../../components/index.js';
import { DataStatistics } from '../../../../components';
import {
	INDEXSCENEMAP,
	THREESOCIALLINKAGE_SCENEINDEX,
	THREESOCIALLINKAGE_COMPONENTINDEX,
} from '../../../../config';

import GoldChart from '@/openApi';
import {
	DATASTATISTICSLIST,
	SWICHBOX,
	SERVICE_SERVICECUSTOMER_LEGEND_MAP,
	SERVICE_SERVICECUSTOMER_OVERLAY_MAP,
	SERVICE_SERVICECUSTOMER_UN_LEGEND_MAP,
} from './config.js';

export default {
	name: 'ServiceCustomer',
	components: {
		ThreeSocialLinkage,
		ServiceNetworkStation,
		RegionBoundary,
		OverlayDetail,
		Grouphall,
		BranchCompany,
		DataStatistics,
		RightPanelWithServiceCustomer,
		MapLegend,
		TipDetial,
		TaskList,
		ClickTaskList,
		CustomerHot,
		iSwitchBox: SwitchBox,
	},
	data() {
		return {
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICECUSTOMER_OVERLAY_MAP
			),
			showOverlayDetail: false,
			activeOverlay: {},
			OverlayDetail: null,
			legendMap: SERVICE_SERVICECUSTOMER_LEGEND_MAP,
			legendMultiple: true,
			center: [120.080259, 30.263295],
			zoom: 11,
			allTypeStationList: {},
			dataStatisticsList: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				citizenNumber: 0,
				publicBuildNumber: 0,
				industryNumber: 0,
				businessServe: 0,
			},
			detailInfo: {},
			isShowMore: false,
			activeIndex: null,
			swichBoxInfo: SWICHBOX,
			visible: false,
		};
	},

	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.setCenter(this.center, 100);
	},
	computed: {
		OverlayDetailProp() {
			let { activeOverlay, overlayInfoConfigMap, legendMap } = this;
			if (JSON.stringify(activeOverlay) !== '{}') {
				let { overlayType } = activeOverlay;
				//详情展示信息配置
				let overlayDetailConfig =
					overlayInfoConfigMap[overlayType] || {};
				let legendConfig = legendMap[overlayType] || {};
				//图标大小，是否显示关闭按钮，是否显示查看详情
				let {
					iconSize = 38,
					showPopCloseBtn: showCloseBtn,
					showMore,
				} = legendConfig;
				return {
					data: activeOverlay,
					iconSize,
					showCloseBtn,
					overlayDetailConfig,
					showMore,
				};
			} else {
				return {};
			}
		},
	},
	watch: {
		center(val) {
			this.$amap.panTo(val, 100);
		},
	},
	methods: {
		setCenter(center) {
			this.center = center || this.center;
		},
		// 切换热力图显示隐藏
		switchChange(data, type) {
			this.swichBoxInfo = data;
			let [{ value }] = this.swichBoxInfo;

			this.visible = value;
		},
		showMoreDetail() {
			this.showThreeSocialLinkageDetail();
		},
		async getThreeSocialLinkagecustmerHot() {
			let res = await this.$sysApi.map.serve.getThreeSocialLinkagecustmerHot();

			this.allTypeStationList.CustomerHotList = res.customer;
		},
		async handleOverlayClick(overlay, overlayType1, isCenter = false) {
			this.activeOverlay = {};
			this.detailInfo = {};
			this.showOverlayDetail = false;
			let { lng, lat, type, name, id, overlayType } = overlay;
			let params = {
				name,
				id,
				type,
			};

			if (['BranchCompany'].includes(overlayType)) {
				this.detailInfo = await this.getDetailInfo(params);
			} else if (overlayType === 'TaskList') {
				overlay.activeIndex = this.allTypeStationList.TaskList.findIndex(
					item => item.id === overlay.id
				);
				this.isShowMore = false;
				this.handleListClick(overlay);
				return;
			}
			this.activeOverlay = overlay;

			this.showOverlayDetail = this.$refs[overlayType][0].mouseIn;

			this.isShowMore = ['ThreeSocialLinkage'].includes(overlayType);
			if (['ThreeSocialLinkage', 'TaskList'].includes(overlayType)) {
				this.$amap.setZoom(14, 100);
				this.$amap.panTo([lng, lat], 100);
			}
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.detailInfo = {};
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.panTo(this.center, 100);
			this.activeIndex = -1;
			// this.activeOverlay = {};
			done && done();
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
		},

		toViewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			this.OverlayDetail = overlay;
			let viewOverlayHandlerMap = {
				ThreeSocialLinkage: 'showThreeSocialLinkageDetail',
			};
			let handler = viewOverlayHandlerMap[overlayType];
			if (handler) {
				this[handler](overlay);
			}
		},
		handleListClick(item) {
			let {
				name,
				time,
				activeIndex,
				overlayType,
				lng,
				lat,
				address,
			} = item;
			if (overlayType === 'ThreeSocialLinkage') {
				this.$refs.ThreeSocialLinkage[0].mouseIn = true;
				this.handleOverlayClick(item);
				return;
			}
			// 更新任务工单位置
			this.allTypeStationList.TaskList[activeIndex] = {
				...this.allTypeStationList.TaskList[activeIndex],
				lng,
				lat,
			};
			this.isShowMore = false;
			this.activeIndex = activeIndex;
			this.activeOverlay.activeIndex = activeIndex;
			console.log(this.activeIndex, this.activeOverlay);
			this.activeOverlay = {
				...item,
				detailList:
					SERVICE_SERVICECUSTOMER_UN_LEGEND_MAP.TaskList.detailList,
			};

			this.detailInfo = item;
			this.$amap.setZoom(14, 100);
			this.$amap.panTo([lng, lat], 100);
			this.showOverlayDetail = true;
		},
		showThreeSocialLinkageDetail() {
			let { id } = this.activeOverlay;

			//打开三社联动的弹框
			GoldChart.scene.createSceneInstance(THREESOCIALLINKAGE_SCENEINDEX);
			this.$nextTick(() => {
				THREESOCIALLINKAGE_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i, {
						params: {
							id,
						},
					});
				});
			});
		},
		// 客户服务统一数据
		async getDataStatisticsList() {
			this.dataStatisticsInfo = await this.$sysApi.map.serve.getServiceCustomerStatisticsInfo();
		},
		// 查询客户服务站点列表
		async getAllTypeStationList() {
			let params = {
				types: [
					'NetworkStation',
					'BranchCompany',
					'ThreeSocialLinkage',
				].toString(),
			};
			let res = await this.$sysApi.map.serve.getServiceCustomerStationList(
				params
			);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		// 查询三社联动站点列表

		// 获取任务工单列表
		async getTasklist() {
			let TaskList = await this.$sysApi.map.serve.getServiceCustomerTaskList();
			this.allTypeStationList = {
				...this.allTypeStationList,
				TaskList,
			};
		},
		// 查看详情接口
		getDetailInfo(params) {
			return this.$sysApi.map.serve.getServiceCustomerDetialInfo(params);
		},
	},
	mounted() {
		this.getDataStatisticsList();
		this.getAllTypeStationList();
		this.getTasklist();
		this.getThreeSocialLinkagecustmerHot();
		window.setCenter = this.setCenter.bind(this);
		let [{ value }] = this.swichBoxInfo;

		this.visible = value;
	},
};
</script>
<style lang="scss" scoped>
.map-legend {
	position: absolute;
	bottom: 50px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
