<template>
	<div class="map-container">
		<el-amap
			vid="overviewMap"
			:center="center"
			:zoomEnable="true"
			:doubleClickZoom="false"
			:dragEnable="true"
			:zoom="zoom"
			viewMode="3D"
			:pitch="10"
			mapStyle="amap://styles/e0e1899c1695e012c70d0731a5cda43c"
			ref="amap"
			class="hr-map"
			:events="{
				init: mapInit,
			}"
		>
			<!-- 不同场景渲染不同的组件 -->
			<template v-if="mapReady">
				<component
					:activeItem="activeItem"
					@closePop="handleClosePop"
					:legendMap="legendMap"
					:is="mapComponentName"
				/>
			</template>
		</el-amap>
		<!-- 右侧列表 -->
		<right-panel-list
			class="right-panel"
			@list-click="handleListClick"
		></right-panel-list>
		<!-- 地图 legend  -->
		<MapLegend
			:data="legendMap"
			@legend-click="handleLegendClick"
			class="map-legend"
		/>
	</div>
</template>

<script>
import { AMap } from '@/business-components/Example/diy-amap/lib';
import MapLegend from './MapLegend/index';
import RightPanelList from './RightPaneList/';
import { HomeMap, ServiceMap, ProjectMap } from './MapPages/';
import {
	HOMELEGEND,
	PROJECTLEGEND,
	SERVICELEGEND,
} from '@/business-components/Example/diy-amap/config/index';
import bus from '@/business-components/Example/diy-amap/utils/bus';

export default {
	name: 'MainMap',
	components: {
		ElAmap: AMap,
		HomeMap,
		ServiceMap,
		ProjectMap,
		MapLegend,
		RightPanelList,
	},
	data() {
		return {
			zoom: 11,
			center: [120.061259, 30.273295],
			mapReady: false,
			mapComponentName: 'homeMap',
			legendMap: {},
			activeItem: {},
		};
	},
	created() {
		this._pageConfig = {
			home: {
				mapComponentName: 'homeMap',
				legendMap: HOMELEGEND,
			},
			service: {
				mapComponentName: 'serviceMap',
				legendMap: SERVICELEGEND,
			},
			project: {
				mapComponentName: 'projectMap',
				legendMap: PROJECTLEGEND,
			},
		};
		bus.$on('currentSceneChange', val => {
			console.log(val,'val')
			this.initPage(val);
		});
	},
	beforeDestroy() {
		bus.$off(['currentSceneChange']);
	},
	methods: {
		mapInit() {
			console.log('地图初始化完成！');
			this.mapReady = true;
			this.map = this.$refs.amap.$$getInstance();
			this.initPage('home');
		},
		initPage(val) {
			let config = this._pageConfig[val];
			if (!config) return false;
			Object.keys(config).forEach(targetProp => {
				this[targetProp] = config[targetProp];
			});
			//重置legend 均显示
			Object.keys(this.legendMap).forEach(prop => {
				this.legendMap[prop].isShow = true;
			});
			this.map.setZoom(this.zoom);
		},
		handleLegendClick(prop) {
			let changedItem = this.legendMap[prop];
			changedItem.isShow = !changedItem.isShow;
		},
		handleListClick(item) {
			this.activeItem = item;
		},
		handleClosePop() {
			this.activeItem = {};
		},
	},
};
</script>
 <style lang="scss" scoped>
.hr-map {
	position: fixed;
	top: 0;
	left: 0;
	width: 3560px;
	height: 1380px;
}
.map-legend {
	position: absolute;
	bottom: 50px;
	right: 50%;
	transform: translateX(50%);
	max-width: 1414px;
}
</style>
