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
				:is="config.component"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:before-close="closeOverlayDetail"
		/>
	</div>
</template>
<script>
//页面覆盖物组件
import { InspectionCar, InspectionPerson } from './Components/index.js';
//页面所需公共组件
import { RegionBoundary, OverlayDetail } from '../Components/index.js';
import pageMixin from '../mixins/pageMixin.js';

export default {
	name: 'HomePage',
	mixins: [pageMixin],
	components: {
		InspectionCar,
		InspectionPerson,
        RegionBoundary,
        OverlayDetail
	},
	data() {
		return {};
	},
	methods: {
	},
	beforeDestroy() {
		let { viewMode } = this;
		this.$amap.clearMap();
	},
};
</script>

