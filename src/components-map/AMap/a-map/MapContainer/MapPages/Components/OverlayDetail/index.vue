<template>
	<ElAmapMarker
		:position="[overlay.lng, overlay.lat]"
		vid="overlayDetail"
		:zIndex="1400"
		v-if="rendered"
		:visible="value"
		ref="overlayDetailMarker"
	>
		<PopContainer
			class="no-hover-effect"
			@input="closePop"
			:width="detialBoxWidth"
			:left="left"
		>
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
					v-if="overlayTypeInfo.isShowMore"
					@click="handleViewDetail(overlay)"
				>
					查看详情
				</div>
			</slot>
		</PopContainer>
	</ElAmapMarker>
</template>
<script>
import { AMapMarker } from '../../../../lib';
import { PopContainer } from '../../../../components/index';
export default {
	name: 'OverlayDetail',
	components: {
		PopContainer,
		ElAmapMarker: AMapMarker,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
		left: { type: Number, default: 10 },
		value: {
			type: Boolean,
			default: false,
		},
		overlayInfoConfig: {
			type: Object,
			default() {
				return {};
			},
		},
		beforeClose: Function,
		detialBoxWidth: {
			type: String,
			default: '240px',
		},
	},
	data() {
		return {
			overlayTypeInfo: {},
			overlay: {},
			rendered: false,
		};
	},
	watch: {
		data(val) {
			if (val) {
				if (JSON.stringify(val) !== '{}') {
					let { overlayType } = val;
					this.overlayTypeInfo =
						this.overlayInfoConfig[overlayType] || {};
					this.overlay = {
						...val,
					};
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
};
</script>

 <style lang="scss" scoped>
.destination {
	text-align: center;
	cursor: pointer;
	.destination-icon {
		font-size: 48px;
	}
	.destination-gif {
		display: block;
		width: 100px;
		height: 35px;
		margin-top: -14px;
	}
}
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
</style>

