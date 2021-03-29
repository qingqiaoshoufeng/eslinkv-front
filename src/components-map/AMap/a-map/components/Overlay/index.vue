<template>
	<AMapMarker
		:visible="visible"
		:offset="offset"
		v-if="checkLngLat"
		:position="[marker.lng, marker.lat]"
		:vid="marker.name"
		ref="marker"
	>
		<div :class="['sample', active ? 'active' : '']" v-on="$listeners">
			<slot name="icon">
				<SvgIcon
					class="sample-icon"
					:iconName="marker.icon"
					:style="{
						fontSize: (marker.iconSize || 38) + 'px',
						backfaceVisibility: 'hidden',
					}"
				></SvgIcon>
			</slot>
			<slot></slot>
		</div>
	</AMapMarker>
</template>

<script>
	import SvgIcon from '../SvgIcon'
	import { AMapMarker } from '../../lib'
	export default {
		name: 'Overlay',
		components: {
			SvgIcon,
			AMapMarker
		},
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			marker: {
				type: Object,
				default () {
					return {}
				}
			},
			active: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			offset () {
				let { iconSize } = this.marker
				iconSize = iconSize || 38
				return [-iconSize / 2, -iconSize / 2]
			},
			// 判断经纬度的有效性
			checkLngLat () {
				const { lng, lat } = this.marker
				return typeof lng === 'number' && typeof lat === 'number'
			}
		},
		// watch: {
		// 	//更新位置
		// 	// marker(val) {
		// 	// 	let { lng, lat } = val;
		// 	// 	let instance = this.getInstance();
		// 	// 	if (instance && lng) {
		// 	// 		instance.setPosition(new AMap.LngLat(lng, lat));
		// 	// 	}
		// 	// },
		// },
		methods: {
			getInstance () {
				return this.$refs.marker && this.$refs.marker.$amapComponent
			}
		}
	}
</script>

<style lang="scss" scoped>
.sample {
	position: relative;
	box-sizing: border-box;
	cursor: pointer;

	img {
		width: 100%;
	}
}

.active {
	z-index: 999;
	padding: 0;

	> .sample-icon {
		font-size: 80px !important;
		backface-visibility: hidden;
	}

	&::v-deep .sample-icon {
		bottom: -60px !important;
	}
}

.sample-icon {
	font-size: 44px;
}

.sample-icon:hover {
	transform: scale(1.2);
}

.sample-name {
	position: absolute;
	left: 50%;
	font-size: 18px;
	color: #fff;
	white-space: nowrap;
	transform: translateX(-50%);
	backface-visibility: hidden;
}
</style>

