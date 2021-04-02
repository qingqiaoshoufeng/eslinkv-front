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
				return {}
			},
		},
		data: {
			type: [Object, Array],
			default() {
				return {}
			},
		},
	},
	computed: {
		animate() {
			const { position } = this
			return (
				'animate__fadeIn' +
				(position.charAt(0).toUpperCase() + position.slice(1))
			)
		},
	},
	components: {},
	data() {
		return {}
	},
}
</script>
<style lang="scss" scoped>
.data_statistics_box {
	position: fixed;
	top: 148px;
	right: 530px;
	z-index: 100;
	width: 280px;
	backface-visibility: hidden;

	.data_statistics_item {
		display: flex;
		flex-direction: column;

		&:not(:first-child) {
			margin-top: 30px;
		}

		.value {
			height: 48px;
			padding-right: 16px;
			font-family: DIN Alternate;
			font-size: 48px;
			font-style: normal;
			font-weight: 700;
			line-height: 48px;
			color: #ffdc45;
			text-align: right;
		}

		.warning {
			color: #ff7217;
		}

		.desc {
			height: 32px;
			padding-right: 16px;
			margin-top: 8px;
			font-size: 24px;
			line-height: 32px;
			color: #fff;
			text-align: right;
			background: linear-gradient(
				90deg,
				rgba(0, 77, 150, 0.3) 0%,
				#004d96 100%
			);
			border-radius: 16px;
			border-radius: 16px;
		}
	}
}

.position-left {
	left: 34px !important;

	.value {
		padding-left: 16px !important;
		text-align: left !important;
	}

	.desc {
		padding-left: 16px !important;
		text-align: left !important;
		background: linear-gradient(
			90deg,
			#004d96 0%,
			rgba(0, 77, 150, 0.3) 100%
		) !important;
	}
}
</style>
