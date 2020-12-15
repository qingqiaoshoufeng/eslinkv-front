<template>
	<div>
		<!-- 图标 -->
		<Overlay
			v-for="(item, index) in data"
			:key="index"
			:ref="'WarnEvent' + index"
			:marker="{
				icon: overlayIcon,
				iconSize: 38,
				...item,
			}"
			:visible="visible"
			@click="handlerClick"
		>
		</Overlay>
		<!-- 详情弹窗 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				data: data1[0],
				...OverlayDetailProp,
			}"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		>
			<TipDetial />
		</OverlayDetail>
	</div>
</template>
<script>
// import { WARNSTATIONS_OVER_LAY } from './config';
export default {
	name: 'WarningStations',
	components: {
		Overlay: () => import('../../../../../components/Overlay'),
		OverlayDetail: () => import('../../../../../components/OverlayDetail'),
		TipDetial: () => import('./TipDetial'),
	},
	props: {
		data: {
			type: Array,
			default() {
				return [
					{
						name: '浙江省杭州市西湖区庆丰新村',
						id: 1,
						lat: 30.270097732543945,
						lng: 120.12751770019531,
						name: '庆丰新村社区',
						stationType: 'ThreeSocialLinkage',
						type: 'WarningStations',
					},
				];
			},
		},
	},
	data() {
		return {
			OverlayDetailProp: {},
			showOverlayDetail: true,
			visible: true,
			overlayIcon: 'iconzhongdiyayujing',
			data1: [
				{
					name: '浙江省杭州市西湖区庆丰新村',
					id: 1,
					lat: 30.270097732543945,
					lng: 120.12751770019531,
					name: '庆丰新村社区',
					stationType: 'ThreeSocialLinkage',
					type: 'WarningStations',
				},
			],
		};
	},
	computed: {},

	mounted() {},
	methods: {
		viewOverlayDetail() {},
		closeOverlayDetail() {},
		handlerClick() {
			this.showOverlayDetail = true;
		},
	},
	beforeDestroy() {},
};
</script>


<style lang="scss" scoped>
</style>