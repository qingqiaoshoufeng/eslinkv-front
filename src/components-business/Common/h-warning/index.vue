<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;`">
		<div class="h-waring pos-r">
			<div class="h-waring-kuang pos-r">
				<div class="h-waring-top pos-a"></div>
				<div class="h-waring-bottom pos-a"></div>
				<div class="h-waring-left pos-a"></div>
				<div class="h-waring-right pos-a"></div>
			</div>
			<div class="h-waring-title pos-a">
				<i class="pos-a"></i>
				<span class="pos-a">WARNING</span>
				<h2 class="pos-a text-center">{{data&&data.title}}</h2>
				<p class="pos-a">报警时间：{{data&&data.time}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				time: '12:32:56',
				title: '三里亭社区燃气泄漏'
			}),
		},
	};
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config)
		}
	}
</script>
<style lang="scss" scoped>
	.h-waring {
		width: 3500px;
		height: 1050px;
	}

	.h-waring-title {
		width: 1200px;
		height: 240px;
		left: 50%;
		margin-left: -600px;
		top: 50%;
		margin-top: -120px;
		background-image: url('./img/bg.svg');
		background-size: 1200px 240px;

		i {
			background-image: url('./img/bg1.svg');
			width: 1104px;
			height: 100px;
			left: 48px;
			top: 100px;
			background-size: auto 100px;
			animation: linear left infinite 10s;
		}

		h2 {
			font-weight: 600;
			font-size: 48px;
			line-height: 48px;
			color: #FFD200;
			top: 126px;
			left: 0;
			width: 100%;
		}

		p {
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
			top: 44px;
			right: 49px;
		}

		span {
			font-size: 32px;
			line-height: 32px;
			color: #E5615B;
			background-image: url('./img/warn.svg');
			left: 50px;
			top: 44px;
			padding-left: 38px;
			background-repeat: no-repeat;
		}
	}

	.h-waring-kuang {
		width: 3500px;
		height: 1050px;
		animation: ease-in-out opacity infinite 1s;
	}

	@keyframes opacity {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes left {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 1104px 0;
		}
	}

	.h-waring-top {
		width: 3500px;
		height: 64px;
		background: linear-gradient(180deg, rgba(173, 0, 0, 0) 0%, #AD0000 100%);
		transform: rotate(180deg);
		top: 0;
		left: 0;
	}

	.h-waring-bottom {
		width: 3500px;
		height: 64px;
		background: linear-gradient(180deg, rgba(173, 0, 0, 0) 0%, #AD0000 100%);
		bottom: 0;
		left: 0;
	}

	.h-waring-left {
		width: 64px;
		height: 1050px;
		background: linear-gradient(-90deg, rgba(173, 0, 0, 0) 0%, #AD0000 100%);
		left: 0;
		top: 0;
	}

	.h-waring-right {
		width: 64px;
		height: 1050px;
		background: linear-gradient(90deg, rgba(173, 0, 0, 0) 0%, #AD0000 100%);
		right: 0;
		top: 0;
	}

</style>

