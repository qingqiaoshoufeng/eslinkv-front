<template>
	<div class="legend-container">
		<div
			v-for="(legend, index) in data"
			:key="index"
			class="legend-item"
			:class="{ 'in-active': !legend.isShow }"
			@click="handleLegendClick(index)"
		>
			<SvgIcon :icon-name="legend.icon" class="legend-icon"></SvgIcon>
			<span>{{ legend.label }}</span>
		</div>
	</div>
</template>

<script>
import SvgIcon from '@/business-components/Example/diy-amap/components/SvgIcon';
export default {
	name: 'Legend',
	props: {
		data: {
			type: Object,
			default: function() {
				return {};
			},
		},
	},
	components: {
		SvgIcon,
	},
	methods: {
		handleLegendClick(val) {
			this.$emit('legend-click', val);
		},
	},
};
</script>

<style lang="scss" scoped>
.legend-container {
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid #0065df;
	box-sizing: border-box;
	border-radius: 16px;
	color: #fff;
	display: flex;
	padding: 0 40px;
	line-height: 56px;
	user-select: none;
	font-size: 18px;
	.legend-item {
		cursor: pointer;
		&:not(:last-child) {
			margin-right: 16px;
		}
		&:hover {
			opacity: 0.8;
		}
		.legend-icon {
			font-size: 24px;
			margin-right: 8px;
		}
	}
	.in-active {
		opacity: 0.8;
	}
}
</style>
