<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- <ListOverlay @overlay-click="handleOverlayClick" /> -->

		<!-- 2.legend控制显隐 -->
		<!-- <template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				:visible="config.isShow"
				:is="config.component"
				@overlay-click="handleOverlayClick"
			/>
		</template> -->
		<!-- 覆盖物详情 -->
		<!-- <OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:before-close="closeOverlayDetail"
		/> -->
	</div>
</template>
<script>
// import heatMapData from '@/assets/amap/json/heatMap.json';
// import { Overlay } from '../../../components/';
// import HeatMap from './HeatMap.vue';
// import { SERVICESITUATIONAWARENESSLIST } from '../../../config/index';
// import pageMixin from '../mixins/pageMixin.js';

export default {
	// components: {
	// 	Overlay,
	// 	HeatMap,
	// },
	// mixins: [pageMixin],
	// data() {
	// 	return {
	// 		overlayData: {
	// 			COMMERCIAL: SERVICESITUATIONAWARENESSLIST,
	// 		},
	// 	};
	// },
	// beforeDestroy() {
	// 	this.$amap && this.$amap.clearMap();
	// },
};
</script>

