<template>
	<div class="widget-part" :style="styles">
		<div class="h-bg-video fn-flex flex-row pos-r">
			<img
				class="h-bg-video-left"
				src="../../More/h-bg/img/video-left.svg"
				alt=""
			/>
			<video-player
				class="video-player-box"
				ref="videoPlayer"
				:options="playerOptions"
				:playsinline="true"
				customEventName="customstatechangedeventname"
			></video-player>
			<img
				class="h-bg-video-right"
				src="../../More/h-bg/img/video-right.svg"
				alt=""
			/>
			<div
				class="h-bg-video-close pointer pos-a"
				@click="handleClose"
			></div>
			<div
				class="h-bg-video-close1 pointer pos-a"
				@click="handleClose"
			></div>
		</div>
	</div>
</template>
<script>
const { widgetMixin, scene } = eslinkV
import { value } from './index.component'

export default {
	data() {
		return {
			playerOptions: {
				width: 1200,
				height: 600,
				muted: true,
				language: 'en',
				playbackRates: [0.7, 1.0, 1.5, 2.0],
				autoplay: true,
				loop: true,
				sources: [
					{
						src: '/cdn/videos/shouye.webm',
					},
				],
			},
		}
	},
	mixins: [widgetMixin],
	methods: {
		handleClose() {
			scene.actions.destroyScene('grdnn9tiey')
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	props: {
		status: {
			type: Boolean,
			default: false,
		},
		close: {
			type: Function,
		},
	},
}
</script>
<style lang="scss">
.h-bg-video-left {
	width: 24px;
	height: 600px;
}

.h-bg-video-right {
	width: 24px;
	height: 600px;
}

.h-bg-video {
	top: 35px;
	justify-content: center;
	width: 100%;

	.video-player-box {
		border: 2px solid #0df;
	}
}

.h-bg-video-close {
	top: -35px;
	left: 50%;
	width: 32px;
	height: 32px;
	margin-left: 570px;
	background-image: url('../../More/h-bg/img/close.svg');
	background-size: 32px;
}

.h-bg-video-close1 {
	bottom: -200px;
	left: 50%;
	width: 257px;
	height: 64px;
	margin-left: 725px;
}
</style>
