<!-- 杭燃码 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 1.区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea" @input="saleAreaChange" />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in overlayMap">
			<component
				v-if="
					config.isShow &&
					allTypeStationList[config.dataProp] &&
					allTypeStationList[config.dataProp].length &&
					config.component
				"
				:key="config.component"
				:visible="config.isShow"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				:data="allTypeStationList[config.dataProp]"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				:ref="config.component"
			/>
		</template>

		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:detialBoxWidth="450"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			@view-detail="showOverlayDetail"
			ref="OverlayDetail"
			:left="left"
		>
			<TipDetial :data="activeOverlay" :detailInfo="detailInfo" />
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
//页面覆盖物组件
import {
	CouplingHot,
	OperationHot,
	SwitchBox,
	Grouphall,
	BranchCompany,
	ServiceStation,
	TipDetial,
	SaleAreaBoundary,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import pageMixin from '../../mixins/pageMixin';
import {
	SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
	SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
	DATASTATISTICSLIST,
	SWICHBOX,
} from './config';
import { DataStatistics } from '../../../../components';
export default {
	name: 'hangranCode',
	mixins: [pageMixin],
	components: {
		RegionBoundary,
		CouplingHot,
		OperationHot,
		DataStatistics,
		MapLegend,
		iSwitchBox: SwitchBox,
		Grouphall,
		BranchCompany,
		ServiceStation,
		OverlayDetail,
		TipDetial,
		SaleAreaBoundary,
	},
	data() {
		let {
			Grouphall,
			BranchCompany,
			ServiceStation,
		} = SERVICE_SERVICEHANGRANCODE_LEGEND_MAP;
		return {
			overlayInfoConfig: Object.freeze(
				SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP
			),
			dataStatisticsList: DATASTATISTICSLIST,
			overlayMap: SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
			legendMap: { Grouphall, BranchCompany, ServiceStation },

			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			legendMultiple: true,
			showOverlayDetail: false,
			center: [120.80971, 30.102216],
			zoom: 10,
			allTypeStationList: {},
			detailInfo: {},
			couplingIncreaseInfo: {},
			activeArea: '杭州钱江燃气有限公司',
			left: 10,
			swichBoxInfo: SWICHBOX,
		};
	},
	// created() {
	// 	this.$amap = this.$parent.$amap;
	// 	this.$amap.setZoom(this.zoom, 100);
	// 	this.$amap.panTo(this.center, 100);
	// },
	created() {
		this.$nextTick(() => {
			this.mapFitView(-0.2, 0.4, 0.2);
		});
	},
	methods: {
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
		// 关闭详情
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;

			if (overlayType === 'WARNEVENT') {
				GoldChart.scene.setSceneIndex(
					INDEXSCENEMAP['ServiceHangranCode']
				);
				this.showRoutePlan = false;
			}
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			done();
		},
		// 点击地图marker
		handleOverlayClick(overlay, overlayType, isCenter = false) {
			console.log(overlay);
			let { lng, lat, id, overlayType: type, detailList, name } = overlay;
			let params = {
				id,
				type,
				name,
				params: detailList.map(item => item.prop).toString(),
			};
			this.getDetailInfo(params);
			// overlay.overlayType = overlayType || overlayType;
			this.activeOverlay = overlay;
			console.log(type);
			this.left = ['BranchCompany', 'Grouphall'].includes(type) ? 15 : 10;
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
		},
		// 联码新增统计数据
		async getDataStatisticsList() {
			this.couplingIncreaseInfo = await this.$sysApi.map.serve.getCouplingIncreaseInfo();
		},
		// 请求集团大厅，分公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				types: [
					'Grouphall',
					'BranchCompany',
					'ComprehensiveServiceStation',
				].toString(),
			};
			console.log(params);
			let res = await this.$sysApi.map.serve.getHangranCodeList(params);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
			console.log(this.allTypeStationList, '余志强');
		},
		// 获取热力图信息
		async getAllHotList() {
			let params = {
				type: ['total', 'month'],
			};
			let res;
			try {
				res = await this.$sysApi.map.serve.getHangranCodeHotList();
			} catch (error) {
				// res = { total: [], month: [] };
				res = {};
			}

			console.log(res, 1111322322);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
			console.log(this.allTypeStationList, '余志强');
		},
		//获取站点详情
		async getDetailInfo(params) {
			this.detailInfo = await this.$sysApi.map.serve.getHangranCodeDetailInfo(
				params
			);
			this.showOverlayDetail = true;
		},
		// 切换热力图显示隐藏
		switchChange(data, type) {
			if (type === 'coupling' && data[0].value) {
				data[1].value = false;
			} else if (type === 'operation' && data[1].value) {
				data[0].value = false;
			}
			this.swichBoxInfo = data;
			let [{ value: value1 }, { value: value2 }] = this.swichBoxInfo;
			this.overlayMap.CouplingHot.isShow = value1;
			this.overlayMap.OperationHot.isShow = value2;
		},
	},
	mounted() {
		this.getAllHotList();
		this.getDataStatisticsList();
		this.getAllTypeStationList();
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