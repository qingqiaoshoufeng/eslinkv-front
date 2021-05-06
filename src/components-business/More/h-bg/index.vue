<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-bg pos-r">
			<div class="h-bg-back pos-a"></div>
			<div class="h-bg-5441 pos-a" v-if="status54441"></div>
			<template v-if="!status54441">
				<video
					id="video"
					class="pos-a bg-video"
					src="/static/videos/bg1.webm"
					autoplay="autoplay"
					@ended="end"
					muted
					ref="video"
					v-show="!video1Ended"
				></video>
				<video
					class="pos-a bg-video"
					src="/static/videos/bg2.webm"
					autoplay="autoplay"
					loop
					ref="video2"
					muted
					v-show="video1Ended"
				></video>
			</template>
			<div class="h-bg-top pos-a"></div>
			<div class="h-bg-left pos-a"></div>
			<div class="h-bg-right pos-a"></div>
			<div class="h-bg-control pos-a"></div>
			<div
				@mouseover="hover54441 = true"
				@mouseleave="hover54441 = false"
			>
				<video
					class="h-bg-red1 pos-a pointer"
					src="./img/dengleft.webm"
					@click="open54441"
					v-if="hover54441"
					autoplay="autoplay"
					loop="loop"
				></video>
				<div
					class="h-bg-red1 pos-a pointer"
					:class="{ active: status54441 }"
					@click="open54441"
					v-else
				></div>
			</div>
			<div
				@mouseover="hoverVideo = true"
				@mouseleave="hoverVideo = false"
			>
				<video
					class="h-bg-red2 pos-a pointer"
					src="./img/dengright.webm"
					@click="openVideo"
					v-if="hoverVideo"
					autoplay="autoplay"
					loop="loop"
				></video>
				<div
					class="h-bg-red2 pos-a pointer"
					:class="{ active: statusVideo }"
					@click="openVideo"
					v-else
				></div>
			</div>
			<h-bg-54441
				v-if="status54441"
				:status="status54441"
				:close="close54441"
			/>
			<div class="h-bg-center pos-a"></div>
			<ul class="h-bg-nav pos-a fn-flex flex-row">
				<li
					class="pointer fn-flex flex-column pos-r"
					@click="handleClick('nn16rowdl5r')"
				>
					<img src="./img/nav-1.svg" />
					<span class="pos-a">杭燃供气</span>
				</li>
				<li
					class="pointer fn-flex flex-column pos-r"
					@click="handleClick('6gouq223fze')"
				>
					<img src="./img/nav-2.svg" />
					<span class="pos-a">杭燃服务</span>
				</li>
				<li
					class="pointer fn-flex flex-column pos-r"
					@click="handleClick('o8tkm981qdh')"
				>
					<img src="./img/nav-3.svg" />
					<span class="pos-a">杭燃优家</span>
				</li>
				<li
					class="pointer fn-flex flex-column pos-r"
					@click="handleClick('vxoiljh5my9')"
				>
					<img src="./img/nav-4.svg" />
					<span class="pos-a">杭燃体验</span>
				</li>
			</ul>
			<div class="h-bg-start1-box pos-a">
				<video
					src="./img/start1-active.webm"
					autoplay="autoplay"
					loop="loop"
					class="h-bg-start1-video pos-a pointer"
					@click="handleStart"
				></video>
				<div
					class="h-bg-start1 pos-a pointer"
					@click="handleStart"
				></div>
			</div>
		</div>
		<video preload src="/static/videos/bg2.webm"></video>
	</div>
</template>
<script>
const { widgetMixin, scene } = eslinkV
import hBg54441 from './h-bg-54441'
import { value, customConfig } from './index.component'

