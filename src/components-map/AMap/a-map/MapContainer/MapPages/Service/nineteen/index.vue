<!-- 19厅 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary
			v-model="activeArea"
			@input="saleAreaChange"
			@mouseout="closeOverlayDetail('')"
		/>

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.isShow && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
				:ref="config.component"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			ref="OverlayDetail"
			:detialBoxWidth="450"
		>
			<TipDetial :data="activeOverlay" :detailInfo="detailInfo" />
		</OverlayDetail>
		<!-- 统计数据 -->
		<portal to="destination">
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
				:style="mapLegendStyle"
			/>
			<DataStatistics
				:position="'left'"
				:dataStatisticsList="dataStatisticsList"
				:data="dataStatisticsInfo"
			/>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import {
	BranchCompany,
	TipDetial,
	SaleAreaBoundary,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../../../components/index.js';
// 页面配置项

import { DataStatistics } from '../../../../components';
import {
	SERVICE_SERVICENINETEEN_LEGEND_MAP,
	SERVICE_SERVICENINETEEN_OVERLAY_MAP,
	DATASTATISTICSLIST,
} from './config';
export default {
	name: 'service19',
	components: {
		RegionBoundary,
		OverlayDetail,
		BranchCompany,
		DataStatistics,
		TipDetial,
		MapLegend,
		SaleAreaBoundary,
	},
	data() {
		return {
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICENINETEEN_LEGEND_MAP
			),
			dataStatisticsList: DATASTATISTICSLIST,
			dataStatisticsInfo: {},
			legendMap: SERVICE_SERVICENINETEEN_LEGEND_MAP,
			legendMultiple: true,
			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			showOverlayDetail: false,
			zoom: 10,
			center: [120.90522766, 30.33199066],
			activeArea: '杭州钱江燃气有限公司',
			allTypeStationList: {},
			detailInfo: {},
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
		// 板块图变化
		saleAreaChange(val) {
			this.$refs.BranchCompany[0].mouseIn = true;
			let params = this.allTypeStationList.branchCompanyList.find(
				item => item.name === val
			);
			params = {
				overlayType: 'BranchCompany',
				...params,
				detailList:
					SERVICE_SERVICENINETEEN_LEGEND_MAP.BranchCompany.detailList,
			};
			this.handleOverlayClick(params);
		},
		async handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat, name } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;

			let res = await this.getDetialInfo(name);
			this.showOverlayDetail = this.$refs.BranchCompany[0].mouseIn;
			this.detailInfo = res[0];
		},
		async getDataStatisticsList() {
			let params = {
				projectId: 20,
				queryId: 898,
				params: '',
			};
			let res = await this.$sysApi.map.serve.getNineteenStatisticsInfo(
				params
			);

			this.dataStatisticsInfo = res[0];
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$emit('close');
			// this.$amap.setZoom(11, 100);
			done && done();
		},
		// 请求集团大厅，子公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				types: ['BranchCompany'].toString(),
			};

			let res = await this.$sysApi.map.serve.getICcustomerStationList(
				params
			);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		// 请求详情数据
		getDetialInfo(name) {
			let params = {
				chartQueryType: 0,
				dataAnalyseId: 901,
				dataType: 0,
				projectId: 20,
				queryId: 901,
				type: name,
			};
			params.params = JSON.stringify(params);
			return this.$sysApi.map.serve.getNineteenStationDetailInfo(params);
		},
	},
	mounted() {
		this.getAllTypeStationList();
		this.getDataStatisticsList();
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