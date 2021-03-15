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
			<img src="@/assets/amap/qiangxiu.gif" class="warnoverlay-gif" />
		</template>
	</BaseOverlay>
</template>
<script>
	import { BaseOverlay } from '../../../../components/index'
	export default {
		name: 'ListOverlay',
		components: {
			BaseOverlay
		},
		methods: {
			async getData () {
				const eventTypeIconMap = {
					0: 'iconbaoguanshijian',
					1: 'iconxieloushijian'
				}
				return new Promise(async (resolve, reject) => {
					let list = await this.$sysApi.map.mock.getWarningList()
					// 根据事件类型，判断图标，根据状态，显示图标颜色
					list = list.map(item => {
						const { status, eventType } = item
						let icon = eventTypeIconMap[eventType]
						if (status === 0) {
							icon = icon + '-suc'
						}
						item.icon = icon
						return item
					})
					resolve(list)
				})
			},
			handleOverlayClick (marker) {
				this.$emit('overlay-click', marker, 'WarningList')
			}
		}
	}
</script>

<style lang="scss" scoped>
.warnoverlay {
	position: absolute;
	box-sizing: border-box;
	width: 54px;
	height: 54px;
	padding: 3px;
	text-align: center;
	cursor: pointer;

	.warnoverlay-icon {
		font-size: 48px;
	}

	.warnoverlay-gif {
		position: absolute;
		display: block;
		width: 100px;
		height: 35px;
		margin-top: -14px;
		margin-left: 19px;
		transform: translateX(-50%);
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
