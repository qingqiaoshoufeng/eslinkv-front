<!-- 客户服务 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 态势感知 -->
		<!-- <ListOverlay @overlay-click="handleOverlayClick" /> -->

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.isShow && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.isShow"
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

		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:detialBoxWidth="450"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="showMoreDetail"
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
	SERVICE_SERVICECUSTOMER_LEGEND_MAP,
	SERVICE_SERVICECUSTOMER_OVERLAY_MAP,
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
			center: [120.061259, 30.233295],
			zoom: 10,
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
		};
	},

	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.setCenter(this.center, 100);
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
		showMoreDetail() {
			this.showThreeSocialLinkageDetail();
		},
		async handleOverlayClick(overlay, overlayType1, isCenter = false) {
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

				this.handleListClick(overlay);
				return;
			}
			this.activeOverlay = overlay;
			console.log(overlayType);

			console.log(this.$refs);
			// console.log(this.$refs.overlayType, '余志强');
			this.showOverlayDetail = this.$refs[overlayType][0].mouseIn;
			// console.log(this.$refs.overlayType.mouseIn);
			this.isShowMore = ['ThreeSocialLinkage'].includes(overlayType);
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
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
			// debugger;
			let { name, time, activeIndex, overlayType } = item;
			if (overlayType === 'ThreeSocialLinkage') {
				this.$refs.ThreeSocialLinkage[0].mouseIn = true;
				this.handleOverlayClick(item);
				return;
			}
			this.activeIndex = activeIndex;
			this.activeOverlay = {
				...item,
				detailList:
					SERVICE_SERVICECUSTOMER_LEGEND_MAP.TaskList.detailList,
			};

			this.detailInfo = item;

			this.showOverlayDetail = true;
		},
		showThreeSocialLinkageDetail() {
			//打开三社联动的弹框
			GoldChart.scene.createSceneInstance(THREESOCIALLINKAGE_SCENEINDEX);
			//更新数据
			this.$nextTick(() => {
				THREESOCIALLINKAGE_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i, {
						data: {
							title: `${this.activeOverlay.name}`,
							startTime: '2020/10/01  08:30',
							endTime: '2020/10/01  08:30',
							place: '桂花城紫云苑',
							people: '退休职工',
							peopleNum: 220,
							planNum: 160,
							content:
								'为积极彰显企业担当，更好地为用户提供优质满意的杭燃服务。9月13日上午，杭天管网输配子公司28名正气志愿者\n            联合杭天服务发展公司27名工作人员，走进盛德嘉苑、假山新村、天时苑、盛德欣苑等小区开展“三社联动、安心安\n            居”杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份...27名工作人员，走进盛德嘉苑、假山新村、天时苑、盛德欣苑等小区开展“三社联动、安心安\n            居”杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份...\n            杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份\n            杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份',
							securityCheckRate: 90,
							planCheckNum: 120,
							brochuresNum: 210,
							uSaleNum: 64,
							uSaleMoney: '24,910',
							actualCheckNum: 120,
							installNum: 60,
							repairNum: 120,
							imgList: [
								{
									img: '/static/images/project/01.png',
								},
								{
									img: '/static/images/project/02.png',
								},
								{
									img: '/static/images/project/03.jpg',
								},
								{
									img: '/static/images/project/04.jpg',
								},
							],
							video: '/cdn/videos/sanshe.MOV',
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
		window.setCenter = this.setCenter.bind(this);
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
