<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="video-box">
			<div class="left">
				<!-- <div class="video" 
                    :style="{backgroundImage:'url('+ data&&data.imgList[data.activeIndex].img +')'}">
                    {{data.imgList[data.activeIndex].img}}
				</div>-->
				<!-- <img class="video" :src="data&&data.imgList[data.activeIndex].img" alt /> -->
				<video-player
					class="video-player-box"
					ref="videoPlayer"
					:options="playerOptions"
					:playsinline="true"
					customEventName="customstatechangedeventname"
				></video-player>
			</div>
			<div class="right">
				<div class="swiper-box">
					<div class="swiper-container gallery-thumbs getWidth">
						<div class="swiper-wrapper setWidth">
							<div
								class="swiper-slide"
								v-for="(item,index) in data&&data.imgList"
								:key="index"
								:style="{backgroundImage:'url('+item.img+')'}"
							></div>
						</div>
						<div class="swiper-pagination1"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import mixins from '../../mixins';
const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			// title: '数量',

			activeIndex: 0,
			imgList: [
				{
					img: '/static/images/project/01.png',
				},
				{
					img: '/static/images/project/02.jpg',
				},
				{
					img: '/static/images/project/03.jpg',
				},
				{
					img: '/static/images/project/04.jpg',
				},
			],
			videoList: [
                '/static/videos/test.mov',
                'http://www.17sucai.com/preview/501914/2017-08-04/%E9%A1%B5%E9%9D%A2/media/mov_bbb.mp4',
				'/static/videos/test.mov',
                'http://vjs.zencdn.net/v/oceans.mp4'
			],
		}),
	},
};
export default {
	mixins: [mixins],
	data() {
		return {
			galleryThumbs: null,
			playerOptions: {
				// videojs options
				width: 1352,
				height: 760,
				muted: true,
				language: 'en',
				playbackRates: [0.7, 1.0, 1.5, 2.0],
				autoplay: true,
				sources: [
					{
						type: 'video/mp4',
						src:
							'/static/videos/test.mov',
					},
				],
			},
		};
	},
	computed: {
		getUserType() {
            return videoList[data.activeIndex]
        },
	},
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	methods: {
		showVideo(bol) {
			let myPlayer = this.$refs.videoPlayer.player;
			if (bol) {
				myPlayer.src(this.getUserType); //根据userType的不同展示不同的视频地址
				return false;
			}
		},
	},
	mounted() {
		let _this = this;
		this.galleryThumbs = new Swiper('.gallery-thumbs', {
			direction: 'vertical',
			spaceBetween: 24,
			slidesPerView: 4,
			// freeMode: true,
			observer: true,
			observeParents: true,
			loop: true,
			autoplay: true,
			on: {
				init: function (swiper) {
					this.activeIndex = 0;
				},
				slideChange: function () {
					// 处理兼容 重新创建组件 会导致activeIndex数量翻倍 这里取余
					_this.data.activeIndex =this.activeIndex % _this.data.imgList.length;
					_this.playerOptions.sources[0].src = _this.data.videoList[_this.data.activeIndex]
				},
			},
			pagination: {
				el: '.swiper-pagination1',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '"></span>';
				},
			},
		});
	},
};
</script>
<style lang="scss">
.video-box {
	display: flex;
	.left {
		height: 838px;
		width: 1488px;
		background-image: url('/static/images/project/video-bg.png');
		.video-player-box {
			margin-top: 40px;
			margin-left: 65px;
			width: 1352px;
			height: 760px;
			background-size: cover;
		}
	}
	.right {
		margin-left: 40px;
		height: 835px;
		width: 420px;
		.swiper-box {
			width: 380px;
			height: 100%;
			display: flex;
			.swiper-container {
				height: 100%;
				width: 100%;
				// --swiper-theme-color: #ff6600;
				--swiper-pagination-color: #00ff33; /* 两种都可以 */
				.swiper-slide {
					width: 341px;
					background-size: cover;
				}
				.swiper-pagination1 {
					display: flex;
					background: #00217d;
					height: 839px;
					width: 4px;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					margin-left: 60px;
					position: absolute;
					right: 11px;
					span {
						height: 20px;
						width: 20px;
					}
					.swiper-pagination-bullet {
						height: 0;
						width: 0;
					}
					.swiper-pagination-bullet-active {
						height: 26px;
						width: 26px;
						background: #00ddff;
						border: 7px solid #067cac;
					}
				}
			}
		}

		.pagination {
			width: 26px;
			height: 100%;
			position: relative;
			.line {
				width: 4px;
				background-color: #00217d;
			}
		}
	}
}
</style>

