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
			@click="
				$emit('overlay-click', {
					overlayType: 'TaskList',
					...item,
					detailList,
				})
			"
		></Overlay>
	</div>
</template>
<script>
import { Overlay } from '../../../../components/index'
import { getEventWarningList } from '@/components-map-api/map.airSupply.api'

const eventTypeIconMap = {
	0: 'iconrenwugongdan-suc',
	1: 'iconrenwugongdan',
}
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
				return []
			},
		},
		detailList: {
			type: Array,
			default() {
				return []
			},
		},
	},
	data() {
		return {
			eventTypeIconMap,
		}
	},
	async created() {
		this.map = this.$parent.$amap
		this.list = await getEventWarningList()
	},
}
</script>

<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}

.warning-videO {
	position: absolute;
	margin-top: -40px;
	margin-left: -80px;
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

// img {
// 	width: 100%;
// }
</style>
