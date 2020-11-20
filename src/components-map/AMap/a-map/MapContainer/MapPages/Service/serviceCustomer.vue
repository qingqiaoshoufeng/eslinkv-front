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
} from './Components/index.js';
//页面所需公共组件
import MapLegend from '../../MapLegend';
import { RegionBoundary, OverlayDetail } from '../Components/index.js';
import { DataStatistics } from '../../../components';
import pageMixin from '../mixins/pageMixin.js';
import {
	// SERVICELEGEND_CUSTOMER,
	SERVICELEGENDCUSTOMERMAP,
	OVERLAYINFOMAP_SERVICE_CUSTOMER,
	THREESOCIALLINKAGE_SCENEINDEX,
	THREESOCIALLINKAGE_COMPONENTINDEX,
} from '../../../config';
import GoldChart from '@/openApi';

console.log(MapLegend, 'saddadd');
export default {
	name: 'serviceCustomer',
	mixins: [pageMixin],
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
			overlayInfoConfig: Object.freeze(OVERLAYINFOMAP_SERVICE_CUSTOMER),
			dataStatisticsList: [],
			OverlayDetail: null,
			// legendMap1: SERVICELEGENDCUSTOMERMAP,
			legendMultiple: true,
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
	},
	methods: {
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
		toViewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			console.log(overlayType + 1111111111111);
			console.log(overlay);
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
						video: '/static/videos/三社联动视频.MOV',
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
