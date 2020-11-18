<template>
	<div>
		<template v-if="inPreview">
			<MapContainer />
			<!-- 遮罩层 -->
		</template>
		<template v-else>
			<div>
				<img
					class="placeholder-map"
					src="/static/amap/amap.jpg"
					alt=""
				/>
			</div>
		</template>
	</div>
</template>

<script>
import MapContainer from './MapContainer/index';
import { initAMapApiLoader } from './lib/';
import bus from './utils/bus';
import { store } from '../../../openApi';
import { SCENEINDEXMAP } from './config';
initAMapApiLoader({
	// 高德key
	plugin: [
		'AMap.Scale',
		'AMap.MapType',
		'AMap.DistrictSearch',
		'AMap.Driving',
		'AMap.HeatMap',
		'AMap.GeoJSON',
	],
	uiVersion: '1.1.1',
	v: '2.0',
	key: '8081bdaac8258a8a4a6244bf16084fed',
});

export default {
	name: 'HRMap',
	components: {
		MapContainer,
	},
	data() {
		return {
			inPreview: store.scene.status === 'inPreview',
		};
	},
	methods: {
		handleSceneChange(e) {
			let sceneIndexMap = SCENEINDEXMAP;
			let { index } = e.detail;
			console.log(index);
			let pageName = sceneIndexMap[index] || '';
			// if (pageName) {
				bus.$emit('currentSceneChange', pageName);
			// }
		},
	},
	mounted() {
		document.addEventListener('SceneIndex', this.handleSceneChange);
	},
	beforeDestroy() {
		document.removeEventListener('SceneIndex', this.handleSceneChange);
	},
};
</script>


<style lang="scss" scoped>
.placeholder-map {
	width: 100%;
	height: 100%;
}
</style>

<style lang="scss">
.amap-marker-content {
	& > div {
		& > div:not(.no-hover-effect):hover {
			transform: scale(1.1);
		}
	}
}
.amap-markers {
	z-index: 1100 !important;
}
</style>
