<template>
	<!-- 消息提醒 -->
	<div class="map-box" v-if="ready && inPreview" :style="{ zIndex: 9 }">
		<Message />
		<MapContainer />
	</div>
	<div class="widget-part pos-r" v-else :style="styles">
		<img class="placeholder-map" src="/static/amap/amap.jpg" alt="" />
	</div>
</template>
<script>
import MapContainer from './MapContainer/index'
import Message from './components/Message/'
import { value } from './index.component'
import { widgetMixin } from '@eslinkv/vue2'
export default {
	name: 'HRMap',
	components: {
		MapContainer,
		Message,
	},
	props: {
		preview: {
			type: Boolean,
			default: false,
		},
	},
	mixins: [widgetMixin],
	data() {
		return {
			ready: false,
		}
	},
	methods: {
		resetMap() {
			this.ready = false
			setTimeout(() => {
				this.ready = true
			}, 5000)
		},
	},
	mounted() {
		setTimeout(() => {
			this.ready = true
			this.configValue = this.parseConfigValue(value)
		}, 2000)
		// 以防地图加载不出hock处理
		window.resetMap = this.resetMap.bind(this)
	},
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
	text-align: left;
	line-height: 1.5;
}
</style>

<style lang="scss">
@keyframes fadeInRight1 {
	0% {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	to {
		opacity: 1;
		transform: translateZ(0);
	}
}
.animate-fadeInRight {
	animation-name: fadeInRight1;
}
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
