<template>
	<div class="h-project-1-step-1">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon1" alt=""/>
			<div class="h-project-1-step-1__vertical-line"></div>
			<div class="h-project-1-step-1__horizontal-line">
				<div class="h-project-1-step-1__horizontal-line__top">
					<div class="h-project-1-step-1__horizontal-line__top__desc">{{ step1.des }}</div>
					<div class="h-project-1-step-1__horizontal-line__top__alarmer">
						<span>{{ step1.title }}</span>
						<span>{{ step1.name }}</span>
					</div>
				</div>
				<div class="h-project-1-step-1__horizontal-line__bottom">
					{{ step1.address }}
				</div>
			</div>
		</div>
		<h2 class="pos-a text-center">报警</h2>
		<h3 class="pos-a text-center">{{ formatTime(step1.time) }}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step]
	}
</script>
<style lang="scss">
	.h-project-1-step-1 {
		left: 0;

		&__vertical-line {
			position: absolute;
			top: -57px;
			left: -37px;
			width: 112px;
			height: 0;
			border: 0;
			border-bottom: 1px dashed #0df;
			transform: rotate(-90deg);
		}

		&__horizontal-line {
			position: absolute;
			top: -161px;
			left: 19px;
			box-sizing: content-box;
			min-width: 338px;
			height: 32px;
			padding: 8px 0 8px 12px;
			border: 0;
			border-bottom: 1px dashed #0df;

			&__top {
				box-sizing: content-box;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;

				&__desc {
					display: flex;
					font-size: 32px;
					font-style: normal;
					font-weight: 600;
					line-height: 32px;
					color: #ff7217;
					white-space: nowrap;
				}

				&__alarmer {
					box-sizing: border-box;
					display: flex;
					display: flex;
					align-items: center;
					justify-content: space-between;
					min-width: 160px;
					height: 32px;
					padding: 4px 8px;
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
						color: #fff;
					}
				}
			}

			&__bottom {
				position: absolute;
				top: 57px;
				left: 16px;
				font-size: 20px;
				font-style: normal;
				font-weight: normal;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.75);
			}
		}
	}

	.h-project-1-step-icon {
		position: relative;
	}

</style>
