<template>
	<div class="h-bg-54441-box fn-flex flex-column">
		<div class="fn-flex flex-row">
			<h2 class="text-center">{{ title }}</h2>
		</div>
		<ul class="text-center fn-flex flex-column">
			<li v-for="(item, index) in content" :key="index">{{ item }}</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
		},
		content: {
			type: Array,
			default() {
				return []
			},
		},
	},
}
</script>
<style lang="scss">
.h-bg-54441-box {
	width: 192px;
	height: 212px;
	background: linear-gradient(142.18deg, #001a77 0%, #057cd1 103.19%);
	border: 1px solid #0df;

	&::before,
	&::after {
		position: absolute;
		width: 15px;
		height: 15px;
		content: '';
		background-size: 15px;
	}

	&::after {
		top: -7px;
		right: -7px;
		background-image: url('img/top.svg');
	}

	&::before {
		bottom: -7px;
		left: -7px;
		background-image: url('img/bottom.svg');
	}

	img {
		width: 16px;
		height: 16px;
	}

	ul {
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	> div {
		align-items: center;
		margin: 16px;
	}

	li {
		font-size: 20px;
		line-height: 28px;
		color: #fff;
	}

	h2 {
		width: 100%;
		margin-left: 4px;
		font-size: 32px;
		font-weight: 600;
		line-height: 32px;
		background-image: -webkit-linear-gradient(right, #d9fff8, #0df);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
}
</style>
