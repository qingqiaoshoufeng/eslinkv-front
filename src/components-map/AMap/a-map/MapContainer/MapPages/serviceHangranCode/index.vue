<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
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
	</div>
</template>
<script>
//页面覆盖物组件
import { CouplingHot, OperationHot } from './Components/index.js';
//页面所需公共组件
import { RegionBoundary } from '../Components/index.js';
import pageMixin from '../mixins/pageMixin.js';
import { OVERLAYINFOMAP_HANGRANCODE } from '../../../config';
import GoldChart from '@/openApi';
export default {
	name: 'hangranCode',
	mixins: [pageMixin],
	components: { RegionBoundary, CouplingHot, OperationHot },
	data() {
		return {
			overlayInfoConfig: Object.freeze(OVERLAYINFOMAP_HANGRANCODE),
		};
	},
	methods: {
	},
};
</script>

