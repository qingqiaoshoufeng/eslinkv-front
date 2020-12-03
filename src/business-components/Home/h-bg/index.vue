<template>
	<div class="widget-part pos-r" :style="`${styles}left:0px;top:0px;z-index:13;`">
		<div class="h-bg pos-r" :class="{bg54441: status54441}">
			<div class="h-bg-back pos-a"></div>
			<template v-if="!status54441">
				<video class="pos-a bg-video" src="/static/videos/bg1.webm" autoplay="autoplay" @ended="end" ref="video" v-show="!video1Ended"></video>
				<video class="pos-a bg-video" src="/static/videos/bg2.webm" autoplay="autoplay" loop ref="video2" v-show="video1Ended"></video>
			</template>
			<div class="h-bg-top pos-a"></div>
			<div class="h-bg-control pos-a"></div>
			<div class="h-bg-left pos-a"></div>
			<div class="h-bg-right pos-a"></div>
			<div class="h-bg-red1 pos-a pointer" :class="{active:status54441}" @click="open54441"></div>
			<div class="h-bg-red2 pos-a pointer" :class="{active:statusVideo}" @click="openVideo"></div>
			<h-bg-54441 v-if="status54441" :status="status54441" :close="close54441"/>
			<div class="h-bg-center pos-a"></div>
			<ul class="h-bg-nav pos-a fn-flex flex-row">
				<li class="pointer fn-flex flex-column pos-r" @click="handleClick('nn16rowdl5r')">
					<img src="./img/nav-1.svg"/>
					　<span>杭燃供气</span>
				</li>
				<li class="pointer fn-flex flex-column pos-r" @click="handleClick('6gouq223fze')">
					<img src="./img/nav-2.svg"/>
					<span>杭燃服务</span>
				</li>
				<li class="pointer fn-flex flex-column pos-r" @click="handleClick('o8tkm981qdh')">
					<img src="./img/nav-3.svg"/>
					<span>杭燃优家</span>
				</li>
				<li class="pointer fn-flex flex-column pos-r" @click="handleClick('vxoiljh5my9')">
					<img src="./img/nav-4.svg"/>
					<span>杭燃体验</span>
				</li>
			</ul>
			<div class="h-bg-start1-box pos-a">
				<video src="./img/start1-active.webm" autoplay="autoplay" loop="loop"
					   class="h-bg-start1-video pos-a pointer"
					   @click="handleStart"></video>
				<div class="h-bg-start1 pos-a pointer" @click="handleStart"></div>
			</div>
		</div>
    <video preload src="/static/videos/bg2.webm"></video>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart from '../../../openApi'
	import hBg54441 from './h-bg-54441'
	import {getInput} from '../../../../lib'

	const configSource = {
		config: {
			fields: {
				sceneId: getInput('sceneId', '场景ID'),
			},
		},
	};
	const value = {
		config: {
			sceneId: '',
		},
	};
	const config = {
		animation: true,
		config: {
			sceneId: true
		}
	}
	export default {
		data() {
			return {
        video1Ended: false,
				status54441: false,
				statusVideo: false,
				statusStart: false,
			}
		},
		mixins: [mixins],
		components: {
			hBg54441
		},
		beforeDestroy() {
			document.removeEventListener('DestroyScene', this.closeVideo)
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
			document.addEventListener('DestroyScene', this.closeVideo, false)
		},
		mounted() {
			if (this.inPreview) {
				if (this.config.config.sceneId) {
					GoldChart.scene.createSceneInstance(JSON.parse(this.config.config.sceneId)[0], 'fadeIn', 'none')
				}
			}
		},
		methods: {
		  end () {
        if (this.video1Ended) return
        this.video1Ended = true
      },
			handleStart() {
				if (this.config.config.sceneId) {
					// if (this.statusStart) {
					// 	GoldChart.scene.destroyScene(JSON.parse(this.config.config.sceneId)[1])
					// 	GoldChart.scene.createSceneInstance(JSON.parse(this.config.config.sceneId)[0], 'fadeIn', 'none')
					// } else {
					// 	GoldChart.scene.destroyScene(JSON.parse(this.config.config.sceneId)[0])
					GoldChart.scene.createSceneInstance(JSON.parse(this.config.config.sceneId)[1], 'fadeIn')
					// }
					// this.statusStart = !this.statusStart
				}
			},
			handleClick(index) {
				GoldChart.scene.setSceneIndex(index)
				// if (this.statusStart) {
				// 	GoldChart.scene.destroyScene(JSON.parse(this.config.config.sceneId)[1])
				// } else {
				GoldChart.scene.destroyScene(JSON.parse(this.config.config.sceneId)[0])
				// }
				this.status54441 = false
				this.statusVideo = false
			},
			open54441() {
				this.status54441 = true
			},
			openVideo() {
				this.statusVideo = true
				GoldChart.scene.createSceneInstance('grdnn9tiey', 'slideUp')
			},
			close54441() {
        this.video1Ended = false
				this.status54441 = false
			},
			closeVideo(e) {
				if (e.detail.index === 'grdnn9tiey') {
					this.statusVideo = false
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.h-bg-start1-box {
		left: 50%;
		bottom: 27px;
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
		width: 72px;
		height: 72px;
		left: 0;
		bottom: 0;
		opacity: 0;
		transition: all .3s;
	}

	.h-bg-start1 {
		width: 72px;
		height: 72px;
		background-image: url('./img/start1.svg');
		left: 0;
		bottom: 0;
		opacity: 1;
		transition: all .3s;
	}

	.h-bg-nav {
		bottom: 27px;
		left: 50%;
		transform: translateX(-50%);

		li {
			color: rgba(255, 255, 255, 0.75);
			font-weight: normal;
			margin-right: 96px;
			justify-content: center;
			transition: all .3s;

			span {
				font-size: 40px;
				line-height: 40px;
			}

			img {
				margin-bottom: 37px;
			}

			&:before {
				content: '';
				position: absolute;
				opacity: 0;
				transition: all .3s;
				left: 50%;
				margin-left: -80px;
			}

			&:after {
				content: '';
				position: absolute;
				opacity: 0;
				left: 50%;
				margin-left: -80px;
				bottom: -27px;
				transition: all .3s;
			}

			&:hover {
				font-weight: bold;
				color: rgba(255, 255, 255, 1);

				&:before {
					width: 160px;
					height: 180px;
					opacity: 1;
					background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.3) 100%);
				}

				&:after {
					width: 160px;
					height: 8px;
					opacity: 1;
					background: #00DDFF;
				}
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.h-bg-red1 {
		background-image: url('./img/red-1.png');
		width: 257px;
		height: 64px;
		background-size: 257px 64px;
		left: 738px;
		bottom: 60px;
		opacity: 0.6;

		&.active {
			opacity: 1;
		}
	}

	.h-bg-red2 {
		background-image: url('./img/red-2.png');
		width: 257px;
		height: 64px;
		background-size: 257px 64px;
		right: 738px;
		bottom: 60px;
		opacity: 0.6;

		&.active {
			opacity: 1;
		}
	}

	.h-bg-back {
		background-image: url('./img/bg1.png');
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.h-bg-top {
		background-image: url('./img/topyuan.svg');
		width: 2275px;
		height: 161px;
		left: 50%;
		top: 0;
		margin-left: -1137.5px;
		background-size: 2275px 161px;
	}

	.h-bg {
		height: 100%;
		background-size: 3500px 1050px;
		background-repeat: no-repeat;
		overflow: hidden;
		top: 0;

    &.bg54441 {
      background: url("./img/bg-54441.png") no-repeat;
      background-size: 100% 100%;
    }

		.bg-video {
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
		}
	}

	.h-bg-left {
		background-image: url('./img/left.svg');
		width: 948px;
		height: 1050px;
		background-size: 948px 1050px;
		left: 0;
		top: 0;
	}

	.h-bg-right {
		background-image: url('./img/right.svg');
		width: 948px;
		height: 1050px;
		background-size: 948px 1050px;
		right: 0;
		top: 0;
	}

	.h-bg-right {
		background-image: url('./img/right.svg');
	}

	.h-bg-center {
		width: 1768px;
		height: 584px;
		background-image: url('./img/center.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1768px 584px;
		left: 50%;
		margin-left: -884px;
		top: 50%;
		margin-top: -292px;
		pointer-events: none;
	}

	.h-bg-control {
		background-image: url('./img/control.svg');
		background-repeat: no-repeat;
		background-size: 2620px 498px;
		width: 2620px;
		height: 498px;
		bottom: -116px;
		left: 50%;
		margin-left: -1310px;
	}
</style>
