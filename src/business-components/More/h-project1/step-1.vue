<template>
	<div class="h-project-1-step-1">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon1" alt=""/>
			<div class="h-project-1-step-1__vertical-line"></div>
			<div class="h-project-1-step-1__horizontal-line">
				<div class="h-project-1-step-1__horizontal-line__top">
					<div class="h-project-1-step-1__horizontal-line__top__desc">{{step1.des}}</div>
					<div class="h-project-1-step-1__horizontal-line__top__alarmer">
						<span>{{step1.title}}</span>
						<span>{{step1.name}}</span>
					</div>
				</div>
				<div class="h-project-1-step-1__horizontal-line__bottom">
					{{step1.address}}
				</div>
			</div>

		</div>
		<h2 class="pos-a text-center">报警</h2>
		<h3 class="pos-a text-center">{{formatTime(step1.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-1 {
		left: 0;

		&__vertical-line {
			position: absolute;
			width: 112px;
			height: 0px;
			left: -37px;
			top: -57px;
			border: 0;
			border-bottom: 1px dashed #00DDFF;
			transform: rotate(-90deg);
		}

		&__horizontal-line {
			position: absolute;
			min-width: 338px;
			height: 32px;
			padding: 8px 0 8px 12px;
			left: 19px;
			top: -161px;
			border: 0;
			border-bottom: 1px dashed #00DDFF;
			box-sizing: content-box;

			&__top {
				box-sizing: content-box;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				&__desc {
					font-family: PingFang SC;
					font-style: normal;
					font-weight: 600;
					font-size: 32px;
                    white-space: nowrap;
					color: #FF7217;
					line-height: 32px;
					display: flex;
				}

				&__alarmer {
					display: flex;
					justify-content: space-between;
					min-width: 160px;

					span:nth-child(1) {
						font-family: PingFang SC;
						font-style: normal;
						font-weight: normal;
						font-size: 18px;
						color: rgba(254, 255, 255, 0.6);
					}

					span:nth-child(2) {
						font-family: PingFang SC;
						font-style: normal;
						font-weight: normal;
						font-size: 24px;
						color: #FFFFFF;
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

			&__bottom {
				position: absolute;
				top: 57px;
				left: 16px;
				font-family: PingFang SC;
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.75);
			}
		}
	}

	.h-project-1-step-icon {
		position: relative;
	}

</style>
