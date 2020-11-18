<template>
	<BaseOverlay
		v-bind="{
			overlayType: 'ListOverlay',
			visible: true,
			apiFun: getData,
		}"
		@click="handleOverlayClick"
	>
		<template slot-scope="{ data }">
			<img
				src="@/assets/amap/images/qiangxiu.gif"
				class="warnoverlay-gif"
			/>
		</template>
	</BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
export default {
	name: 'ListOverlay',
	components: {
		BaseOverlay,
    },
	methods: {
		async getData() {
			let eventTypeIconMap = {
				0: 'iconbaoguanshijian',
				1: 'iconxieloushijian',
			};
			return new Promise(async (resolve, reject) => {
				let list = await this.$sysApi.map.home.getWarningList();
				//根据事件类型，判断图标，根据状态，显示图标颜色
				list = list.map(item => {
					let { status, eventType } = item;
					let icon = eventTypeIconMap[eventType];
					if (status === 0) {
						icon = icon + '-suc';
					}
					item.icon = icon;
					return item;
                });
				resolve(list);
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


