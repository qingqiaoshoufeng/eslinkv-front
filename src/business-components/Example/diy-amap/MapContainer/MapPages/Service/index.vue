<template>
	<div>
		<template v-for="(config, legend) in legendMap">
			<template v-if="overlayData[legend]">
				<template v-for="(item, index) in overlayData[legend]">
					<component
						:key="legend + index"
						:marker="{
							...item,
							icon: config.icon,
						}"
						:visible="config.isShow"
						:is="config.component"
						@click="handleMapOverlayClick(item, legend)"
					/>
				</template>
			</template>
			<component
				v-if="!overlayData[legend]"
				:key="legend"
				:visible="config.isShow"
				:is="'HeatMap'"
			/>
		</template>
	</div>
</template>
<script>
import heatMapData from '@/assets/amap/json/heatMap.json';
import { Overlay } from '@/business-components/Example/diy-amap/components/';
import HeatMap from './HeatMap.vue';
import { SERVICESITUATIONAWARENESSLIST } from '@/business-components/Example/diy-amap/config/index';
import pageMixin from '../mixins/pageMixin.js';

export default {
	components: {
		Overlay,
		HeatMap,
	},
	mixins: [pageMixin],
	data() {
		return {
			overlayData: {
				COMMERCIAL: SERVICESITUATIONAWARENESSLIST,
			},
		};
	},
	beforeDestroy() {
		this.$amap && this.$amap.clearMap();
	},
};
</script>

