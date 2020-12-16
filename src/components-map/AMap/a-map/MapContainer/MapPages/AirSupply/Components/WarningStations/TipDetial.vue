<template>
	<div class="TipDetial">
		<div class="station_list">
			<div
				class="station_item"
				v-for="(item, index) in stationList"
				:key="index"
			>
				{{ item.name }}
			</div>
		</div>
		<div class="btn" v-if="true" @click="handleViewDetail()">查看详情</div>
	</div>
</template>
<script>
export default {
	name: 'TipDetial',
	props: {
		data: {
			Type: Object,
			default() {
				return {};
			},
		},
		detailInfo: {
			Type: Object,
			default() {
				return {};
			},
		},
		isShowMore: {
			Type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			stationList: [
				{ name: '奥体中心1519燃气球阀' },
				{ name: '奥体中心1519燃气球阀' },
				{ name: '奥体中心1519燃气球阀' },
				{ name: '奥体中心1519燃气球阀' },
				{ name: '奥体中心1519燃气球阀' },
				{ name: '奥体中心1519燃气球阀' },
				{ name: '奥体中心1519燃气球阀' },
			],
		};
	},
	methods: {
		handleViewDetail() {
			this.$emit('view-detail');
		},
		isNumber(val) {
			return typeof val === 'number' && !isNaN(val);
		},
	},
	mounted() {},
};
</script>
<style lang="scss" scoped>
.TipDetial {
	display: flex;
	flex-direction: column;
	min-width: 300px;
	height: 500px;
	background-color: #fff;
	text-align: left;
	.station_list {
		.station_item {
			font-style: normal;
			font-weight: 600;
			font-size: 24px;
			line-height: 24px;
			color: #ffffff;
			width: 300px;
			height: 40px;
			background: #0057a9;
		}
	}
	.companyName {
		// font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 32px;
		line-height: 1.5em;
		color: #ffd200;
	}
	.accept,
	.complete,
	.percentage {
		// font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		/* or 133% */
		color: #ffffff;
	}
	.detial_info_list {
		// width: 450px;
		width: 100%;
		margin-top: 16px;
		.item {
			min-width: 45%;
			display: inline-block;
			// font-family: PingFang SC;
			font-style: normal;
			font-weight: normal;
			font-size: 24px;
			line-height: 32px;

			/* or 133% */
			color: #ffffff;
			.label {
				color: #fff;
			}
			.value {
				color: #ffd200;
			}
		}
	}
	.accept {
		margin-top: 16px;
	}
	.btn {
		padding: 0px 8px;
		line-height: 32px;
		width: 80px;
		height: 32px;
		background: #0057a9;
		border-radius: 4px;
		display: inline-block;
		cursor: pointer;
		margin-top: 16px;
		&:hover {
			opacity: 0.8;
		}
	}
}
</style>

