<template functional>
	<div v-show="props.show" class="no_model_box">
		<img src="/static/images/amap/noModel.svg" alt="" />
		<div>{{ props.noDataText }}</div>
	</div>
</template>

<script>
export default {
	name: 'NoData',
	props: {
		noDataText: {
			type: String,
			default: '暂无数据',
		},
		show: {
			type: Boolean,
			default: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.no_model_box {
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translate(-50%);
	div {
		margin-top: 20px;
		font-size: 20px;
	}
}
</style>