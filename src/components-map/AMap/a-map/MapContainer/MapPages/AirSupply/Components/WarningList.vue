<template>
	<div>
		<Overlay
			v-for="(item, index) in data ? data : list"
			:key="index"
			:marker="{
				icon: `${icon}${item.statusName == '已处理' ? '-suc' : ''}`,
				iconSize: iconSize,
				...item,
			}"
			:visible="true"
			@click="
				$emit('overlay-click', { overlayType: 'WarningList', ...item })
			"
		>
			<!-- <img
				src="@/assets/amap/images/qiangxiu.gif"
				class="warnoverlay-gif"
				v-if="type === '工艺' && item.statusName != '已处理'"
			/> -->
			<video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				v-if="type === '事件' && item.statusName !== '处理完成'"
			></video>
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../../../components/index';
let eventTypeIconMap = {
	工艺: 'icongongyiyichang',
	事件: 'icontulixieloushijian',
};
export default {
	name: 'WariningList',
	components: {
		Overlay,
	},
	props: {
		type: {
			type: String,
			default: '工艺',
		},
		iconSize: {
			type: Number,
			default: 38,
		},
		data: {
			type: Array,
		},
		detailList: {
			type: Array,
			default() {
				return [];
			},
		},
		apiFun: {
			type: Function,
		},
	},
	data() {
		return {
			icon: 'icongongyiyichang',
			list: [],
			eventTypeIconMap,
		};
	},

	async created() {
		this.map = this.$parent.$amap;
		this.icon = eventTypeIconMap[this.type];
		if (this.apiFun) {
			this.list = await this.apiFun();
			// this.list = this.list.fitler(item => {
			// 	let { statusName } = item;
			// 	return statusName !== '已处理';
			// });
		} else {
			this.list = await this.$sysApi.map.airSupply.getEventWarningList({
                currentPage:1,
                pageSize:0,
                repairType:'维修',
                repairState:'all',
            });
		}
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
	width: 38px !important;
	height: 38px !important;
	> img {
		width: 38px !important;
		height: 38px !important;
	}
}
.warnoverlay-gif {
	transform: translateX(-50%);
	position: absolute;
	display: block;
	width: 100px;
	height: 35px;
	margin-top: -36px;
	margin-left: 19px;
}

// img {
// 	width: 100%;
// }
</style>