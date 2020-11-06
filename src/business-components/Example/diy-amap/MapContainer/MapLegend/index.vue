<template>
	<div class="legend-container">
		<div
			v-for="(legend, prop) in data"
			:key="prop"
			class="legend-item"
			:class="{ 'in-active': !legend.isShow }"
			@click="handleLegendClick(prop)"
		>
			<SvgIcon
				v-if="legend.icon"
				:icon-name="legend.icon"
				class="legend-icon"
			></SvgIcon>
			<span>{{ legend.label }}</span>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '@/business-components/Example/diy-amap/components/';
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
		handleLegendClick(prop) {
			this.$emit('legend-click', prop);
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
