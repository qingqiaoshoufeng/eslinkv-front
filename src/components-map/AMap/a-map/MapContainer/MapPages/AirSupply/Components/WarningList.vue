<template>
	<div>
		<Overlay
			v-for="(item, index) in list"
			:key="index"
			:marker="{
				icon: `${eventTypeIconMap[item.eventType]}${
					item.status ? '' : '-suc'
				}`,
                iconSize:iconSize,
				...item,
			}"
			:visible="true"
			@click="
				$emit('overlay-click', { overlayType: 'WarningList', ...item })
			"
		>
			<img
				src="@/assets/amap/images/qiangxiu.gif"
				class="warnoverlay-gif"
				v-if="item.type === '工艺' && item.status"
			/>
			<video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				v-if="item.type === '事件' && item.status"
			></video>
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../Components/index';
let eventTypeIconMap = {
	0: 'icontulibaoguanshijian',
	1: 'icontulixieloushijian',
};
export default {
	name: 'RoutePlan',
	components: {
		Overlay,
	},
	props: {
		overlayType: {
			type: String,
			default: 'WarningList',
        },
        iconSize:{
            type:Number,
            default:38
        }
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
		// console.log(res);
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
	margin-left: -40px;
	margin-top: -78px;
	outline: none;
}
.amap-icon {
	width: 38px !important;
	height: 38px !important;
	> img {
		width: 38px !important;
		height: 38px !important;
	}
}
.warnoverlay-gif {
	display: block;
	width: 100px;
	height: 35px;
	margin-top: -36px;
	margin-left: -30px;
}

// img {
// 	width: 100%;
// }
</style>