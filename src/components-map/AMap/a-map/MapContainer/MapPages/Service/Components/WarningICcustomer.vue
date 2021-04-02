<template>
	<div>
		<Overlay
			v-for="(item, index) in data"
			:key="index"
			:marker="{
				icon: `${eventTypeIconMap[item.status]}`,
				...item,
				...$attrs,
			}"
			:visible="activeIndex === index"
			@click="mouseover(item)"
		>
			<video
				class="warning-videO"
				src="@/assets/amap/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				v-if="item.status === '1'"
				pointE
			></video>
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../../../components/index'

export default {
	name: 'WarningICcustomer',
	components: {
		Overlay,
	},
	props: {
		overlayType: {
			type: String,
			default: 'WarningICcustomer',
		},
		data: {
			type: Array,
			default() {
				return []
			},
		},
		detailList: {
			type: Array,
			default() {
				return []
			},
		},
		activeIndex: {
			type: Number,
			default: -1,
		},
	},
	data() {
		const eventTypeIconMap = {
			0: 'icontuli-gongshanghu',
			1: 'iconyongqidahu2',
		}
		return {
			eventTypeIconMap,
			mouseIn: false,
		}
	},

	async created() {
		this.map = this.$parent.$amap
	},
	mounted() {},
	methods: {
		mouseleave() {
			this.mouseIn = false
			this.$emit('before-close')
		},
		mouseover(item) {
			this.mouseIn = true
			this.$emit('overlay-click', {
				overlayType: 'WarningICcustomer',
				...item,
				detailList: this.detailList,
			})
		},
		handleOverlayClick(marker) {
			this.mouseIn = true
			this.$emit('view-detail', {
				...marker,
				overlayType: this.overlayType,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}

.warning-videO {
	position: absolute;
	margin-top: -40px;
	margin-left: -80px;
	pointer-events: none;
	outline: none;
}

.amap-icon {
	width: 44px !important;
	height: 44px !important;

	> img {
		width: 44px !important;
		height: 44px !important;
	}
}

// img {
// 	width: 100%;
// }
</style>
