<template>
	<div class="widget-part pos-r" :style="`${styles}left:0px;top:0px;z-index:13;`">
		<div class="h-bg pos-r">
			<div class="h-bg-top pos-a"></div>
			<div class="h-bg-center pos-a"></div>
			<div class="h-bg-control pos-a"></div>
			<div class="h-bg-left pos-a"></div>
			<div class="h-bg-right pos-a"></div>
			<ul class="h-bg-nav pos-a fn-flex flex-row">
				<li class="pointer" @click="handleClick('nn16rowdl5r')">供气</li>
				<li class="pointer" @click="handleClick('6gouq223fze')">服务</li>
				<li class="pointer" @click="handleClick('o8tkm981qdh')">优家</li>
				<li class="pointer" @click="handleClick('vxoiljh5my9')">体验</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart from '../../../openApi'

	const config = {animation: true}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config)
		},
		methods: {
			handleClick(index) {
				// GoldChart.scene.changeShowMainScene(true)
				GoldChart.scene.setSceneIndex(index)
			}
		}
	}
</script>
<style lang="scss">
	.h-bg-nav {
		bottom: 27px;
		left: 50%;
		transform: translateX(-50%);

		li {
			color: #fff;
			font-weight: 600;
			font-size: 40px;
			line-height: 40px;
			margin-right: 174px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.h-bg-top {
		background-image: url('./img/topyuan.svg');
		width: 2275px;
		height: 161px;
		left: 50%;
		top: 0;
		margin-left: -1137.5px;
		background-size: 2275px 161px;
	}

	.h-bg {
		background-image: url('./img/bg.png');
		height: 100%;
		background-size: 3500px 1050px;
		background-repeat: no-repeat;
		overflow: hidden;
		top: 0;
	}

	.h-bg-left {
		background-image: url('./img/left.svg');
		width: 948px;
		height: 1050px;
		background-size: 948px 1050px;
		left: 0;
		top: 0;
	}

	.h-bg-right {
		background-image: url('./img/right.svg');
		width: 948px;
		height: 1050px;
		background-size: 948px 1050px;
		right: 0;
		top: 0;
	}

	.h-bg-right {
		background-image: url('./img/right.svg');
	}

	.h-bg-center {
		width: 1768px;
		height: 584px;
		background-image: url('./img/center.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1768px 584px;
		left: 50%;
		margin-left: -884px;
		top: 50%;
		margin-top: -292px;
	}

	.h-bg-control {
		background-image: url('./img/control.svg');
		background-repeat: no-repeat;
		background-size: 2620px 498px;
		width: 2620px;
		height: 498px;
		bottom: -108px;
		left: 50%;
		margin-left: -1310px;
	}
</style>
