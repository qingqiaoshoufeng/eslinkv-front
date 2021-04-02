<template>
	<div class="h-project-1-step-8" :style="{ left: `${left}%` }">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon8" alt="" />
		</div>
		<h2 class="pos-a text-center">抢修结束</h2>
		<h3 class="pos-a text-center">{{ formatTime(step8.time) }}</h3>
	</div>
</template>
<script>
import step from './step'

export default {
	mixins: [step],
}
</script>
<style lang="scss">
.h-project-1-step-8 {
	&__vertical-line {
		position: absolute;
		top: 84px;
		left: -14px;
		width: 75px;
		height: 0;
		border: 0;
		border-bottom: 1px dashed #0df;
		transform: rotate(-90deg);
	}

	&__horizontal-line {
		position: absolute;
		top: 122px;
		left: -513px;
		box-sizing: content-box;
		min-width: 525px;
		height: 32px;
		padding: 8px 0 8px 12px;
		border: 0;
		border-top: 1px dashed #0df;

		&__desc {
			display: flex;

			&__title {
				align-self: flex-start;
				width: 112px;
				height: 16px;
				margin-left: -12px;
				font-size: 16px;
				font-style: normal;
				font-weight: normal;
				line-height: 16px;
				color: #0df;
			}

			&__words {
				position: absolute;
				width: 405px;
				width: 405px;
				margin-top: -4px;
				margin-left: 100px;
				font-size: 16px;
				font-style: normal;
				font-weight: normal;
				line-height: 24px;
				color: #fff;
				text-align: left;
				word-break: break-all;
			}
		}
	}
}

.h-project-1-step-icon {
	position: relative;
}
</style>
