<template>
	<div class="map-container">
		<el-amap
			vid="overviewMap"
			ref="amap"
			class="hr-map"
			:style="`transform: scale(${reverseScaleRatio}); overflow: hidden;width:${kanboardSize.width}px;height:${kanboardSize.height}px`"
			:events="{
				init: mapInit,
			}"
			v-bind="mapConfig"
		>
			<!-- 页面 -->
			<template v-if="showMapPage">
				<component :reverseScaleRatio="reverseScaleRatio" :is="mapComponentName" />
			</template>
		</el-amap>
		<!-- 地图类型 -->
		<MapTypeLegend />
		<!-- 传送门的出口 -->
		<portal-target name="destination"></portal-target>
	</div>
</template>

<script>
import { AMap } from '../lib';
import MapTypeLegend from './MapTypeLegend';
import mapMixin from './mapMixin.js';
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

export default {
	name: 'MainMap',
	mixins: [mapMixin],
	components: {
		ElAmap: AMap,
		MapTypeLegend,
		...mapPages,
	},
	data() {
		return {
			mapConfig: {
				center: [120.061259, 30.183295],
				zoomEnable: true,
				doubleClickZoom: false,
				dragEnable: true,
				zoom: 10,
				viewMode: '3D',
				pitch: 10,
				mapStyle: 'amap://styles/e0e1899c1695e012c70d0731a5cda43c',
			},
			kanboardSize: {
				width: 3500,
				height: 1050,
			},
			reverseScaleRatio: 1,
		};
	},
	methods: {
		updateKanboardSize() {
			const { clientWidth, clientHeight } = document.body;
			const { width, height } = this.kanboardSize;
			let ratio = Math.min(clientWidth / width, clientHeight / height);
			ratio = ratio < 1 ? ratio : 1;
            this.reverseScaleRatio = 1 / ratio;
			// this.reverseScaleRatio = 1 
		},
	},
	mounted() {
		this.updateKanboardSize();
	},
};
</script>
 <style lang="scss" scoped>
.map-container {
	position: relative;
	width: 100%;
	height: 100%;
}
.hr-map {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
</style>

