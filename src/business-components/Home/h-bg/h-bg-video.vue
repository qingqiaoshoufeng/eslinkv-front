<template>
	<div class="h-bg-video fn-flex flex-row pos-a">
		<img src="./img/video-left.svg" alt=""/>
		<video-player
			class="video-player-box"
			ref="videoPlayer"
			:options="playerOptions"
			:playsinline="true"
			customEventName="customstatechangedeventname"
		></video-player>
		<img src="./img/video-right.svg" alt=""/>
		<div class="h-bg-video-close pos-a pointer" @click="close"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				playerOptions: {
					width: 720,
					height: 400,
					muted: true,
					language: 'en',
					playbackRates: [0.7, 1.0, 1.5, 2.0],
					autoplay: true,
					sources: [
						{
							type: 'video/mp4',
							src: '/static/videos/test.mov'
						},
					],
				},
			}
		},
		props: {
			status: {
				type: Boolean,
				default: false
			},
			close: {
				type: Function
			}
		}
	}
</script>
<style lang="scss">
	.h-bg-video {
		top: 405px;
		width: 100%;
		justify-content: center;
	}
	.h-bg-video-close {
		background-image: url('./img/close.svg');
		width: 32px;
		height: 32px;
		left: 50%;
		margin-left: 320px;
		top: -35px;
		background-size: 32px;
	}
</style>
