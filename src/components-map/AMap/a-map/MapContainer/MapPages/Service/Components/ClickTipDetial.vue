<template>
	<div class="TipDetial">
		<div class="companyName">{{ data.name || data.address }}</div>
		<!-- <div class="accept">{{ `本月已受理数量: ${data.accept}` }}</div>
		<div class="complete">{{ `本月已办结数量: ${data.complete}` }}</div>
		<div class="percentage">{{ `本月办结率: ${data.percentage}` }}</div> -->
		<div class="detial_info_list">
			<div
				class="item"
				v-for="(item, index) in data.detailList || []"
				:key="index"
			>
				<span class="index">{{ index + 1 }}</span>
				<span class="label">{{ `${item.name}: ` }}</span>
				<span class="value">{{ `${item.value}户` }}</span>
			</div>
		</div>
		<div class="btn" v-if="isShowMore" @click="handleViewDetail()">
			查看详情
		</div>
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
		return {};
	},
	methods: {
		handleViewDetail() {
			this.$emit('view-detail');
		},
	},
	mounted() {
		console.log(this.data.detialInfo);
	},
};
</script>
<style lang="scss" scoped>
.TipDetial {
	display: flex;
	flex-direction: column;
	min-width: 300px;
	text-align: left;
	.companyName {
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 32px;
		line-height: 24px;
		color: #ffd200;
	}
	.accept,
	.complete,
	.percentage {
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		/* or 133% */
		color: #ffffff;
	}
	.detial_info_list {
		width: 450px;
		margin-top: 16px;
		.item {
			min-width: 50%;
			display: inline-block;
			font-family: PingFang SC;
			font-style: normal;
			font-weight: normal;
			font-size: 24px;
			line-height: 32px;
			.index {
				display: inline-block;
				width: 24px;
				height: 24px;
				background: #0057a9;
				text-align: center;
				line-height: 24px;
			}
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

