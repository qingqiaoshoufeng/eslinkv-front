<template>
	<div class="map-box">
		<!-- 消息提醒 -->
		<template v-if="ready && inPreview">
			<Message />
			<MapContainer />
		</template>
		<template v-else>
			<img class="placeholder-map" src="/static/amap/amap.jpg" alt="" />
		</template>
	</div>
</template>

<script>
	import MapContainer from './MapContainer/index'
	import Message from './components/Message/'
	import { scene } from 'eslinkv-npm'
	export default {
		name: 'HRMap',
		components: {
			MapContainer,
			Message
		},
		props: {
			preview: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			inPreview () {
				return scene.state.status === 'inPreview'
			}
		},
		data () {
			return {
				ready: false
			}
		},
		methods: {
			resetMap () {
				this.ready = false
				setTimeout(() => {
					this.ready = true
				}, 5000)
			}
		},
		mounted () {
			setTimeout(() => {
				this.ready = true
			}, 2000)
			// 以防地图加载不出hock处理
			window.resetMap = this.resetMap.bind(this)
		}
	}
</script>

<style lang="scss" scoped>
.placeholder-map {
	width: 100%;
	height: 100%;
}

.map-box {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
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

.amap-marker {
	backface-visibility: hidden;
	pointer-events: none !important;

	> div {
		> div {
			pointer-events: all;
		}
	}
}

.amap-markers {
	z-index: 1100 !important;
}

.amap-logo {
	display: none !important;
}

.amap-copyright {
	display: none !important;
}
</style>
