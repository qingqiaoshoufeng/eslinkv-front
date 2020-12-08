<!-- 杭燃码 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 1.区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary
			v-model="activeArea"
			@input="saleAreaChange"
			@mouseout="closeOverlayDetail('')"
		/>
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
				@close="closeOverlayDetail('')"
			/>
		</template>

		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:width="detialBoxWidth"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="showOverlayDetail"
			ref="OverlayDetail"
			:left="left"
		>
			<component
				:is="detailComponentName"
				:data="activeOverlay"
				:detailInfo="detailInfo"
			/>
			<!-- <TipDetial :data="activeOverlay" :detailInfo="detailInfo"  /> -->
			<!-- <ClickTipDetial :data="activeOverlay" :detailInfo="detailInfo" /> -->
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
	ClickTipDetial,
	SaleAreaBoundary,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../../../components/index.js';
import pageMixin from '../../../../mixins/pageMixin';
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
		ClickTipDetial,
		SaleAreaBoundary,
	},
	data() {
		let {
			Grouphall,
			BranchCompany,
			ServiceStation,
		} = SERVICE_SERVICEHANGRANCODE_LEGEND_MAP;
		return {
			overlayInfoConfigMap: Object.freeze(
				SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP
			),
			dataStatisticsList: DATASTATISTICSLIST,
			overlayMap: SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
			legendMap: {
				// Grouphall,
				BranchCompany,
				//  ServiceStation
			},

			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			legendMultiple: true,
			showOverlayDetail: false,
			// 120.12039185； 纬度：30.17273413
			// center: [120.80971, 30.102216],
			center: [120.90522766, 30.53565084],
			zoom: 10,
			allTypeStationList: {},
			detailInfo: {},
			couplingIncreaseInfo: {},
			activeArea: '杭州钱江燃气有限公司',
			left: 10,
			swichBoxInfo: SWICHBOX,
			intervalId: null,
			detialBoxWidth: 480, // 详情弹框宽度
			detailComponentName: 'TipDetial',
		};
	},
	created() {
		this.$nextTick(() => {
			this.mapFitView(-0.3, 0.4, 0.2);
		});
		window.mapFitView = this.mapFitView.bind(this);
	},
	methods: {
		// 销售区域变化
		saleAreaChange(val) {
			let params = this.allTypeStationList.branchCompanyList.find(
				item => item.name === val
			);

			params = {
				...params,
				detailList:
					SERVICE_SERVICEHANGRANCODE_LEGEND_MAP.BranchCompany
						.detailList,
			};
			this.handleOverlayClick(params);
		},
		// 关闭详情
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.carouseComplBranchCompanyInfo();
			this.activeArea = '';
			done && done();
		},
		// 点击地图marker
		async handleOverlayClick(overlay, overlayType, isCenter = false) {
			this.detailComponentName = 'ClickTipDetial';
			this.clearInterval();
			let { lng, lat, id, overlayType: type, detailList, name } = overlay;
			let params = {
				name,
			};
			let res = await this.clickGetBranchCompanyDetialInfo(params);

			this.activeOverlay = overlay;
			this.activeOverlay.detailList = res;
			this.detialBoxWidth = 500;
			this.showOverlayDetail = true;
		},
		// 联码新增统计数据
		async getDataStatisticsList() {
			this.couplingIncreaseInfo = await this.$sysApi.map.serve.getCouplingIncreaseInfo();
		},
		// 请求集团大厅，子公司，综合服务站数据列表
		async getAllTypeStationList() {
			let params = {
				types: [
					'Grouphall',
					'BranchCompany',
					'ComprehensiveServiceStation',
				].toString(),
			};

			this.detialBoxWidth = 450;
			let res = await this.$sysApi.map.serve.getHangranCodeList(params);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };

			this.carouseComplBranchCompanyInfo();
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

			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		//获取站点详情
		async getDetailInfo(params) {
			this.detailInfo = await this.$sysApi.map.serve.getHangranCodeDetailInfo(
				params
			);
			this.showOverlayDetail = true;
		},
		// 获取点击站点服务站详情
		async clickGetBranchCompanyDetialInfo(params) {
			return this.$sysApi.map.serve.clickGetBranchCompanyDetialInfo(
				params
			);
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
		// 开启定时器 展示公司详情
		carouseComplBranchCompanyInfo() {
			this.detailComponentName = 'TipDetial';
			let index = 0;

			let length = this.allTypeStationList.branchCompanyList.length;
			if (this.intervalId) {
				this.clearInterval();
			}
			this.intervalId = setInterval(() => {
				let currentIndex = index++ % length;
				// let overlay =
				this.activeOverlay = {
					...this.allTypeStationList.branchCompanyList[currentIndex],
					type: 'BranchCompany',
					overlayType: 'BranchCompany',
					detailList:
						SERVICE_SERVICEHANGRANCODE_LEGEND_MAP['BranchCompany']
							.detailList,
				};
				this.detailInfo = this.activeOverlay.gasCodeMapDetailInfoVO;
				this.showOverlayDetail = true;
			}, 3000);
		},
		// 关闭定时器
		clearInterval() {
			clearInterval(this.intervalId);
			this.intervalId = null;
		},
	},
	mounted() {
		this.getAllHotList();
		this.getDataStatisticsList();
		this.getAllTypeStationList();
	},
	beforeDestroy() {
		this.clearInterval();
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