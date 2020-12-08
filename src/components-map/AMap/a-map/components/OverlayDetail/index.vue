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
			<div class="close-btn" v-show="showCloseBtnInner" @click="closePop">
				<svg-icon icon-name="iconbaseline-close-px"></svg-icon>
			</div>
			<div class="triangle"></div>
			<slot>
				<div
					class="info-item"
					v-for="(info, prop) in overlayTypeInfo.fields"
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
						info.formatter ? info.formatter(overlay) : overlay[prop]
					}}
				</div>
				<div
					class="btn"
					v-if="showMore && overlayTypeInfo.isShowMore === true"
					@click="handleViewDetail(overlay)"
				>
					查看详情
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
		data: {
			type: Object,
			default() {
				return {};
			},
		},
		value: {
			type: Boolean,
			default: false,
		},
		overlayInfoConfigMap: {
			type: Object,
			default() {
				return {};
			},
		},
		legendMap: {
			type: Object,
			default() {
				return {};
			},
		},
		beforeClose: Function,
		width: {
			type: Number,
			default: 240,
		},
		iconSize: {
			type: Number,
		},
		showCloseBtn: {
			type: Boolean,
			default: false,
        },
        showMore:{
            type:Boolean,
            type:true
        }
	},
	data() {
		return {
			overlayTypeInfo: {},
			overlay: {},
			rendered: false,
			marginBottom: 19,
			showCloseBtnInner: undefined,
		};
	},
	watch: {
		data(val) {
			if (val) {
				if (JSON.stringify(val) !== '{}') {
					let { overlayType } = val;
					this.overlayTypeInfo =
						this.overlayInfoConfigMap[overlayType] || {};
					this.overlay = {
						...val,
					};
					let legendConfig = this.legendMap[overlayType] || {};
					let marginBottom =
						this.iconSize || legendConfig.iconSize || 38;
					this.showCloseBtnInner =
						!!legendConfig.showPopCloseBtn || this.showCloseBtn;
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
			console.log(scaleRatio, 'scaleRatio');
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
</style>

