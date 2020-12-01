<template>
	<div>
		<Overlay
			v-for="(item, index) in list"
			:key="index"
			:marker="{
				icon: `${eventTypeIconMap[item.eventType]}${
					item.status ? '-suc' : ''
				}`,
				...item,
			}"
			:visible="true"
			@click="$emit('overlay-click', item)"
		>
			<img
				src="@/assets/amap/images/qiangxiu.gif"
				class="warnoverlay-gif"
				v-if="item.type === '工艺'"
			/>
			<video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				v-if="item.type === '事件'"
			></video>
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../Components/index';
let eventTypeIconMap = {
	0: 'iconbaoguanshijian',
	1: 'iconxieloushijian',
};
export default {
	name: 'RoutePlan',
	components: {
		Overlay,
	},
	data() {
		return {
			icon: 'iconbaoguanshijian',
			list: [],
			eventTypeIconMap,
		};
	},

	async created() {
		this.map = this.$parent.$amap;
		this.list = await this.$sysApi.map.airSupply.getEventWarningList();
		console.log(res);
		// this.list = res.filter(item => item.status);
		// console.log(this.list, 1111);
	},
};
</script>


<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}
.warning-videO {
	margin-left: -38px;
	margin-top: -66px;
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
	margin-top: -14px;
	margin-left: -23px;
}

// img {
// 	width: 100%;
// }
</style>