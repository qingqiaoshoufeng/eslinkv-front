<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="s-lianma-num pos-r fn-flex flex-row">
			<div class="s-lianma-num-sao pos-a"></div>
			<div class="s-lianma-num-code"></div>
			<div class="s-lianma-num-ring pos-a"></div>
			<div class="s-lianma-num-right">
				<h2 class="font-num">{{data&&data.value}}</h2>
				<p>实际联码数(户)</p>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
				value: 111
			}),
		},
	};
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.s-lianma-num-right {
		margin-left: 52px;

		h2 {
			margin-top: 45px;
			font-size: 48px;
			line-height: 48px;
			color: #FFFFFF;
			text-align: left;
		}

		p {
			margin-top: 16px;
			font-size: 24px;
			line-height: 24px;
			color: #FFFFFF;
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes top {
		0% {
			top: 33px;
		}
		100% {
			top: 117px;
		}
	}

	.s-lianma-num {
		height: 176px;
		width: 480px;

		.s-lianma-num-sao {
			width: 96px;
			height: 27px;
			top: 33px;
			left: 45px;
			background-size: 96px 27px;
			background-image: url('./img/sao.svg');
			animation: infinite top linear 3s;
		}

		.s-lianma-num-ring {
			width: 182px;
			height: 182px;
			background-size: 182px;
			top: 0;
			left: 0;
			background-image: url('./img/ring.svg');
			animation: infinite rotate linear 3s;
		}

		.s-lianma-num-code {
			width: 182px;
			height: 182px;
			background-size: 146px;
			background-repeat: no-repeat;
			background-position: center;
			background-image: url('./img/code.svg');
		}
	}
</style>

