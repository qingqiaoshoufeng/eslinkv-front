<!-- 杭燃码 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
        <SaleAreaBoundary /> 
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in overlayMap">
			<component
				v-if="config.isShow"
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.icon"
				:overlayType="legend"
				:is="config.component"
				:data="allTypeStationList[config.dataProp]"
				@overlay-click="handleOverlayClick"
				:ref="config.component"
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
			<TipDetial :data="activeOverlay" />
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
			<DataStatistics :position="'left'" :data="dataStatisticsList" />
			<!-- 选择器盒子 -->
			<i-switchBox @switch-change="change" />
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
    SaleAreaBoundary
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import {
	SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
	SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
} from './config';
import { DataStatistics } from '../../../../components';
export default {
	name: 'hangranCode',
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
        SaleAreaBoundary
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
			dataStatisticsList: [],
			overlayMap: SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
			legendMap: { Grouphall, BranchCompany, ServiceStation },
			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			legendMultiple: true,
			showOverlayDetail: false,
			center: [120.80971, 30.102216],
			zoom: 10,
			allTypeStationList: {},
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	methods: {
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
			this.$amap.setZoom(11, 100);
			done();
		},
		// 点击地图marker
		handleOverlayClick(overlay, overlayType, isCenter = false) {
			console.log(111);
			console.log(overlay);
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
		},
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
		// 请求集团大厅，分公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				type: [
					'Grouphall',
					'BranchCompany',
					'ComprehensiveServiceStation',
				],
			};
			this.allTypeStationList = await this.$sysApi.map.serve.getHangranCodeList(
				params
			);
			console.log(this.allTypeStationList);
		},
		// 切换热力图显示隐藏
		change(data) {
			let { switch1, switch2 } = data;
			this.overlayMap.CouplingHot.isShow = switch1;
			this.overlayMap.OperationHot.isShow = switch2;
		},
	},
	mounted() {
		this.getDataStatisticsList();
		this.getAllTypeStationList();
		console.log(this.overlayMap);
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