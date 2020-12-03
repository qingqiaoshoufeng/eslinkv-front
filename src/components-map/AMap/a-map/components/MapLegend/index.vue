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
						:class="{ 'in-active': !legend.isShow }"
					></SvgIcon>
					<span
						class="legend-label"
						:class="{ 'in-active': !legend.isShow }"
						>{{ legend.label }}</span
					>
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
import  SvgIcon  from '../SvgIcon/index';
export default {
	name: 'Legend',
	props: {
		data: {
			type: Object,
			default: function () {
				return {};
			},
		},
		maxWidth: {
			type: Number,
			default: 1260,
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
		};
	},
	watch: {
		data: {
			handler(val) {
				if (JSON.stringify(val) === '{}') {
					return false;
				}
				this.$nextTick(() => {
					//计算是否需要展开
					let contentDom = this.$refs.content;
					let contentHeight = contentDom.offsetHeight;
					let contentWidth = contentDom.offsetWidth;
					if (
						contentHeight < 100 &&
						contentWidth < this.maxWidth - 146
					) {
						this.isNeedExpend = false;
					} else {
						this.isNeedExpend = true;
						this.heightAuto = contentHeight + 'px';
					}
					this.isExpend = false;
				});
			},
			immediate: true,
		},
	},
	components: {
		SvgIcon,
	},
	methods: {
		handleLegendClick(prop) {
			let { multiple } = this;
			if (!multiple) {
				Object.keys(this.data).forEach(legendKey => {
					this.data[legendKey].isShow = false;
				});
				this.data[prop].isShow = true;
			} else {
				this.data[prop].isShow = !this.data[prop].isShow;
			}
			this.$emit('legend-click', prop);
		},
		handleExpendClick() {
			this.isExpend = !this.isExpend;
		},
	},
};
</script>

<style lang="scss" scoped>
.legend-container {
	z-index: 999;
	transition: height linear 0.3s;
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid #0065df;
	overflow: hidden;
	box-sizing: border-box;
	border-radius: 16px;
	color: #fff;
	padding: 0 40px;
	line-height: 54px;
	user-select: none;
	font-size: 18px;
	display: flex;
	.legend-content {
		flex: 1;
		.legend-list {
			flex: 1;
			display: flex;
			flex-wrap: wrap;
			&.legend-radio {
				.legend-item:not(:last-child) {
					margin-right: 34px;
					&:after {
						content: ' ';
						position: absolute;
						display: block;
						width: 2px;
						height: 24px;
						background: rgba(255, 255, 255, 0.4);
						top: 50%;
						right: -18px;
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
					font-size: 24px;
					margin-right: 8px;
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
		color: #00ddff;
		cursor: pointer;
		display: flex;
		align-items: flex-end;
		line-height: 54px;
		margin-left: 10px;
		&--collapse {
			.arrow {
				transform: rotate(180deg);
			}
		}
	}
}
</style>
