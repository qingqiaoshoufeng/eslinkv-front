<template>
	<div class="h-project-1-step-3" :style="{left:`${left}%`}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon3" alt=""/>
			<div class="h-project-1-step-3__vertical-line"></div>
			<div class="h-project-1-step-3__horizontal-line" :class="{'position_left':step===3}">
				<div  class="h-project-1-step-3__horizontal-line__person">
					<span>{{step3.title}}</span>
					<span>{{step3.name}}</span>
				</div>
			</div>
		</div>
		<h2 class="pos-a text-center">{{step===3?'等待接单':'接单'}}</h2>
		<h3 v-if="step>3" class="pos-a text-center">{{formatTime(step3.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-3 {
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
			min-width: 159px;
			height: 32px;
			padding: 8px 0 8px 12px;
			left: 24px;
    		top: 122px;
			border: 0;
			border-top: 1px dashed #00DDFF;
			box-sizing: content-box;
			&__person {
				width: calc(100% + 12px);
				margin-left: -12px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				span:nth-child(1){
					font-family: PingFang SC;
					font-style: normal;
					font-weight: normal;
					font-size: 18px;
					color: rgba(254, 255, 255, 0.6);
				}
				span:nth-child(2){
					font-family: PingFang SC;
					font-style: normal;
					font-weight: normal;
					font-size: 24px;
					color: #FFFFFF;
					line-height: 24px;
				}
				background: #001F6D;
				border-radius: 4px;
				padding: 4px 8px;
				height: 32px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
			}

		}
        .position_left{
            transform: translateX(-100%);
        }
	}
	.h-project-1-step-icon {
		position: relative;
	}
</style>
