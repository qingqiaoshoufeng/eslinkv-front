<template>
	<div class="map-control">
		<div v-for="item in data" :key="item.value" class="map-type-item">
			<SvgIcon :icon-name="item.icon" />
			<span>{{ item.label }}</span>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '../../components/';
export default {
	name: 'MapType',
	props: {
		data: {
			type: Array,
			default: function() {
				return [
					{ label: '2D地图', value: '2D', icon: 'icon2dmap' },
					{ label: '3D地图', value: '3D', icon: 'icon3dmap' },
					{
						label: '卫星地图',
						value: 'weixing',
						icon: 'iconweixingmap',
					},
				];
			},
		},
	},
	components: {
		SvgIcon,
	},
	methods: {
		changeMaptype() {
			this.isExpend = !this.isExpend;
		},
	},
};
</script>

<style lang="scss" scoped>
.legend-type-container {
	display: flex;
	overflow: hidden;
	transform: height linear 0.3s;
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid #0065df;
	box-sizing: border-box;
	border-radius: 16px;
	color: #fff;
	padding: 0 40px;
	line-height: 56px;
	user-select: none;
	font-size: 18px;
}
</style>
