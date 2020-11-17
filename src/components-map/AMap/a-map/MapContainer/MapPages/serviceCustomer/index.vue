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
		<!-- 统计数据 -->
		<!-- <DataStatistics :data="statisticsdata" /> -->
	</div>
</template>
<script>
//页面覆盖物组件
import {
	ThreeSocialLinkage,
	ServiceNetworkStation,
	Grouphall,
	BranchCompany,
} from './Components/index.js';
//页面所需公共组件
import { RegionBoundary, OverlayDetail } from '../Components/index.js';
import { DataStatistics } from '../../../components/DashboardPanel';
import pageMixin from '../mixins/pageMixin.js';
import {
	OVERLAYINFOMAP_SERVICE_CUSTOMER,
	THREESOCIALLINKAGE_SCENEINDEX,
	THREESOCIALLINKAGE_COMPONENTINDEX,
} from '../../../config';
import GoldChart from '@/openApi';
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
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(OVERLAYINFOMAP_SERVICE_CUSTOMER),
		};
	},
	methods: {
		toViewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			let viewOverlayHandlerMap = {
				ThreeSocialLinkage: 'showThreeSocialLinkageDetail',
			};
			let handler = viewOverlayHandlerMap[overlayType];
			if (handler) {
				this[handler](overlay);
			}
		},
		showThreeSocialLinkageDetail() {
			//打开三社联动的弹框
			GoldChart.scene.createSceneInstance(THREESOCIALLINKAGE_SCENEINDEX);
			//更新数据
			this.$nextTick(() => {
				THREESOCIALLINKAGE_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i);
				});
			});
		},
	},
};
</script>

