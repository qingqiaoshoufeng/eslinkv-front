<template>
	<div class="h-line-percent">
		<div
			class="h-line-percent__NO font-num"
			:style="{ background: styles.NOBg }"
		>
			{{ value.NO }}
		</div>
		<div class="h-line-percent__right">
			<div class="h-line-percent__right__top">
				<div class="h-line-percent__right__top__name">
					{{ value.name }}
				</div>
				<div class="h-line-percent__right__top__amount">
					{{ value.amount | toThousand }}
				</div>
			</div>
			<div class="h-line-percent__right__bottom">
				<div
					class="h-line-percent__right__bottom__ruler"
					:style="{
						background: `linear-gradient(270deg, ${styles.startColor} 0%, ${styles.endColor} 100%)`,
						width: rulerWidth,
					}"
				></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		rulerWidth() {
			// 根据视觉稿来的
			const safeWidth = 388
			const safeCountPerPx = safeWidth / this.maxAmout
			return this.value?.amount * safeCountPerPx + 'px'
		},
		styles() {
			return this.item?.styles || {}
		},
		value() {
			return this.item || {}
		},
	},
	props: {
		maxAmout: {
			type: Number,
			default: 4500,
		},
		item: {
			type: Object,
			default: () => ({}),
		},
	},
}
</script>
<style lang="scss">
.h-line-percent {
	display: flex;
	width: 474px;
	height: 28px;

	&__NO {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 28px;
		font-size: 18px;
		font-weight: bold;
		line-height: 24px;
		color: #fff;
	}

	&__right {
		display: flex;
		flex-direction: column;
		width: 440px;
		margin-left: 10px;

		&__top {
			display: flex;
			justify-content: space-between;

			&__name {
				font-size: 16px;
				line-height: 16px;
				color: #fff;
			}

			&__amount {
				font-size: 16px;
				line-height: 16px;
				color: #fff;
			}
		}

		&__bottom {
			position: relative;
			z-index: -1;
			width: 440px;
			height: 4px;
			margin-top: 8px;
			background: rgba(255, 255, 255, 0.1);

			&__ruler {
				position: absolute;
				height: 4px;
			}
		}
	}
}
</style>
