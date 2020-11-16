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
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			@view-detail="toViewOverlayDetail"
		/>
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
import pageMixin from '../mixins/pageMixin.js';
import { OVERLAYINFOMAP_SERVICE_CUSTOMER } from '../../../config';
import { mutations } from '@/openApi';


export default {
	name: 'HomePage',
	mixins: [pageMixin],
	components: {
		ThreeSocialLinkage,
		ServiceNetworkStation,
		RegionBoundary,
		OverlayDetail,
		Grouphall,
		BranchCompany,
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
                'ThreeSocialLinkage':'showThreeSocialLinkageDetail'
            }
            let handler = viewOverlayHandlerMap[overlayType]
            if(handler){
                this[handler](overlay)
            }
        },
        showThreeSocialLinkageDetail(){
            //fsg1lcpo1c6 为三社联动的弹窗
            mutations.createSceneInstance('fsg1lcpo1c6')
        }
	},
};
</script>

