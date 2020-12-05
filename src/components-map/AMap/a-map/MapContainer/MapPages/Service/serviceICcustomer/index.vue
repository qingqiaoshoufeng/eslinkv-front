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
				v-if="config.isShow && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
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
} from '../../../../components/index.js';
import { DataStatistics } from '../../../../components';
import {
	SERVICE_SERVICEICCUSTOMER_LEGEND_MAP,
	SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP,
	DATASTATISTICSLIST,
	SWICHBOX,
} from './config';
import {
	ICcustomer_WARN__SCENEINDEX,
	ICcustomer_WARN__COMPONENTINDEX,
} from '../../../../config';
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
			BranchCompany,
			WarningICcustomer,
		} = SERVICE_SERVICEICCUSTOMER_LEGEND_MAP;
		return {
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICEICCUSTOMER_OVERLAY_MAP
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
			activeArea: '杭州钱江燃气有限公司',
			swichBoxInfo: SWICHBOX,
			WarningDetialInfo: {},
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	watch: {
		center(val) {
			this.$amap.panTo(val, 100);
		},
	},
	methods: {
		setCenter(center) {
			this.center = center || this.center;
			console.log(this.center);
		},
		// 查看详情，弹出详情场景
		async showMoreDetail() {
			let { address, content, status, id } = this.activeOverlay;
			let { useNumberYestoday } = this.detailInfo;
			console.log(this.activeOverlay, this.detailInfo);
			let params = {};
			console.log(address);
			params[ICcustomer_WARN__COMPONENTINDEX[0]] = {
				title: address,
			};
			params[ICcustomer_WARN__COMPONENTINDEX[1]] = {
				value: `${content}(${status === '1' ? '待处理' : '已处理'})`,
			};
			params[ICcustomer_WARN__COMPONENTINDEX[2]] = {
				value: useNumberYestoday,
			};
			let {
				total,
				instant,
				pressure,
				temperature,
			} = await this.getICcustomerWarningDetialInfo(id);
			params[ICcustomer_WARN__COMPONENTINDEX[3]] = total;
			params[ICcustomer_WARN__COMPONENTINDEX[4]] = instant;
			params[ICcustomer_WARN__COMPONENTINDEX[5]] = pressure;
			params[ICcustomer_WARN__COMPONENTINDEX[7]] = temperature;
			GoldChart.scene.createSceneInstance(
				ICcustomer_WARN__SCENEINDEX,
				'slideRight'
			);
			this.$nextTick(() => {
				ICcustomer_WARN__COMPONENTINDEX.forEach(item => {
					console.log(item);
					console.log(params[item]);
					GoldChart.instance.updateComponent(item, {
						data: params[item],
					});
				});
			});

			// params.
		},
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
			this.showOverlayDetail = false;
			done();
		},
		// 点击地图marker
		handleOverlayClick(overlay, overlayType, isCenter = false) {
			console.log(overlay);
			overlay.overlayType = overlayType || overlay.overlayType;
			let {
				lng,
				lat,
				id,
				overlayType: type,
				detailList,
				name,
				status,
			} = overlay;
			let params = {
				name,
				id,
				type,
				params: 'useNumberYestoday',
			};
			this.getDetailInfo(params, status);

			this.activeOverlay = overlay;
			console.log(type);
			this.isShowMore = ['WarningICcustomer'].includes(type);
		},
		// 请求用气大户，子公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				types: ['MajorClient', 'BranchCompany'].toString(),
			};
			console.log(params, 33333);
			let res = await this.$sysApi.map.serve.getICcustomerStationList(
				params
			);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
			console.log(this.allTypeStationList, 111111111);
		},

		// 联码新增统计数据
		async getDataStatisticsList() {
			this.ICcustomerDetailInfo = await this.$sysApi.map.serve.getICcustomerCallingInfo();
		},

		// 获取热力图信息
		async getAllHotList() {
			let res = await this.$sysApi.map.serve.getICcustomerHotInfo();
			console.log(res, 121212);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
			console.log(this.allTypeStationList, 111111);
		},
		//获取站点详情
		async getDetailInfo(params, status) {
			console.log(params, status);
			console.log(params);
			this.detailInfo = await this.$sysApi.map.serve.getICcustomerDetailInfo(
				params
			);
			if (status && status === '0') {
				this.detailInfo.ICcustomerStatus = '已处理';
			} else if (status && status === '1') {
				this.detailInfo.ICcustomerStatus = '待处理';
			}
			this.showOverlayDetail = true;
		},
		// 获取右侧table列表报警信息
		async getWarningList(params) {
			console.log(params);
			let WarningICcustomerList = await this.$sysApi.map.serve.getICcustomerSituationAwareness(
				params
			);
			// WarningICcustomerList = WarningICcustomerList.filter(
			// 	item => item.status === '1'
			// );
			this.allTypeStationList = {
				...this.allTypeStationList,
				WarningICcustomerList,
			};
			console.log(this.allTypeStationList);
		},
		handleListClick(item) {
			console.log(item);
		},
		// 查看态势感知详情列表
		getICcustomerWarningDetialInfo(id) {
			let params = {
				id,
			};
			return this.$sysApi.map.serve.getICcustomerWarningDetialInfo();
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
		this.getAllHotList();
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