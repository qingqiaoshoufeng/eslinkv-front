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
} from './Components/index.js';
//页面所需公共组件
import {
    RegionBoundary,
	OverlayDetail,
} from '../Components/index.js';
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
	},
	data() {
		return {
            overlayInfoConfig:Object.freeze(OVERLAYINFOMAP_HOME)
        };
	},
	methods: {
		init() {
			if (this.isMapUIComplete) {
				this.drawPathNavigators();
				return false;
			}
		},
	},
	beforeDestroy() {
		let { viewMode } = this;
		this.$amap.clearMap();
	},
};
</script>

 <style lang="scss" scoped>
.destination {
	text-align: center;
	cursor: pointer;
	.destination-icon {
		font-size: 48px;
	}
	.destination-gif {
		display: block;
		width: 100px;
		height: 35px;
		margin-top: -14px;
	}
}
.station-name {
	font-size: 24px;
}
.content {
	font-size: 18px;
	margin-top: 8px;
	color: '#FFD200';
}
.btn {
	padding: 0px 8px;
	line-height: 32px;
	background: #0057a9;
	border-radius: 4px;
	display: inline-block;
	cursor: pointer;
	margin-top: 16px;
	&:hover {
		opacity: 0.8;
	}
}
</style>

