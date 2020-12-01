<template>
	<div>
		<Overlay
			v-for="(item, index) in data"
			:key="index"
			:marker="{
				icon: `${eventTypeIconMap[item.eventType]}`,
				...item,
			}"
			:visible="true"
			@click="
				$emit('overlay-click', { overlayType: 'WarningList', ...item })
			"
		>
			<video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				v-if="item.eventType"
			></video>
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../Components/index';
let eventTypeIconMap = {
	0: 'icontuli-gongshanghu',
	1: 'iconyongqidahu2',
};
export default {
	name: 'useHotYear',
	components: {
		Overlay,
	},
	props: {
		overlayType: {
			type: String,
			default: 'WarningList',
		},
		data: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			eventTypeIconMap,
		};
	},

	async created() {
		this.map = this.$parent.$amap;

		// this.list = await this.$sysApi.map.airSupply.getEventWarningList();
		// console.log(res);
		// this.list = res.filter(item => item.status);
		// console.log(this.list, 1111);
	},
	mounted() {
		console.log(this.data, 2222);
	},
};
</script>


<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}
.warning-videO {
	margin-left: -38px;
	margin-top: -80px;
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
.warnoverlay-gif {
	display: block;
	width: 100px;
	height: 35px;
	margin-top: -40px;
	margin-left: -30px;
}

// img {
// 	width: 100%;
// }
</style>