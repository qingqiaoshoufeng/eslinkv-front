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
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.icon"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			@view-detail="toViewOverlayDetail"
			ref="OverlayDetail"
		/>
		<portal to="destination">
			<!-- 图例 -->
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
			/>
			<!-- 统计数据 -->
			<DataStatistics :data="dataStatisticsList" />
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
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import { DataStatistics } from '../../../../components';
import {
	INDEXSCENEMAP,
	THREESOCIALLINKAGE_SCENEINDEX,
	THREESOCIALLINKAGE_COMPONENTINDEX,
} from '../../../../config';

import GoldChart from '@/openApi';
import {
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
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(
				SERVICE_SERVICECUSTOMER_OVERLAY_MAP
			),
			showOverlayDetail: false,
			activeOverlay: {},
			dataStatisticsList: [],
			OverlayDetail: null,
			legendMap: SERVICE_SERVICECUSTOMER_LEGEND_MAP,
			legendMultiple: true,
			center: [120.061259, 30.233295],
			zoom: 11,
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center);
	},
	methods: {
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			this.$amap.setZoom(14, 100);
			if (isCenter) {
				this.$nextTick(() => {
					this.$amap.panTo([lng, lat], 100);
				});
			}
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			if (overlayType === 'WARNEVENT') {
				GoldChart.scene.setSceneIndex(
					INDEXSCENEMAP['AirSupplyHighPressure']
				);
				this.showRoutePlan = false;
			}
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$amap.setZoom(11, 100);
			done();
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			console.log(overlay, 'overlay');
			if (overlayType === 'WARNEVENT') {
				console.log('渲染路径，23');
				this.showRoutePlan = true;
				console.log(overlay);
				let { content, address } = overlay;
				//和场景进行交互
				GoldChart.scene.setSceneIndex(AIRSUPPLY_WARN_SCENEINDEX);
				//更新数据
				this.$nextTick(() => {
					AIRSUPPLY_WARN_COMPONENTINDEX.forEach(i => {
						GoldChart.instance.updateComponent(i, {
							step: 8,
							value: {
								step1: {
									time: new Date('2020-10-30 22:20') * 1,
									des: content,
									name: '王磊',
									title: '报警人',
									address: address,
								},
								step2: {
									time: new Date('2020-10-30 22:21') * 1,
									name: '秦芳芳',
									title: '客服部',
								},
								step3: {
									time: new Date('2020-10-30 22:31') * 1,
									name: '林自原',
									title: '维修部',
								},
								step4: {
									time: new Date('2020-10-30 22:48') * 1,
								},
								step5: {
									time: new Date('2020-10-30 23:13') * 1,
								},
								step6: {
									time: new Date('2020-10-30 23:50') * 1,
								},
								step7: {
									time: new Date('2020-10-31 11:21') * 1,
								},
								step8: {
									time: new Date('2020-10-31 12:57') * 1,
									title: '维修处置内容',
									content:
										'部分管道老旧破损严重导致燃气泄漏，关闭上游阀门后更换泄漏段管道，已恢复供气。',
								},
							},
							videoInfo1: {
								imgList: [
									'/static/images/project/01.png',
									'/static/images/project/02.jpg',
								],
								videoList: ['/static/videos/test.mov'],
							},
							videoInfo2: {
								imgList: [
									'/static/images/project/01.png',
									'/static/images/project/02.jpg',
								],
								videoList: ['/static/videos/test.mov'],
							},
						});
					});
				});
			}
		},
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
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
			console.log(item);
		},
		showThreeSocialLinkageDetail() {
			//打开三社联动的弹框
			GoldChart.scene.createSceneInstance(THREESOCIALLINKAGE_SCENEINDEX);
			//更新数据
			this.$nextTick(() => {
				THREESOCIALLINKAGE_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i, {
						title: `${this.OverlayDetail.name}`,
						startTime: '2020/10/01  08:30',
						endTime: '2020/10/01  08:30',
						place: '桂花城紫云苑',
						people: '退休职工',
						peopleNum: 220,
						planNum: 160,
						content:
							'为积极彰显企业担当，更好地为用户提供优质满意的杭燃服务。9月13日上午，杭天管网输配分公司28名正气志愿者\n            联合杭天服务发展公司27名工作人员，走进盛德嘉苑、假山新村、天时苑、盛德欣苑等小区开展“三社联动、安心安\n            居”杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份...27名工作人员，走进盛德嘉苑、假山新村、天时苑、盛德欣苑等小区开展“三社联动、安心安\n            居”杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份...\n            杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份\n            杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份',
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
						video: '/static/videos/1.mp4',
					});
				});
			});
		},
	},
	mounted() {
		this.getDataStatisticsList();
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
