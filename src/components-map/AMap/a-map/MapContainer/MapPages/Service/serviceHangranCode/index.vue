<!-- 杭燃码 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 1.区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea" />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in overlayMap">
			<component
				v-if="
					config.visible &&
					allTypeStationList[config.dataProp] &&
					allTypeStationList[config.dataProp].length &&
					config.component
				"
				:key="config.component"
				:visible="config.visible"
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
			:width="detialBoxWidth"
			v-bind="{
				beforeClose: closeOverlayDetail,
				...OverlayDetailProp,
			}"
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
let componentPageArr = [
	'CouplingHot',
	'OperationHot',
	'SwitchBox',
	'Grouphall',
	'BranchCompany',
	'ServiceStation',
	'TipDetial',
	'ClickTipDetial',
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
		import(/*webpackInclude:/\.(vue)$/ */ '../Components/' + componentName);
});
componentCommonArr.map(componentName => {
	componentCommonMap[componentName] = () =>
		import(
			/*webpackInclude:/\.(vue)$/ */ '../../../../components/' +
				componentName
		);
});

import pageMixin from '../../../../mixins/pageMixin';
import {
	SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
	SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
	DATASTATISTICSLIST,
	SWICHBOX,
} from './config';
export default {
	name: 'hangranCode',
	mixins: [pageMixin],
	components: {
		...componentPageMap,
		...componentCommonMap,
		iSwitchBox: componentPageMap.SwitchBox,
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
				BranchCompany,
			},

			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			legendMultiple: true,
			showOverlayDetail: false,
			center: [120.90522766, 30.74965084],
			zoom: 10,
			allTypeStationList: {},
			detailInfo: {},
			couplingIncreaseInfo: {},
			activeArea: '',
			left: 10,
			swichBoxInfo: SWICHBOX,
			intervalId: null,
			detialBoxWidth: 480, // 详情弹框宽度
			detailComponentName: 'TipDetial',
			params: [
				[-0.3, 0.4, 0.2],
				[-0.31, 0.4, 0.15],
				[0.08, 0.4, 0.4],
				[-0.34, 0.4, 0.13],
			],
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
			return null;
		},
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$nextTick(() => {
			this.mapFitView(-0.3, 0.4, 0.35);
		});
		window.mapFitView = this.mapFitView.bind(this);
	},
	methods: {
		// 销售区域变化
		saleAreaChange(val) {},
		// 关闭详情
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.detailInfo = {};
			this.carouseComplBranchCompanyInfo();
			this.activeArea = '';
			done && done();
		},
		// 点击地图marker
		async handleOverlayClick(overlay, overlayType, isCenter = false) {
			this.activeOverlay = {};
			this.detailInfo = {};
			this.showOverlayDetail = false;
			this.detailComponentName = 'ClickTipDetial';
			this.clearInterval();
			let { lng, lat, id, overlayType: type, detailList, name } = overlay;
			// this.activeArea = name;
			let params = {
				name,
			};
			let res = await this.clickGetBranchCompanyDetialInfo(params);
			this.activeOverlay = overlay;
			this.activeOverlay.detailList = res;
			this.detialBoxWidth = 500;
			this.showOverlayDetail = this.$refs.BranchCompany[0].mouseIn;
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

			this.detialBoxWidth = 480;
			return this.$sysApi.map.serve.getHangranCodeList(params);
		},
		// 获取热力图信息
		async getAllHotList() {
			let res;
			try {
				res = await this.$sysApi.map.serve.getHangranCodeHotList();
			} catch (error) {
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
			this.overlayMap.CouplingHot.visible = value1;
			this.overlayMap.OperationHot.visible = value2;
		},
		// 开启定时器 展示公司详情
		carouseComplBranchCompanyInfo() {
			this.detailComponentName = 'TipDetial';
			let index = 0;

			let length = this.allTypeStationList.branchCompanyList.length;
			if (this.intervalId || this.intervalId == 0) {
				this.clearInterval();
			}
			if (!this.intervalId) {
			}

			this.intervalId = setInterval(() => {
				let currentIndex = index++ % length;
				this.activeOverlay = {
					...this.allTypeStationList.branchCompanyList[currentIndex],
					type: 'BranchCompany',
					overlayType: 'BranchCompany',
					detailList:
						SERVICE_SERVICEHANGRANCODE_LEGEND_MAP['BranchCompany']
							.detailList,
				};
				let { name } = this.activeOverlay;

				let address = {
					杭州天然气有限公司: { value: [121.39105835, 30.49227485] },
					杭州钱江燃气有限公司: {
						value: [121.49405518, 30.39419946],
					},
					桐庐杭燃燃气有限公司: {
						value: [120.87769775, 29.85007093],
					},
					海宁星港燃气有限公司: {
						value: [121.56159668, 30.43559623],
					},
				};
				this.detailInfo = this.activeOverlay.gasCodeMapDetailInfoVO;
				this.showOverlayDetail = true;
				this.$amap.panTo(address[name].value, 100);
			}, 5000);
		},
		// 关闭定时器
		clearInterval() {
			clearInterval(this.intervalId);
			this.intervalId = null;
		},
	},
	watch: {
		'allTypeStationList.branchCompanyList': {
			handler(val) {
				if (val && val.length) {
					this.carouseComplBranchCompanyInfo();
				}
			},
			immediate: true,
		},
	},
	async mounted() {
		let res = await this.getAllTypeStationList();
		this.allTypeStationList = { ...this.allTypeStationList, ...res };

		this.getAllHotList();
		this.getDataStatisticsList();
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