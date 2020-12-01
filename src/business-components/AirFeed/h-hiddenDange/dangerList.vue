<template>
	<ul class="list">
		<li>
			<div class="title">隐患数量</div>
			<div class="num font-num">{{ data.dangerNum }}</div>
		</li>
		<li>
			<div class="title">处理隐患</div>
			<div class="num font-num">{{ data.handleDangerNum }}</div>
		</li>
		<li>
			<div class="title">未处理</div>
			<div class="num font-num">{{ data.unhandleDangerNum }}</div>
		</li>
		<li>
			<div class="title">处理完成率</div>
			<div class="num font-num">{{ data.finishRate }}%</div>
		</li>
	</ul>
</template>
<script>
	export default {
		props: ['data']
	};
</script>
<style lang="scss" scoped>
	.list {
		width: 100%;
		display: flex;
		flex: none;
		text-align: center;
		justify-content: space-between;

		li {
			width: 144px;
			height: 187px;
			background-size: 100% 100%;
			padding-top: 16px;

			&:nth-child(1) {
				background-image: url("./img/list-bg1.svg")
			}

			&:nth-child(2) {
				background-image: url("./img/list-bg2.svg")
			}

			&:nth-child(3) {
				background-image: url("./img/list-bg3.svg")
			}

			&:nth-child(4) {
				background-image: url("./img/list-bg4.svg")
			}

			.title {
				font-size: 20px;
				line-height: 24px;
				color: #fff;
			}

			.num {
				font-weight: bold;
				font-size: 32px;
				line-height: 32px;
				color: #FFFFFF;
				margin-top: 40px;
			}
		}
	}
</style>