export default {
	data() {
		return {
			hover54441: false,
			hoverVideo: false,
			video1Ended: false,
			status54441: false,
			statusVideo: false,
			statusStart: false,
		}
	},
	mixins: [widgetMixin],
	components: {
		hBg54441,
	},
	beforeDestroy() {
		document.removeEventListener('DestroyScene', this.closeVideo)
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
		document.addEventListener('DestroyScene', this.closeVideo, false)
	},
	mounted() {
		if (this.inPreview) {
			if (this.config.config.sceneId) {
				scene.actions.createSceneInstance(
					JSON.parse(this.config.config.sceneId)[0],
					'fadeIn',
					'none',
				)
			}
		}
		const video = document.getElementById('video')
		if (video) {
			if (video.paused) {
				video.play()
			}
		}
	},
	methods: {
		end() {
			if (this.video1Ended) return
			this.video1Ended = true
		},
		handleStart() {
			if (this.config.config.sceneId) {
				scene.actions.createSceneInstance(
					JSON.parse(this.config.config.sceneId)[1],
					'fadeIn',
				)
			}
		},
		handleClick(index) {
			scene.actions.setSceneIndex(index)
			scene.actions.destroyScene(
				JSON.parse(this.config.config.sceneId)[0],
			)
			this.status54441 = false
			this.statusVideo = false
		},
		open54441() {
			this.status54441 = true
			this.hover54441 = false
		},
		openVideo() {
			this.statusVideo = true
			this.hoverVideo = false
			scene.actions.createSceneInstance('grdnn9tiey', 'slideInDown')
		},
		close54441() {
			this.video1Ended = false
			this.status54441 = false
		},
		closeVideo(e) {
			if (e.detail.index === 'grdnn9tiey') {
				this.statusVideo = false
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.h-bg-start1-box {
	bottom: 27px;
	left: 50%;
	margin-left: 540px;

	&:hover {
		.h-bg-start1-video {
			opacity: 1;
		}

		.h-bg-start1 {
			opacity: 0;
		}
	}
}

.h-bg-start1-video {
	bottom: 0;
	left: 0;
	width: 72px;
	height: 72px;
	opacity: 0;
	transition: all 0.3s;
}

.h-bg-start1 {
	bottom: 0;
	left: 0;
	width: 72px;
	height: 72px;
	background-image: url('./img/start1.svg');
	opacity: 1;
	transition: all 0.3s;
}

@keyframes zoomInOut {
	0% {
		transform: translateZ(0) scale(1);
	}
	50% {
		transform: translateZ(0) scale(1.2);
	}
	100% {
		transform: translateZ(0) scale(1);
	}
}

.h-bg-nav {
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);

	li {
		width: 160px;
		height: 188px;
		margin-right: 96px;
		font-weight: normal;
		color: rgba(255, 255, 255, 0.75);
		transition: all 0.3s;

		img {
			transform: translateZ(0);
			width: 80px;
			height: 80px;
			margin: 4px auto 32px auto;
		}

		span {
			top: 107px;
			font-size: 40px;
			line-height: 40px;
		}

		&::before {
			position: absolute;
			left: 50%;
			width: 160px;
			height: 188px;
			margin-left: -80px;
			content: '';
			opacity: 0;
			transition: all 0.3s;
		}

		&::after {
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 160px;
			height: 8px;
			margin-left: -80px;
			content: '';
			opacity: 0;
			transition: all 0.3s;
		}

		&:hover {
			font-weight: bold;
			color: rgba(255, 255, 255, 1);

			&::before {
				background: linear-gradient(
					180deg,
					rgba(18, 100, 176, 0) 0%,
					rgba(18, 100, 176, 0.6) 104.72%
				);
				opacity: 1;
			}

			img {
				animation: zoomInOut infinite 1s ease-in-out;
			}

			&::after {
				background: #00ddff;
				opacity: 1;
			}
		}

		&:last-child {
			margin-right: 0;
		}
	}
}

div.h-bg-red1 {
	background-image: url('./img/red-1.png');
	background-size: 257px 64px;
	opacity: 0.6;

	&.active {
		opacity: 1;
	}
}

.h-bg-red1 {
	bottom: 60px;
	left: 738px;
	width: 257px;
	height: 64px;
}

div.h-bg-red2 {
	background-image: url('./img/red-2.png');
	background-size: 257px 64px;
	opacity: 0.6;

	&.active {
		opacity: 1;
	}
}

.h-bg-red2 {
	right: 738px;
	bottom: 60px;
	width: 257px;
	height: 64px;
}

.h-bg-back {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url('./img/bg1.png');
}

.h-bg-top {
	top: 0;
	left: 50%;
	width: 2275px;
	height: 161px;
	margin-left: -1137.5px;
	background-image: url('./img/topyuan.svg');
	background-size: 2275px 161px;
}

.h-bg-5441 {
	width: 100%;
	height: 100%;
	background: url('./img/bg-54441.png') no-repeat;
	background-size: 100% 100%;
}

.h-bg {
	top: 0;
	height: 100%;
	overflow: hidden;
	background-repeat: no-repeat;
	background-size: 3500px 1050px;

	.bg-video {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}

.h-bg-left {
	top: 0;
	left: 0;
	width: 948px;
	height: 1050px;
	background-image: url('./img/left.svg');
	background-size: 948px 1050px;
}

.h-bg-right {
	top: 0;
	right: 0;
	width: 948px;
	height: 1050px;
	background-image: url('./img/right.svg');
	background-size: 948px 1050px;
}

.h-bg-right {
	background-image: url('./img/right.svg');
}

.h-bg-center {
	top: 50%;
	left: 50%;
	width: 1768px;
	height: 584px;
	margin-top: -335px;
	margin-left: -884px;
	pointer-events: none;
	background-image: url('./img/center.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: 1768px 584px;
}

.h-bg-control {
	bottom: -116px;
	left: 50%;
	width: 3500px;
	height: 498px;
	margin-left: -1750px;
	background-image: url('./img/control.svg');
	background-repeat: no-repeat;
	background-size: 3500px 498px;
}
</style>
