<template>
	<div
		class="legend-container"
		:style="{
			height: isExpend ? heightAuto : '56px',
			maxWidth: maxWidth + 'px',
		}"
	>
		<div class="legend-content">
			<div class="legend-list" ref="content">
				<div
					v-for="(legend, prop) in data"
					:key="prop"
					class="legend-item"
					:class="{ 'in-active': !legend.isShow }"
					@click="handleLegendClick(prop)"
				>
					<SvgIcon
						v-if="legend.legendIcon"
						:icon-name="legend.legendIcon"
						class="legend-icon"
					></SvgIcon>
					<span class="legend-label">{{ legend.label }}</span>
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
import { SvgIcon } from '@/business-components/Example/diy-amap/components/';
export default {
	name: 'Legend',
	props: {
		data: {
			type: Object,
			default: function() {
				return {};
			},
		},
		maxWidth: {
			type: Number,
			default: 1260,
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
						this.heightAuto = contentHeight + 'px';
                    }
                    this.isExpend = false 
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
	transition: height linear 0.3s;
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid #0065df;
	overflow: hidden;
	box-sizing: border-box;
	border-radius: 16px;
	color: #fff;
	padding: 0 40px;
	line-height: 56px;
	user-select: none;
	font-size: 18px;
	display: flex;
	.legend-content {
		flex: 1;
		.legend-list {
			flex: 1;
			display: flex;
			flex-wrap: wrap;
			.legend-item {
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
			}
			.in-active {
				opacity: 0.5;
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
