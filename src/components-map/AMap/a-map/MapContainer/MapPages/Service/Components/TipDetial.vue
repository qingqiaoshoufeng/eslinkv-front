<template>
	<div class="TipDetial">
		<div class="companyName">{{ data.name }}</div>
		<div class="accept">{{ `本月已受理数量: ${data.accept}` }}</div>
		<div class="complete">{{ `本月已办结数量: ${data.complete}` }}</div>
		<div class="percentage">{{ `本月办结率: ${data.percentage}` }}</div>
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
		return {};
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
		color: #00ddff;
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
	.accept {
		margin-top: 16px;
	}
}
</style>

