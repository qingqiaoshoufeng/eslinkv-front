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
				v-if="config.visible && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.visible"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
				:ref="config.component"
				@close="closeOverlayDetail"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			v-bind="{
				beforeClose: closeOverlayDetail,
				...OverlayDetailProp,
			}"
			ref="OverlayDetail"
			:width="450"
		>
			<TipDetial
				:data="activeOverlay"
				:detailInfo="detailInfo"
				v-show="showOverlayDetail"
			/>
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
let componentPageArr = [
	//legend覆盖物
	'BranchCompany',
	'TipDetial',
	'SaleAreaBoundary',
];
//页面所需公共组件
let componentCommonArr = [
	'DataStatistics',
	'RegionBoundary',
	'OverlayDetail',
	'MapLegend',
];
//异步加载组件函数
let componentPageMap = {};
let componentCommonMap = {};
componentPageArr.map(componentName => {
	componentPageMap[componentName] = () =>
		import('../Components/' + componentName);
});
componentCommonArr.map(componentName => {
	componentCommonMap[componentName] = () =>
		import('../../../../components/' + componentName);
});
// //页面覆盖物组件
// import {
// 	BranchCompany,
// 	TipDetial,
// 	SaleAreaBoundary,
// } from '../Components/index.js';
// //页面所需公共组件
// import {
// 	RegionBoundary,
// 	OverlayDetail,
// 	MapLegend,
// } from '../../../../components/index.js';
// // 页面配置项

// import { DataStatistics } from '../../../../components';
import {
	SERVICE_SERVICENINETEEN_LEGEND_MAP,
	SERVICE_SERVICENINETEEN_OVERLAY_MAP,
	DATASTATISTICSLIST,
} from './config';
export default {
	name: 'service19',
	components: {
		...componentPageMap,
		...componentCommonMap,
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
			center: [120.75522766, 30.33199066],
			activeArea: '',
			allTypeStationList: {},
			detailInfo: {},
		};
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
			}
			return {};
		},
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
		// 板块图变化
		saleAreaChange(val) {},
		async handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.activeOverlay = {};
			this.detailInfo = {};
			this.showOverlayDetail = false;

			let { lng, lat, name } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;

			this.getDetialInfo(name);
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
			this.detailInfo = {};
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
			res.branchCompanyList = res.branchCompanyList.filter(
				item => !item.name.includes('大江东')
			);

			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		// 请求详情数据
		async getDetialInfo(name) {
			let params = {
				chartQueryType: 0,
				dataAnalyseId: 901,
				dataType: 0,
				projectId: 20,
				queryId: 901,
				type: name,
			};
			params.params = JSON.stringify(params);
			let res = await this.$sysApi.map.serve.getNineteenStationDetailInfo(
				params
			);
			this.detailInfo = res[0];
			this.showOverlayDetail = this.$refs.BranchCompany[0].mouseIn;
		},
	},
	mounted() {
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