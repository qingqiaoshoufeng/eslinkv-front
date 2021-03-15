<template>
	<div class="h-project-1-step-3" :style="{left:`${left}%`}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon3" alt=""/>
			<div class="h-project-1-step-3__vertical-line"></div>
			<div class="h-project-1-step-3__horizontal-line" :class="{'position_left':step === 3}">
				<div  class="h-project-1-step-3__horizontal-line__person">
					<span>{{ step3.title }}</span>
					<span>{{ step3.name }}</span>
				</div>
			</div>
		</div>
		<h2 class="pos-a text-center">接单</h2>
		<h3 class="pos-a text-center">{{ formatTime(step3.time) }}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step]
	}
</script>
<style lang="scss">
	.h-project-1-step-3 {
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
			left: 24px;
			box-sizing: content-box;
			min-width: 159px;
			height: 32px;
			padding: 8px 0 8px 12px;
			border: 0;
			border-top: 1px dashed #0df;

			&__person {
				box-sizing: border-box;
				display: flex;
				display: flex;
				align-items: center;
				align-items: center;
				justify-content: space-between;
				width: calc(100% + 12px);
				height: 32px;
				padding: 4px 8px;
				margin-left: -12px;
				background: #001f6d;
				border-radius: 4px;

				span:nth-child(1) {
					font-size: 18px;
					font-style: normal;
					font-weight: normal;
					color: rgba(254, 255, 255, 0.6);
				}

				span:nth-child(2) {
					font-size: 24px;
					font-style: normal;
					font-weight: normal;
					line-height: 24px;
					color: #fff;
				}
			}
		}

		.position_left {
			transform: translateX(-100%);
		}
	}

	.h-project-1-step-icon {
		position: relative;
	}
</style>
