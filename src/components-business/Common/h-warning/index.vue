<template>
	<div class="widget-part pos-r" :style="styles">
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
				<h2 class="pos-a text-center">{{ data && data.title }}</h2>
				<p class="pos-a">报警时间：{{ data && data.time }}</p>
			</div>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.h-waring {
	width: 3500px;
	height: 1050px;
}

.h-waring-title {
	top: 50%;
	left: 50%;
	width: 1200px;
	height: 240px;
	margin-top: -120px;
	margin-left: -600px;
	background-image: url('./img/bg.svg');
	background-size: 1200px 240px;

	i {
		top: 100px;
		left: 48px;
		width: 1104px;
		height: 100px;
		background-image: url('./img/bg1.svg');
		background-size: auto 100px;
		animation: linear left infinite 10s;
	}

	h2 {
		top: 126px;
		left: 0;
		width: 100%;
		font-size: 48px;
		font-weight: 600;
		line-height: 48px;
		color: #ffd200;
	}

	p {
		top: 44px;
		right: 49px;
		font-size: 32px;
		line-height: 32px;
		color: #fff;
	}

	span {
		top: 44px;
		left: 50px;
		padding-left: 38px;
		font-size: 32px;
		line-height: 32px;
		color: #e5615b;
		background-image: url('./img/warn.svg');
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
	top: 0;
	left: 0;
	width: 3500px;
	height: 64px;
	background: linear-gradient(180deg, rgba(173, 0, 0, 0) 0%, #ad0000 100%);
	transform: rotate(180deg);
}

.h-waring-bottom {
	bottom: 0;
	left: 0;
	width: 3500px;
	height: 64px;
	background: linear-gradient(180deg, rgba(173, 0, 0, 0) 0%, #ad0000 100%);
}

.h-waring-left {
	top: 0;
	left: 0;
	width: 64px;
	height: 1050px;
	background: linear-gradient(-90deg, rgba(173, 0, 0, 0) 0%, #ad0000 100%);
}

.h-waring-right {
	top: 0;
	right: 0;
	width: 64px;
	height: 1050px;
	background: linear-gradient(90deg, rgba(173, 0, 0, 0) 0%, #ad0000 100%);
}
</style>
