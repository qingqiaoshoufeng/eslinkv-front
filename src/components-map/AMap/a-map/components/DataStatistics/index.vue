<template>
	<div class="data_statistics_box">
		<div
			class="data_statistics_item"
			v-for="(item, index) in dataStatisticsList"
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
	components: {},
	data() {
		return {
			dataStatisticsList: [
				{
					value: 8604120,
					desc: '居民户',
				},
				{
					value: 7312,
					desc: '公建户',
				},
				{
					value: 218,
					desc: '工业户',
				},
				{
					value: 12,
					desc: '营业服务网点',
				},
			],
		};
	},
	methods: {
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
	},
	mounted() {
		this.getDataStatisticsList();
	},
};
</script>
 <style lang="scss" scoped>
.data_statistics_box {
	width: 280px;
	position: fixed;
	left: 2681px;
	top: 158px;
	.data_statistics_item {
		display: flex;
		flex-direction: column;
		text-align: right;
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
			background: linear-gradient(
				90deg,
				rgba(0, 77, 150, 0.3) 0%,
				#004D96 100%
			);
			border-radius: 16px;
		}
	}
}
</style>
