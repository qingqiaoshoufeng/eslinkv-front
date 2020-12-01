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
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.legendIcon"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:ref="config.component"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:detialBoxWidth="'450px'"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			@view-detail="showOverlayDetail"
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
				@list-click="handleListClick"
				@overlay-click="handleOverlayClick"
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
//页面覆盖物组件
import {
	// ICcustomer,
	RightPanelWithServiceICcustomer,
	BranchCompany,
	MajorClient,
	WarningICcustomer,
	TipDetial,
	SaleAreaBoundary,
	SwitchBox,
	useHotYear,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import { DataStatistics } from '../../../../components';
import {
	SERVICE_SERVICEICCUSTOMER_LEGEND_MAP,
	SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP,
	DATASTATISTICSLIST,
	SWICHBOX,
} from './config';
export default {
	name: 'serviceICcustomer',
	components: {
		RegionBoundary,
		OverlayDetail,
		DataStatistics,
		RightPanelWithServiceICcustomer,
		MapLegend,
		BranchCompany,
		MajorClient,
		TipDetial,
		WarningICcustomer,
		SaleAreaBoundary,
		iSwitchBox: SwitchBox,
		useHotYear,
	},
	data() {
		let {
			MajorClient,
			WarningICcustomer,
		} = SERVICE_SERVICEICCUSTOMER_LEGEND_MAP;
		return {
			overlayInfoConfig: Object.freeze(
				SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP
			),
			dataStatisticsList: DATASTATISTICSLIST,
			overlayMap: SERVICE_SERVICEICCUSTOMER_LEGEND_MAP,
			legendMap: { MajorClient },
			legendMultiple: true,
			showOverlayDetail: false,
			activeOverlay: {},
			center: [120.061259, 30.183295],
			zoom: 10,
			allTypeStationList: {},
			detailInfo: {},
			ICcustomerDetailInfo: {},
			isShowMore: false,
			activeArea: '杭州钱江燃气有限公司',
			swichBoxInfo: SWICHBOX,
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	methods: {
		// 板块图变化
		saleAreaChange(val) {
			console.log(val);
			let params = this.allTypeStationList.branchCompanyList.find(
				item => item.name === val
			);
			params = {
				...params,
				detailList:
					SERVICE_SERVICEHANGRANCODE_LEGEND_MAP.BranchCompany
						.detailList,
			};
			console.log(params);
			this.handleOverlayClick(params);
		},
		// 切换热力图显示隐藏
		switchChange(data, type) {
			this.swichBoxInfo = data;
			let [{ value }] = this.swichBoxInfo;
			this.overlayMap.useHotYear.isShow = value;
		},
		closeOverlayDetail(done) {
			done();
		},
		// 点击地图marker
		handleOverlayClick(overlay, overlayType, isCenter = false) {
			console.log(overlay);
			overlay.overlayType = overlayType || overlay.overlayType;
			let { lng, lat, id, overlayType: type, detailList } = overlay;
			let params = {
				id,
				type,
				params: detailList.map(item => item.prop).toString(),
			};
			this.getDetailInfo(params);

			this.activeOverlay = overlay;
			this.isShowMore = ['WarningICcustomer'].includes(type);

			console.log(this.isShowMore, type);
		},

		async getAllTypeStationList() {
			let params = {
				type: ['MajorClient', 'BranchCompany'],
			};
			this.allTypeStationList = await this.$sysApi.map.serve.getICcustomerList(
				params
			);
			console.log(this.allTypeStationList);
		},

		// 联码新增统计数据
		async getDataStatisticsList() {
			this.ICcustomerDetailInfo = await this.$sysApi.map.serve.getICcustomerCallingInfo();
		},

		// 请求用气大户，分公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				type: ['MajorClient', 'BranchCompany'],
			};
			let res = await this.$sysApi.map.serve.getHangranCodeList(params);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		// 获取热力图信息
		async getAllHotList() {
			let params = {
				type: ['useHotYear'],
			};
			let res = await this.$sysApi.map.serve.getHangranCodeHotList();
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		//获取站点详情
		async getDetailInfo(params) {
			console.log(params);
			this.detailInfo = await this.$sysApi.map.serve.getICcustomerDetailInfo(
				params
			);
			this.showOverlayDetail = true;
		},
		// 获取右侧table列表报警信息
		async getWarningList(params) {
			console.log(params);
			let WarningICcustomerList = await this.$sysApi.map.serve.getICcustomerSituationAwareness(
				params
			);
			WarningICcustomerList = WarningICcustomerList.filter(
				item => item.status === '1'
			);
			this.allTypeStationList = {
				...this.allTypeStationList,
				WarningICcustomerList,
			};
			console.log(this.allTypeStationList);
		},
		handleListClick(item) {
			console.log(item);
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			//和场景进行交互
			GoldChart.scene.setSceneIndex(
				SERVICE_SERVICEHANGRANCODE_LEGEND_MAP
			);
			//更新数据
			this.$nextTick(() => {
				AIRSUPPLY_WARN_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i);
				});
			});
		},
	},
	mounted() {
		this.getDataStatisticsList();
		this.getAllTypeStationList();
		this.getWarningList();
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