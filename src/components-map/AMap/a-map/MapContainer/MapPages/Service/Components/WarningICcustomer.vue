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
			:visible="true"
			@mouseover="mouseover(item)"
			@click="handleOverlayClick"
			@mouseleave="mouseleave"
		>
			<video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
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
import { Overlay } from '../../../../components/index';

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
				return [];
			},
		},
		detailList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		let eventTypeIconMap = {
			0: 'icontuli-gongshanghu',
			1: 'iconyongqidahu2',
		};
		return {
			eventTypeIconMap,
			mouseIn: false,
		};
	},

	async created() {
		this.map = this.$parent.$amap;

		this.list = await this.$sysApi.map.airSupply.getEventWarningList();
		// console.log(res);
		// this.list = res.filter(item => item.status);
		// console.log(this.list, 1111);
	},
	mounted() {},
	methods: {
		mouseleave() {
			this.mouseIn = false;
			this.$emit('before-close');
		},
		mouseover(item) {
			this.mouseIn = true;
			this.$emit('overlay-click', {
				overlayType: 'WarningICcustomer',
				...item,
				detailList: this.detailList,
			});
		},
		handleOverlayClick(marker) {
			this.mouseIn = true;
			this.$emit('view-detail', {
				...marker,
				overlayType: this.overlayType,
			});
		},
	},
};
</script>


<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}
.warning-videO {
	margin-left: -80px;
	margin-top: -40px;
	outline: none;
	position: absolute;
	pointer-events: none;
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