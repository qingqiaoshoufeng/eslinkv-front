<template>
	<div>
		<Overlay
			v-for="(item, index) in list || []"
			:key="'ListOverlay' + index"
			:marker="item"
			:visible="visible"
			@click="handleOverlayClick(item)"
		>
			<img
				v-if="item.status !== 0"
				src="@/assets/amap/images/qiangxiu.gif"
				class="warnoverlay-gif"
			/>
		</Overlay>
	</div>
</template>
<script>
import { Overlay } from './index';
export default {
	name: 'ListOverlay',
	components: {
		Overlay,
	},
	props: {
		marker: {
			type: Object,
			default() {
				return {};
			},
		},
		visible: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			list: [],
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
		},
		async getData() {
			let eventTypeIconMap = {
				0: 'iconbaoguanshijian',
				1: 'iconxieloushijian',
			};
            let list =  await this.$sysApi.map.home.getWarningList()
			//根据事件类型，判断图标，根据状态，显示图标颜色
			this.list = list.map(item => {
				let { status, eventType } = item;
				let icon = eventTypeIconMap[eventType];
				if (status === 0) {
					icon = icon + '-suc';
				}
				item.icon = icon;
				return item;
			});
		},
		handleOverlayClick(marker) {
			this.$emit('overlay-click', marker, 'WARN');
		},
	},
};
</script>

<style lang="scss" scoped>
.warnoverlay {
	width: 54px;
	height: 54px;
	position: absolute;
	cursor: pointer;
	text-align: center;
	padding: 3px;
	box-sizing: border-box;
	.warnoverlay-icon {
		font-size: 48px;
	}
	.warnoverlay-gif {
		display: block;
		width: 100px;
		height: 35px;
		margin-top: -14px;
		margin-left: -23px;
	}

	img {
		width: 100%;
	}

	&.active {
		z-index: 999;
		padding: 0;
	}
}
.station-icon {
	font-size: 44px;
}
</style>


