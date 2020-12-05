<template>
	<div>
		<!-- 图标 -->
		<Overlay
			key="WarnEvent"
			ref="WarnEvent"
			:marker="{
				icon: overlayIcon,
				iconSize: 38,
				...data,
			}"
			:visible="visible"
			@click="handleWarnEventClick"
		>
			<!-- <video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
			></video> -->
		</Overlay>
		<!-- 详情弹窗 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="data"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:detialBoxWidth="400"
		>
		</OverlayDetail>
	</div>
</template>
<script>
import { Overlay, OverlayDetail } from '../../../../components/index';
export default {
	name: 'WarnEvent',
	model: {
		prop: 'data',
	},
	components: {
		Overlay,
		OverlayDetail,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
		overlayInfoConfigMap: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			icon: 'iconshijian1',
			showOverlayDetail: true,
		};
	},
	computed: {
		visible() {
			if (JSON.stringify(this.data) == '{}') {
				this.showOverlayDetail = false;
				return false;
			} else {
				this.showOverlayDetail = true;
				return true;
			}
		},
		overlayIcon() {
			let { status, type } = this.data;
			let iconMap = {
				WARNEVENT: 'shijian1',
				WarningList: 'gongyiyichang',
            };
            console.log(iconMap[type] )
			return iconMap[type] + (status === 0 ? '-suc' : '');
		},
	},
	methods: {
		handleWarnEventClick() {},
		viewOverlayDetail() {},
		closeOverlayDetail(done) {
			this.$emit('input', {});
			done();
		},
	},
};
</script>


<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}
.warning-videO {
	margin-left: -80px;
	margin-top: -40px;
	outline: none;
	position: absolute;
}
.amap-icon {
	width: 38px !important;
	height: 38px !important;
	> img {
		width: 38px !important;
		height: 38px !important;
	}
}
.warnoverlay-gif {
	transform: translateX(-50%);
	position: absolute;
	display: block;
	width: 100px;
	height: 35px;
	margin-top: -36px;
	margin-left: 19px;
}

// img {
// 	width: 100%;
// }
</style>