<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="s-lianma-num pos-r fn-flex flex-row">
			<div class="s-lianma-num-sao pos-a"></div>
			<div class="s-lianma-num-code"></div>
			<div class="s-lianma-num-ring pos-a"></div>
			<div class="s-lianma-num-right">
				<h2 class="font-num">{{ data && data.value }}</h2>
				<p>实际联码数(户)</p>
			</div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.s-lianma-num-right {
	margin-left: 52px;

	h2 {
		margin-top: 45px;
		font-size: 48px;
		line-height: 48px;
		color: #fff;
		text-align: left;
	}

	p {
		margin-top: 16px;
		font-size: 24px;
		line-height: 24px;
		color: #fff;
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
	width: 480px;
	height: 176px;

	.s-lianma-num-sao {
		top: 33px;
		left: 45px;
		width: 96px;
		height: 27px;
		background-image: url('./img/sao.svg');
		background-size: 96px 27px;
		animation: infinite top linear 3s;
	}

	.s-lianma-num-ring {
		top: 0;
		left: 0;
		width: 182px;
		height: 182px;
		background-image: url('./img/ring.svg');
		background-size: 182px;
		animation: infinite rotate linear 3s;
	}

	.s-lianma-num-code {
		width: 182px;
		height: 182px;
		background-image: url('./img/code.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 146px;
	}
}
</style>
