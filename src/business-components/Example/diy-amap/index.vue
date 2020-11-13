<template>
	<div>
		<MapContainer />
		<!-- 遮罩层 -->
		<div class="right-bg"></div>
		<div class="left-bg"></div>
	</div>
</template>

<script>
import MapContainer from './MapContainer/index';
import { initAMapApiLoader } from './lib';
import bus from '@/business-components/Example/diy-amap/utils/bus';

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
	methods: {
		handleSceneChange(e) {
			let sceneIndexMap = {
				// nn16rowdl5r: 'home', //首页
				'8iyxp8u3gtu': 'home-pipe', //供气-管网
				'9n1zur7e4l': 'home-ucan', //供气-泛能
				nn16rowdl5r: 'home-station', //供气-场站
				g199smrdh4r: 'project',
			};
			console.log(e, 'e');
			let { index } = e.detail;
			let pageName = sceneIndexMap[index];
			bus.$emit('currentSceneChange', pageName);
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
.right-bg,
.left-bg {
	pointer-events: none;
	position: absolute;
	background-image: -webkit-linear-gradient(
		0deg,
		rgba(0, 5, 35, 0),
		rgba(0, 5, 35, 0.9)
	);
	width: 1128px;
	height: 1050px;
	top: 0;
	right: 0;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image: -webkit-linear-gradient(
			0deg,
			rgba(0, 5, 35, 0),
			rgba(0, 5, 35, 0.9)
		);
	}
}
.left-bg {
	left: 0;
	transform: rotateY(180deg);
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
