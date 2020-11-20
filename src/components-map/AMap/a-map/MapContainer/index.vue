<template>
	<div class="map-container">
		<el-amap
			vid="overviewMap"
			ref="amap"
			class="hr-map"
			:events="{
				init: mapInit,
			}"
			v-bind="mapConfig"
		>
			<!-- 不同场景渲染不同的页面 -->
			<template v-if="showMapPage">
				<component :is="mapComponentName" />
			</template>
		</el-amap>
		<!-- 地图类型 -->
		<!-- <MapTypeLegend /> -->
		<!-- 传送门的出口 -->
		<portal-target name="destination"></portal-target>
	</div>
</template>

<script>
import { AMap } from '../lib';
//引入页面
const files = require.context('./MapPages/', true, /page\.js$/);
const mapPages = {};
const path = require('path');
files.keys().forEach(key => {
	let pageModule = files(key).default || files(key);
	const pageName = path.dirname(key).slice(2);
	Object.keys(pageModule).forEach(subPageName => {
		mapPages[pageName + subPageName] = pageModule[subPageName];
	});
});
import bus from '../utils/bus';
export default {
	name: 'MainMap',
	components: {
		ElAmap: AMap,
		...mapPages,
	},
	data() {
		return {
			mapConfig: {
				center: [120.061259, 30.183295],
				zoomEnable: true,
				doubleClickZoom: false,
				dragEnable: true,
				zoom: 11,
				viewMode: '3D',
				pitch: 10,
				mapStyle: 'amap://styles/e0e1899c1695e012c70d0731a5cda43c',
			},
			mapReady: false,
			showMap: false,
			mapComponentName: 'AirSupplyHighPressure',
		};
	},
	computed: {
		showMapPage() {
			let { mapReady, showMap, mapComponentName } = this;
			return mapReady && showMap && mapComponentName;
		},
	},
	mounted() {
		bus.$on('currentSceneChange', val => {
			if (!val) {
				return (this.showMap = false);
			} else {
				this.showMap = true;
			}
			if (val === 'unchange' || val === this.mapComponentName) {
				return false;
			}
			this.mapComponentName = val;
		});
	},
	methods: {
		mapInit() {
			console.log('地图初始化完成！');
			this.mapReady = true;
		},
	},
	beforeDestroy() {
		bus.$off(['currentSceneChange']);
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
</style>
