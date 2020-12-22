<template>
	<div
		class="data_statistics_box animate__animated"
		:class="[`position-${position}`, animate]"
	>
		<div
			class="data_statistics_item"
			v-for="(item, index) in dataStatisticsList"
			:key="index"
		>
			<div class="value font-num" :class="item.type">
				{{ data[item.prop] && data[item.prop].toLocaleString() }}
			</div>
			<div class="desc">{{ item.label }}</div>
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
		dataStatisticsList: {
			type: [Object, Array],
			default() {
				return {};
			},
		},
		data: {
			type: [Object, Array],
			default() {
				return {};
			},
		},
	},
	computed: {
		animate() {
			let { position } = this;
			return (
				'animate__fadeIn' +
				(position.charAt(0).toUpperCase() + position.slice(1))
			);
		},
	},
	components: {},
	data() {
		return {};
	}
};
</script>
 <style lang="scss" scoped>
.data_statistics_box {
	width: 280px;
	position: fixed;
	left: 2681px;
	top: 148px;
	z-index: 9999;
	.data_statistics_item {
		display: flex;
		flex-direction: column;
		&:not(:first-child) {
			margin-top: 30px;
		}
		.value {
			height: 48px;
			font-family: DIN Alternate;
			font-size: 48px;
			font-style: normal;
			font-weight: 700;
			line-height: 48px;
			text-align: right;
			color: #ffdc45;
			padding-right: 16px;
		}
		.warning {
			color: #ff7217;
		}
		.desc {
			height: 32px;
			line-height: 32px;
			margin-top: 8px;
			font-size: 24px;
			border-radius: 16px;
			color: #fff;
			padding-right: 16px;
			text-align: right;
			background: linear-gradient(
				90deg,
				rgba(0, 77, 150, 0.3) 0%,
				#004d96 100%
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
			#004d96 0%,
			rgba(0, 77, 150, 0.3) 100%
		) !important;
	}
}
</style>
