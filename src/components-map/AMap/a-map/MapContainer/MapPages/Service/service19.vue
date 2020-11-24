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
			<DataStatistics :position="'left'" :data="dataStatisticsList" />
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import { BranchCompany, TipDetial } from './Components/index.js';
//页面所需公共组件
import { RegionBoundary, OverlayDetail } from '../Components/index.js';
import pageMixin from '../mixins/pageMixin.js';
import { DataStatistics } from '../../../components';
import { OVERLAYINFOMAP_SERVICE_19 } from '../../../config';
import MapLegend from '../../MapLegend';
export default {
	name: 'service19',
	mixins: [pageMixin],
	components: {
		RegionBoundary,
		OverlayDetail,
		BranchCompany,
		DataStatistics,
		TipDetial,
		MapLegend,
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(OVERLAYINFOMAP_SERVICE_19),
			dataStatisticsList: [],
			// legendMap: SERVICELEGEND19MAP,
			legendMultiple: true,
			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
		};
	},
	methods: {
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$emit('close');
			this.$amap.setZoom(11, 100);
			done();
		},
	},
	mounted() {
		console.log(this.overlayInfoConfig);
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