<template>
	<div class="data_statistics_box" :class="`position-${position}`">
		<div
			class="data_statistics_item"
			v-for="(item, index) in data"
			:key="index"
		>
			<div class="value">{{ item.value.toLocaleString() }}</div>
			<div class="desc">{{ item.desc }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DataStatistics',
	props: {
		position: {
			type: String,
			default: 'right',
		},
		data: {
			type: Array,
			default: [],
		},
	},
	components: {},
	data() {
		return {};
	},
};
</script>
 <style lang="scss" scoped>
.data_statistics_box {
	width: 280px;
	position: fixed;
	left: 2681px;
	top: 158px;
	z-index: 9999;
	.data_statistics_item {
		display: flex;
		flex-direction: column;
		margin-top: 36px;
		.value {
			height: 48px;
			font-family: DIN Alternate;
			font-size: 48px;
			font-style: normal;
			font-weight: 700;
			line-height: 48px;
			text-align: right;
			color: #fff;
			padding-right: 16px;
		}
		.desc {
			height: 32px;
			line-height: 32px;
			margin-top: 8px;
			font-size: 24px;
			border-radius: 16px;
			color: #00DDFF;
			padding-right: 16px;
			text-align: right;
			background: linear-gradient(
				90deg,
				rgba(0, 77, 150, 0.3) 0%,
				#004D96 100%
			);
			border-radius: 16px;
		}
	}
}
.position-left {
	left: 34px !important;
	.value {
		text-align: left !important;
		padding-left: 16px !important;
	}
	.desc {
		text-align: left !important;
		padding-left: 16px !important;
		background: linear-gradient(
			90deg,
			#004D96 0%,
			rgba(0, 77, 150, 0.3) 100%
		) !important;
	}
}
</style>
