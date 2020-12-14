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
			const safeWidth = 388;
			const safeCountPerPx = safeWidth / this.maxAmout;
			return this.value?.amount * safeCountPerPx + 'px';
		},
		styles() {
			return this.item?.styles || {};
		},
		value() {
			return this.item || {};
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
};
</script>
<style lang="scss">
.h-line-percent {
	display: flex;
	width: 474px;
	height: 28px;
	&__NO {
		display: flex;
		width: 24px;
		height: 28px;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		font-size: 18px;
		line-height: 24px;
		color: #ffffff;
	}
	&__right {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		width: 440px;
		&__top {
			display: flex;
			justify-content: space-between;
			&__name {
				font-family: PingFang SC;
				font-size: 16px;
				line-height: 16px;
				color: #ffffff;
			}
			&__amount {
				font-family: PingFang SC;
				font-size: 16px;
				line-height: 16px;
				color: #ffffff;
			}
		}
		&__bottom {
			position: relative;
			margin-top: 8px;
			width: 440px;
			height: 4px;
			z-index: -1;
			background: rgba(255, 255, 255, 0.1);
			&__ruler {
				position: absolute;
				height: 4px;
			}
		}
	}
}
</style>

