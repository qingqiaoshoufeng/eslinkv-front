<template>
	<div class="map-container">
		<div
			:style="
				`transform: scale(${reverseScaleRatio});transform-origin:top left; overflow: hidden;width:${kanboardSize.width /
					reverseScaleRatio}px;height:${kanboardSize.height /
					reverseScaleRatio}px`
			"
		>
			<el-amap
				vid="overviewMap"
				ref="amap"
				class="hr-map"
				:events="{
					init: mapInit,
				}"
				v-bind="mapConfig"
			>
				<!-- 页面 -->
				<template v-if="showMapPage">
					<component
						:scaleRatio="scaleRatio"
						:is="mapComponentName"
					/>
				</template>
			</el-amap>
		</div>
		<!-- <SatelliteMap v-if="showMapPage" v-model="isShowSatellite" :map="map" /> -->
		<!-- <SatelliteMapControl
			v-if="showMapPage"
			v-model="isShowSatellite"
			:sateMapCtrPos="sateMapCtrPos"
		/> -->

		<!-- 地图类型 -->
		<MapTypeLegend />
		<!-- 传送门的出口 -->
		<portal-target class="portal-target" name="destination"></portal-target>
	</div>
</template>

<script>
import { AMap } from '../lib'
import MapTypeLegend from './MapTypeLegend'
import { SatelliteMap, SatelliteMapControl } from '../components'
import mapMixin from './mapMixin.js'
//动态引入页面
const files = require.context('./MapPages/', true, /page\.js$/)
const mapPages = {}
const path = require('path')
files.keys().forEach((key) => {
	let pageModule = files(key).default || files(key)
	const pageName = path.dirname(key).slice(2)
	Object.keys(pageModule).forEach((componentName) => {
		let subPageName = pageModule[componentName]
		mapPages[pageName + componentName] = () =>
			import(
				/*webpackInclude:/\.(vue)$/ */ './MapPages/' +
					pageName +
					'/' +
					subPageName
			)
	})
})

export default {
	name: 'MainMap',
	mixins: [mapMixin],
	provide() {
		return {
			parentInfo: {
				scaleRatio: this.scaleRatio,
				pageName: this.pageName,
			},
		}
	},
	components: {
		ElAmap: AMap,
		MapTypeLegend,
		SatelliteMap,
		SatelliteMapControl,
		...mapPages,
	},
	data() {
		return {
			kanboardSize: {
				width: 3500,
				height: 1050,
			},
			scaleRatio: 1,
			reverseScaleRatio: 1,
			isShowSatellite: false,
		}
	},
	methods: {
		updateKanboardSize() {
			const { clientWidth, clientHeight } = document.body
			const { width, height } = this.kanboardSize
			let ratio = Math.min(clientWidth / width, clientHeight / height)
			ratio = ratio < 1 ? ratio : 1
			this.reverseScaleRatio = 1 / ratio
			this._provided.parentInfo.scaleRatio = ratio
		},
	},
	mounted() {
		this.updateKanboardSize()
	},
}
</script>
<style lang="scss" scoped>
.vue-portal-target {
	z-index: 99;
}
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
.portal-target {
	z-index: 100;
}
</style>

<style lang="scss">
.amap-logo {
	opacity: 0 !important;
	pointer-events: none;
}
.amap-copyright {
	opacity: 0 !important;
	pointer-events: none;
}
</style>
