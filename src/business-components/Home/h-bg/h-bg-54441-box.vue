<template>
	<div class="h-bg-54441-box pos-r">
		<div class="fn-flex flex-row">
			<img src="./img/box.svg"/>
			<h2>{{title}}</h2>
		</div>
		<ul class="text-center">
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
		background: rgba(0, 0, 0, 0.4);
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
