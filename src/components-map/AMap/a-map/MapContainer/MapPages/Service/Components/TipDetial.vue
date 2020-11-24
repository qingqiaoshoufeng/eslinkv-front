<template>
	<div class="TipDetial">
		<div class="companyName">{{ data.name }}</div>
		<!-- <div class="accept">{{ `本月已受理数量: ${data.accept}` }}</div>
		<div class="complete">{{ `本月已办结数量: ${data.complete}` }}</div>
		<div class="percentage">{{ `本月办结率: ${data.percentage}` }}</div> -->
		<div class="detial_info_list">
			<div
				class="item"
				v-for="(item, index) in detialInfoList"
				:key="index"
			>
				<span class="label">{{ `${item.name}: ` }}</span>
				<span class="value">{{ item.value }}</span>
			</div>
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
	},
	data() {
		return {
			detialInfoList: [
				{
					name: '今日操作',
					value: '16次',
				},
				{
					name: '本周操作',
					value: '125次',
				},
				{
					name: '联码户数',
					value: '13453户',
				},
				{
					name: '联码率',
					value: '62%',
				},
				{
					name: '本月新增联码户数',
					value: '62户',
				},
			],
		};
	},
	methods: {},
	mounted() {},
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
		font-size: 24px;
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
			/* or 133% */
			color: #ffffff;
			.label {
				color: #00ddff;
			}
			.value {
			}
		}
	}
	.accept {
		margin-top: 16px;
	}
}
</style>

