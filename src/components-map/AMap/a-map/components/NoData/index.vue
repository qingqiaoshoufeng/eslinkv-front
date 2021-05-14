<template functional>
	<div v-show="props.show" class="no-data-box">
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
}
</script>
<style lang="scss" scoped>
.no-data-box {
	position: absolute;
	top: 35%;
	left: 50%;
	display: flex;
	flex-direction: column;
	transform: translate(-50%);
	backface-visibility: hidden;

	div {
		margin-top: 20px;
		font-size: 20px;
	}

	img {
		width: 80px;
	}
}
</style>
