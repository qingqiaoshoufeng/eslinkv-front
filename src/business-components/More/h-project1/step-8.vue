<template>
	<div class="h-project-1-step-8" :style="{left:`${left}%`}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon8" alt=""/>
			<div class="h-project-1-step-8__vertical-line"></div>
			<div class="h-project-1-step-8__horizontal-line">
				<div  class="h-project-1-step-8__horizontal-line__desc">
					<div class="h-project-1-step-8__horizontal-line__desc__title">{{step8.title}}：</div>
					<p class="h-project-1-step-8__horizontal-line__desc__words">
						{{step8.content}}
					</p>
				</div>
			</div>
		</div>
		<h2 class="pos-a text-center">抢修结束</h2>
		<h3 class="pos-a text-center">{{formatTime(step8.time)}}</h3>
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
		&__vertical-line{
			position: absolute;
			width: 75px;
			height: 0px;
			left: -14px;
    		top: 84px;
			border: 0;
			border-bottom: 1px dashed #00DDFF;
			transform: rotate(-90deg);
		}
		&__horizontal-line {
			position: absolute;
			min-width: 525px;
			height: 32px;
			padding: 8px 0 8px 12px;
			left: -513px;
    		top: 122px;
			border: 0;
			border-top: 1px dashed #00DDFF;
			box-sizing: content-box;
			&__desc{
				display: flex;
				&__title {
					width: 112px;
					height: 16px;
					align-self: flex-start;
					font-family: PingFang SC;
					font-style: normal;
					font-weight: normal;
					font-size: 16px;
					line-height: 16px;
					color: #00DDFF;
					margin-left: -12px;

				}
				&__words {
					width: 405px;
					position: absolute;
					width: 405px;
					font-family: PingFang SC;
					font-style: normal;
					font-weight: normal;
					font-size: 16px;
					line-height: 24px;
					color: #FFFFFF;
					margin-left: 100px;
					word-break: break-all;
					text-align: left;
					margin-top: -4px;
				}
			}

		}
	}
	.h-project-1-step-icon {
		position: relative;
	}
</style>
