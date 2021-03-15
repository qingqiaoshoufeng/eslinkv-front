<template>
	<ul class="list">
		<li>
			<div class="title">隐患数量</div>
			<div class="num font-num">{{ data.dangerNum }}</div>
		</li>
		<li>
			<div class="title">待处理</div>
			<div class="num font-num">{{ data.waitNum }}</div>
		</li>
		<li>
			<div class="title">处理中</div>
			<div class="num font-num">{{ data.handlingNum }}</div>
		</li>
		<li>
			<div class="title">已完成</div>
			<div class="num font-num">{{ data.finishNum }}</div>
		</li>
		<li>
			<div class="title">处理完成率</div>
			<div class="num font-num finish">{{ data.finishRate }}%</div>
		</li>
	</ul>
</template>
<script>
	export default {
		props: ['data']
	}
</script>
<style lang="scss" scoped>
	.list {
		display: flex;
		flex: none;
		justify-content: space-between;
		width: 100%;
		text-align: center;

		li {
			width: 118px;
			height: 187px;
			padding-top: 16px;
			background-size: 100% 100%;

			&:nth-child(1) {
				background-image: url("./img/list-bg1.svg");
			}

			&:nth-child(2) {
				background-image: url("./img/list-bg2.svg");
			}

			&:nth-child(3) {
				background-image: url("./img/list-bg3.svg");
			}

			&:nth-child(4) {
				background-image: url("./img/list-bg4.svg");
			}

			&:nth-child(5) {
				background-image: url("./img/list-bg5.svg");
			}

			.title {
				font-size: 20px;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.8);
			}

			.num {
				margin-top: 40px;
				font-size: 32px;
				font-weight: bold;
				line-height: 32px;
				color: #fff;

				&.finish {
					color: #00ffcf;
				}
			}
		}
	}
</style>

