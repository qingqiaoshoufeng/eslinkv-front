<template>
	<ElAmapMarker
		:position="[overlay.lng, overlay.lat]"
		vid="overlayDetail"
		:zIndex="1400"
		v-if="rendered"
		:visible="value"
		ref="overlayDetailMarker"
	>
		<div
			class="pop-content"
			:style="{
				transform: `translate(${translateX}, calc(${translateY})`,
				width: width + 'px',
			}"
		>
			<div class="close-btn" v-show="showCloseBtn" @click="closePop">
				<svg-icon icon-name="iconbaseline-close-px"></svg-icon>
			</div>
			<div class="triangle"></div>
			<slot>
				<div v-if="!overlay.detail">
					<div
						class="info-item"
						v-for="(info, prop) in overlayDetailConfig.fields"
						:style="{
							...info.style,
							color:
								overlay.status == 1
									? info.errColor
									: info.style && info.style.color,
						}"
						:key="prop"
					>
						{{
							info.formatter
								? info.formatter(overlay)
								: overlay[prop]
						}}
					</div>
				</div>
				<!-- 门站调压站，返回数据不固定，遍历显示 -->
				<div v-else>
					<div class="detail-name" v-if="overlay.name">
						{{ overlay.name }}
					</div>
					<div
						class="fn-flex"
						v-for="(item, prop) in overlay.detail"
						:key="prop"
					>
						<div class="detail-label">{{ item.label }}：</div>
						<div class="detail-value">
							{{ item.value }}{{ item.dw }}
						</div>
					</div>
				</div>
				<div
					class="btn"
					@click="handleViewDetail"
					v-if="showMore || overlayDetailConfig.isShowMore === true"
				>
					更多详情
				</div>
			</slot>
		</div>
	</ElAmapMarker>
</template>
<script>
import { AMapMarker } from '../../lib';
import PopContainer from '../PopContainer';
import SvgIcon from '../SvgIcon/index';

export default {
	name: 'OverlayDetail',
	inject: ['parentInfo'],
	components: {
		PopContainer,
		ElAmapMarker: AMapMarker,
		SvgIcon,
	},
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Object,
			default() {
				return {};
			},
		},
		overlayDetailConfig: {
			type: Object,
			default() {
				return {};
			},
		},
		//容器宽度
		width: {
			type: Number,
			default: 240,
		},
		//iconSize 用于计算需要偏移的位置
		iconSize: {
			type: Number,
		},
		//关闭按钮
		showCloseBtn: {
			type: Boolean,
			default: true,
		},
		//是否显示查看详情
		showMore: {
			type: Boolean,
			type: false,
		},
		//关闭弹窗之前的事件
		beforeClose: Function,
	},
	data() {
		return {
			overlay: {},
			rendered: false,
			marginBottom: 19,
		};
	},
	watch: {
		data(val) {
			if (val) {
				if (JSON.stringify(val) !== '{}') {
					let { overlayType } = val;
					this.overlay = {
						...val,
					};
					let marginBottom = this.iconSize || 38;
					this.marginBottom = marginBottom / 2;
					if (!this.rendered) {
						this.rendered = true;
					} else {
						this.$refs.overlayDetailMarker.$amapComponent.setPosition(
							new window.AMap.LngLat(val.lng, val.lat)
						);
					}
				}
			}
		},
	},
	methods: {
		closePop() {
			if (this.beforeClose) {
				this.beforeClose(this.hide);
			} else {
				this.hide();
			}
		},
		hide() {
			this.$emit('input', false);
		},
		handleViewDetail(overlay) {
			this.$emit('view-detail', overlay);
		},
	},
	computed: {
		scaleRatio() {
			return (this.parentInfo && this.parentInfo.scaleRatio) || 1;
		},
		translateX() {
			let { scaleRatio } = this;
			return `-${((1 - scaleRatio) / scaleRatio + 1) * 50}%`;
		},
		translateY() {
			let { scaleRatio, marginBottom } = this;
			marginBottom = marginBottom + 14;
			return `-${
				((1 - scaleRatio) / scaleRatio) * 50 + 100
			}% - ${marginBottom}px`;
		},
	},
};
</script>

 <style lang="scss" scoped>
.info-item {
	font-size: 24px;
}
.btn {
	padding: 0px 8px;
	line-height: 32px;
	background: #0057a9;
	border-radius: 4px;
	display: inline-block;
	cursor: pointer;
	margin-top: 16px;
	&:hover {
		opacity: 0.8;
	}
}
.pop-content {
	position: relative;
	min-width: 240px;
	padding: 16px;
	font-size: 16px;
	background: rgba(0, 11, 37, 0.8);
	border: 1px solid #00ddff;
	box-sizing: border-box;
	color: #fff;
	transform: translate(-50%, -100%);
	.triangle {
		width: 0;
		height: 0;
		position: absolute;
		bottom: -15px;
		left: 50%;
		transform: translateX(-50%);
		border-left: solid 15px transparent;
		border-right: solid 15px transparent;
		border-top: solid 15px #00ddff;
	}
	.close-btn {
		background: #0057a9;
		border: 1px solid #00ddff;
		box-sizing: border-box;
		width: 24px;
		height: 24px;
		position: absolute;
		top: -32px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:active {
			opacity: 0.8;
		}
	}
}

.detail-name {
	font-weight: 600;
	font-size: 32px;
	color: #ffdc45;
}
.detail-label {
	font-size: 24px;
	color: #fff;
}
.detail-value {
	font-size: 24px;
	color: #ffdc45;
}
</style>

