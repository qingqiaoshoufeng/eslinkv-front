	<!-- 点击展示单个任务表单 -->
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
			@click="
				$emit('overlay-click', {
					overlayType: 'TaskList',
					...item,
					detailList,
				})
			"
		>
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
	},
	mounted() {},
	methods: {
		handleOverlayClick(marker) {
			this.$emit('view-detail', {
				...marker,
				overlayType: this.overlayType,
			});
		},
		handleMouseleave() {
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