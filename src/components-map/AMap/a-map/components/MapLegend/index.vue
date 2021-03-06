<template>
	<div
		class="legend-container"
		:style="{
			height: isExpend ? heightAuto : '56px',
			maxWidth: maxWidth + 'px',
		}"
	>
		<slot name="prepend"></slot>
		<div class="legend-content">
			<div
				class="legend-list"
				:class="[multiple ? '' : 'legend-radio']"
				ref="content"
			>
				<div
					v-for="(legend, prop) in data"
					:key="prop"
					class="legend-item"
					@click="handleLegendClick(prop)"
				>
					<SvgIcon
						v-if="legend.legendIcon"
						:icon-name="legend.legendIcon"
						class="legend-icon"
						:class="{ 'in-active': !legend.visible }"
					></SvgIcon>
					<span
						class="legend-label"
						:class="{ 'in-active': !legend.visible }"
					>
						{{ legend.label }}
					</span>
				</div>
			</div>
		</div>
		<div
			v-if="isNeedExpend"
			class="legend-mode"
			:class="'legend-mode--' + (isExpend ? 'expend' : 'collapse')"
		>
			<div @click="handleExpendClick">
				<span>{{ isExpend ? '收起' : '全部' }}</span>
				<SvgIcon class="arrow" icon-name="iconarrowdown"></SvgIcon>
			</div>
		</div>
	</div>
</template>

<script>
import SvgIcon from '../SvgIcon/index'
export default {
	name: 'Legend',
	props: {
		data: {
			type: Object,
			default: function () {
				return {}
			},
		},
		maxWidth: {
			type: Number,
			default: 1360,
		},
		multiple: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isExpend: false,
			isNeedExpend: true,
			heightAuto: 'auto',
		}
	},
	watch: {
		data: {
			handler(val) {
				if (JSON.stringify(val) === '{}') {
					return false
				}
				setTimeout(() => {
					// 计算是否需要展开
					const contentDom = this.$refs.content
					const contentHeight = contentDom.offsetHeight
					const contentWidth = contentDom.offsetWidth
					if (
						contentHeight < 100 &&
						contentWidth < this.maxWidth - 146
					) {
						this.isNeedExpend = false
					} else {
						this.isNeedExpend = true
						this.heightAuto = contentHeight + 'px'
					}
					this.isExpend = false
				}, 100)
			},
			immediate: true,
		},
	},
	components: {
		SvgIcon,
	},
	methods: {
		handleLegendClick(prop) {
			const { multiple } = this
			if (!multiple) {
				Object.keys(this.data).forEach(legendKey => {
					this.data[legendKey].visible = false
				})
				this.data[prop].visible = true
			} else {
				this.data[prop].visible = !this.data[prop].visible
			}
			this.$emit('legend-click', prop)
		},
		handleExpendClick() {
			this.isExpend = !this.isExpend
		},
	},
}
</script>

<style lang="scss" scoped>
.legend-container {
	z-index: 999;
	box-sizing: border-box;
	display: flex;
	padding: 0 40px;
	overflow: hidden;
	font-size: 18px;
	line-height: 54px;
	color: #fff;
	user-select: none;
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid #0065df;
	border-radius: 16px;
	transition: height linear 0.3s;
	backface-visibility: hidden;

	.legend-content {
		flex: 1;

		.legend-list {
			display: flex;
			flex: 1;
			flex-wrap: wrap;

			&.legend-radio {
				.legend-item:not(:last-child) {
					margin-right: 34px;

					&::after {
						position: absolute;
						top: 50%;
						right: -18px;
						display: block;
						width: 2px;
						height: 24px;
						content: ' ';
						background: rgba(255, 255, 255, 0.4);
						transform: translateY(-50%);
					}
				}
			}

			.legend-item {
				position: relative;
				cursor: pointer;

				&:not(:last-child) {
					margin-right: 16px;
				}

				.legend-icon {
					margin-right: 8px;
					font-size: 24px;
				}

				.legend-label {
					vertical-align: middle;
				}

				.in-active {
					opacity: 0.5;
				}
			}
		}
	}

	.legend-mode {
		display: flex;
		align-items: flex-end;
		margin-left: 10px;
		line-height: 54px;
		color: #0df;
		cursor: pointer;

		&--collapse {
			.arrow {
				transform: rotate(180deg);
			}
		}
	}
}
</style>
