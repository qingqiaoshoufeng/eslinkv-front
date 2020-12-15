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
			width: 118px;
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

			&:nth-child(5) {
				background-image: url("./img/list-bg5.svg")
			}

			.title {
				font-size: 20px;
				line-height: 24px;
				color: rgba(255,255,255,0.8);
			}

			.num {
				font-weight: bold;
				font-size: 32px;
				line-height: 32px;
				color: #FFFFFF;
				margin-top: 40px;
        &.finish {
          color: #00FFCF;
        }
			}
		}
	}
</style>

