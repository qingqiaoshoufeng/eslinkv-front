<template>
	<div class="ICcustomer1">
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
			@view-detail="viewOverlayDetail"
		/>
		<portal to="destination">
			<DataStatistics :data="dataStatisticsList" />
			<RightPanel class="right-panel" @list-click="handleListClick" />
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import { ICcustomer, RightPanel } from './Components/index.js';
//页面所需公共组件
import { RegionBoundary, OverlayDetail } from '../Components/index.js';
import { DataStatistics } from '../../../components';
import pageMixin from '../mixins/pageMixin.js';
import { OVERLAYINFOMAP_ICCUSTOMER } from '../../../config';
import GoldChart from '@/openApi';

export default {
	name: 'serviceICcustomer',
	mixins: [pageMixin],
	components: {
		RegionBoundary,
		OverlayDetail,
		ICcustomer,
		DataStatistics,
		RightPanel,
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(OVERLAYINFOMAP_ICCUSTOMER),
			dataStatisticsList: [],
		};
	},
	methods: {
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
		handleListClick(item) {
			console.log(item);
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			//和场景进行交互
			GoldChart.scene.setSceneIndex(AIRSUPPLY_WARN_SCENEINDEX);
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
	},
};
</script>

