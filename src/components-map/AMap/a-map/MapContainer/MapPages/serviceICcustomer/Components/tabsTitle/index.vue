<template>
	<div class="fn-flex flex-row h-title-1">
		<div class="h-title-1-icon" />
		<h2>{{ title }}</h2>
	</div>
</template>
<script>
export default {
	name: 'tabsTitle',
	data() {
		return {
			title: '态势感知',
		};
	},
	created() {},
};
</script>
<style lang="scss" scoped >
.flex-row {
	width: 480px;
	height: 43px;
	.h-title-1-icon {
		background-image: url('/static/icons/h-title1-1.svg');
		height: 34px;
		width: 34px;
		margin-right: 9px;
	}

	.h-title-1 {
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);

		h2 {
			font-weight: 600;
			font-size: 24px;
			color: #fff;
		}
	}
}
</style>

