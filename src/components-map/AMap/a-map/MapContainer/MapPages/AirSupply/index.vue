<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 态势感知 -->
		<ListOverlay @overlay-click="handleOverlayClick" />

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				:visible="config.isShow"
				:is="config.component"
				:overlayIcon="config.icon"
				:overlayType="legend"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
		/>
		<portal to="destination">
			<!-- 右侧列表 -->
			<RightPanel
				class="right-panel"
				@list-click="handleListClick"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import {
	ComprehensiveServiceStation,
	DistributedEnergyResource,
	EmergencyAirSourceStation,
	GasStation,
	HighPressureLine,
	HighPressureLine_Process,
	MiddlePressureLine,
	LowPressureLine,
	InspectionCar,
	InspectionPerson,
	LiquefiedGasStation,
	ListOverlay,
	LNGStation,
	NaturalGasStation,
	PipeManageMentStation,
	PressureRegulatingStation,
	UndergroundRepairStation,
	RightPanel,
} from './Components/index.js';
//页面所需公共组件
import { RegionBoundary, OverlayDetail } from '../Components/index.js';
import pageMixin from '../mixins/pageMixin.js';
import { OVERLAYINFOMAP_HOME } from '../../../config';

export default {
	name: 'HomePage',
	mixins: [pageMixin],
	components: {
		OverlayDetail,
		ComprehensiveServiceStation,
		DistributedEnergyResource,
		EmergencyAirSourceStation,
		GasStation,
		HighPressureLine,
		HighPressureLine_Process,
		InspectionCar,
		InspectionPerson,
		LiquefiedGasStation,
		ListOverlay,
		LNGStation,
		LowPressureLine,
		NaturalGasStation,
		PipeManageMentStation,
		PressureRegulatingStation,
		UndergroundRepairStation,
		MiddlePressureLine,
		RegionBoundary,
		RightPanel,
	},
	props: {
		legendMap: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	created() {
		this.$amap = this.$parent.$amap;
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(OVERLAYINFOMAP_HOME),
			activeOverlay: {},
			showOverlayDetail: false,
		};
	},
	methods: {
		handleListClick(item) {
			console.log(item);
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			this.$amap.setZoom(14);
			if (isCenter) {
				this.$nextTick(() => {
					this.$amap.panTo([lng, lat], 100);
				});
			}
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$amap.setZoom(11);
			done();
		},
	},
};
</script>
