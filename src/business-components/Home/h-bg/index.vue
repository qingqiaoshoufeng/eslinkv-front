<template>
	<div class="widget-part pos-r" :style="`${styles}left:0px;top:0px;z-index:13;`">
		<div class="h-bg pos-r">
			<div class="h-bg-top pos-a"></div>
			<div class="h-bg-center pos-a"></div>
			<div class="h-bg-control pos-a"></div>
			<div class="h-bg-left pos-a"></div>
			<div class="h-bg-right pos-a"></div>
			<div class="h-bg-red1 pos-a pointer" :class="{active:status54441}" @click="open54441"></div>
			<div class="h-bg-red2 pos-a pointer" :class="{active:statusVideo}" @click="openVideo"></div>
			<transition name="slide-down">
				<h-bg-54441 v-if="status54441" :status="status54441" :close="close54441"/>
			</transition>
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
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart from '../../../openApi'
	import hBg54441 from './h-bg-54441'

	const config = {animation: true}
	export default {
		data() {
			return {
				status54441: false,
				statusVideo: false,
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
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config)
			document.addEventListener('DestroyScene', this.closeVideo, false)
		},
		methods: {
			handleClick(index) {
				GoldChart.scene.setSceneIndex(index)
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
<style lang="scss">
	.h-bg-nav {
		bottom: 27px;
		left: 50%;
		transform: translateX(-50%);

		li {
			color: #fff;
			font-weight: normal;
			font-size: 40px;
			line-height: 40px;
			margin-right: 174px;
			justify-content: center;

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
		left: 783px;
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
		right: 783px;
		bottom: 60px;
		opacity: 0.6;

		&.active {
			opacity: 1;
		}
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
		background-image: url('./img/bg.png');
		height: 100%;
		background-size: 3500px 1050px;
		background-repeat: no-repeat;
		overflow: hidden;
		top: 0;
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
	}

	.h-bg-control {
		background-image: url('./img/control.svg');
		background-repeat: no-repeat;
		background-size: 2620px 498px;
		width: 2620px;
		height: 498px;
		bottom: -148px;
		left: 50%;
		margin-left: -1310px;
	}
</style>
