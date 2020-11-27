<template>
	<div class="h-bg-54441-box fn-flex flex-column">
		<div class="fn-flex flex-row">
			<h2 class="text-center">{{title}}</h2>
		</div>
		<ul class="text-center fn-flex flex-column">
			<li v-for="(item,index) in content" :key="index">{{item}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			title: {
				type: String
			},
			content: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>
<style lang="scss">
	.h-bg-54441-box {
		background: linear-gradient(142.18deg, #001A77 0%, #057CD1 103.19%);
		border: 1px solid #00DDFF;
		width: 192px;
		height: 212px;

		&:before, &:after {
			position: absolute;
			content: '';
			width: 15px;
			height: 15px;
			background-size: 15px;
		}

		&:after {
			background-image: url('./img/top.svg');
			right: -7px;
			top: -7px;
		}

		&:before {
			background-image: url('./img/bottom.svg');
			left: -7px;
			bottom: -7px;
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
			margin: 16px;
			align-items: center;
		}

		li {
			font-size: 20px;
			line-height: 28px;
			color: #fff;
		}

		h2 {
			width: 100%;
			font-weight: 600;
			font-size: 32px;
			line-height: 32px;
			margin-left: 4px;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-image: -webkit-linear-gradient(right, #D9FFF8, #00DDFF);
		}
	}
</style>
