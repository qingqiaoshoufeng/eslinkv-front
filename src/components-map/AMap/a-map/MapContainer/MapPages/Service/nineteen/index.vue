<!-- 19厅 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea" @input="saleAreaChange" />

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
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			ref="OverlayDetail"
			:detialBoxWidth="450"
		>
			<TipDetial :data="activeOverlay" />
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
			overlayInfoConfig: Object.freeze(
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
			center: [120.80971, 30.202216],
			activeArea: '杭州钱江燃气有限公司',
			allTypeStationList: {},
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
					SERVICE_SERVICENINETEEN_LEGEND_MAP.BranchCompany.detailList,
			};
			this.handleOverlayClick(params);
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			// this.$amap.setZoom(14, 100);
			// if (isCenter) {
			// 	this.$nextTick(() => {
			// 		this.$amap.panTo([lng, lat], 100);
			// 	});
			// }
		},
		async getDataStatisticsList() {
			console.log(222222222222);
			let params = {
				projectId: 20,
				queryId: 898,
				params: '',
			};
			let res = await this.$sysApi.map.serve.getNineteenStatisticsInfo(
				params
			);
			// console.log(res[0]['accept_2hour_rate']);
			// res[0]['accept_2hour_rate'] =
			// 	(res[0]['accept_2hour_rate'] * 100).toFixed(2) + '%';
			this.dataStatisticsInfo = res[0];
			console.log(222222222222);
			console.log(this.dataStatisticsInfo);
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$emit('close');
			this.$amap.setZoom(11, 100);
			done();
		},
		// 请求集团大厅，子公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				types: ['BranchCompany'].toString(),
			};
			console.log(params);
			let res = await this.$sysApi.map.serve.getHangranCodeList(params);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
			console.log(this.allTypeStationList, '余志强');
		},
	},
	mounted() {
		console.log(this.overlayInfoConfig);
		this.getAllTypeStationList();
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