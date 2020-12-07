<template>
	<div>
		<Overlay
			v-for="(item, index) in data"
			:key="item.clickNumber"
			:marker="{
				icon: `${eventTypeIconMap[item.status]}`,
				...item,
				...$attrs,
			}"
			:visible="activeIndex === index"
			@mouseover="
				$emit('overlay-click', {
					overlayType: 'TaskList',
					...item,
					detailList,
				})
			"
			@mouseleave="handleMouseleave"
		>
			<!-- <video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				v-if="item.status === '1'"
			></video> -->
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../../../components/index';
let eventTypeIconMap = {
	0: 'iconrenwugongdan-suc',
	1: 'iconrenwugongdan',
};
export default {
	name: 'useHotYear',
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
		activeIndex: {
			type: Number,
			default: -1,
		},
	},
	data() {
		return {
			eventTypeIconMap,
		};
	},
	watch: {
		data: {
			handler(val) {
				this.data = val;
			},
			deep: true,
		},
	},
	async created() {
		this.map = this.$parent.$amap;

		// this.list = await this.$sysApi.map.airSupply.getEventWarningList();
		// console.log(this.list);

		// console.log(res);
		// this.list = res.filter(item => item.status);
		// console.log(this.list, 1111);
	},
	mounted() {
		console.log(this.data, 2222);
	},
	methods: {
		handleOverlayClick(marker) {
			console.log('click');
			this.$emit('view-detail', {
				...marker,
				overlayType: this.overlayType,
			});
		},
		handleMouseleave() {
			console.log('close');
			this.$emit('close');
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