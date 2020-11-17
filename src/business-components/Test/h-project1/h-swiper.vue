<template>
	<div class="swiper-box1">
		<!-- 轮播视频部分 -->
		<div class="swiper-Part" v-if="[7,8].includes(step)">
			<!-- 视频区域 -->
			<div class="left">
				<video-player
					class="video-player-box"
					ref="videoPlayer"
					:options="playerOptions"
					:playsinline="true"
					customEventName="customstatechangedeventname"
				></video-player>
			</div>
			<!-- 轮播图区域 -->
			<div class="right">
				<div class="swiper-area">
					<div class="swiper-container gallery-thumbs swiper-swiper">
						<div class="swiper-wrapper" ref="backTop">
							<div
								class="swiper-slide"
								v-for="(item,index) in swiperinfo.imgList"
								:key="index"
								:style="{backgroundImage:'url('+item+')'}"
								@click="toggerVideo(index)"
							></div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 出车抢修部分 -->
		<div class="carout-Part" v-if="[5].includes(step)">
            <video src="/static/images/airfeed/carout03.webm" controls="controls" autoplay="autoplay" muted="muted" loop>
            </video>
        </div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
	props: {
		swiperinfo: {
			type: Object,
			default() {
				return {
					imgList: [
						'/static/images/project/01.png',
						'/static/images/project/02.jpg',
						'/static/images/project/03.jpg',
						'/static/images/project/04.jpg',
					],
					videoList: [
						'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
						'http://www.17sucai.com/preview/501914/2017-08-04/%E9%A1%B5%E9%9D%A2/media/mov_bbb.mp4',
						'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
						'http://vjs.zencdn.net/v/oceans.mp4',
					],
				};
			},
        },
        step:{
            type:Number,
            default:0,
        }
	},
	data() {
		return {
			galleryThumbs: null,
			galleryThumbs1: null,
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
							'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
					},
				],
			},
		};
	},
	methods: {
		swiperInit(swiper, tag, spaceBetween, slidesPerView, isControl) {
			let _this = this;
			let options = {
				direction: 'vertical',
				spaceBetween: spaceBetween,
				slidesPerView: slidesPerView,
				// freeMode: true,
				observer: true,
				observeParents: true,
				// loop: true,
				// autoplay: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return `<span class="${className}" style="height:${
							400 / (_this.swiperinfo.imgList.length-1)
						}px"></span>`;
					},
				},
				on: {
					init: function (swiper) {
						this.activeIndex = 0;
					},
					slideChange: function () {
						// 处理兼容 重新创建组件 会导致activeIndex数量翻倍 这里取余
					},
				},
			};
			return new Swiper(`${tag}`, options);
		},
		handleScroll() {
			console.log('滚动高度', window.pageYOffset);
			console.log('距离顶部高度', this.$refs.backTop.scrollTop);
		},
		toggerVideo(index) {
			console.log(index);
			this.playerOptions.sources[0].src = this.swiperinfo.videoList[
				index
			];
		},
	},
	mounted() {
		let swiper2 = this.swiperInit(
			this.galleryThumbs,
			'.swiper-swiper',
			24,
			2.5,
			true
		);
	},
};
</script>
<style lang="scss">
.swiper-box1 {
	width: 1000px;
	height: 400px;
	margin-top: 390px;
	background-color: rgba(1,1,1,0);
	.swiper-Part {
		height: 100%;
		width: 100%;
		display: flex;
		// flex-direction: column;
		justify-content: space-between;

		.left {
			width: 640px;
			height: 400px;
			background-color: #fff;
			.video-player-box {
				width: 640px;
				height: 400px;
			}
            video,.video-js{
                width: 640px;
				height: 400px;
            }
		}
		.right {
			width: 340px;
			height: 400px;
			background-color: fff;
			.swiper-area {
				width: 340px;
				height: 400px;
				position: relative;
				// margin-left: -20px;
				.swiper-swiper {
					height: 100%;
					width: 340px;

					.swiper-wrapper {
						width: 320px;
						position: relative;
						left: -10px;
					}
					.swiper-pagination {
						display: flex;
						background: #00217d;
						height: 400px;
						width: 8px;
						flex-direction: column;
						align-items: flex-start;
						justify-content: start;
						margin-left: 60px;
						position: absolute;
						top: 200px;
						right: 11px;
						span {
							width: 8px;
						}
						.swiper-pagination-bullet {
							border-radius: 0;
							margin: 0 0 !important;
							height: 0;
							width: 0;
						}
						.swiper-pagination-bullet-active {
							width: 8px;
							background: #00ddff;
						}
					}
				}
			}
		}
	}
    .carout-Part{
         video::-webkit-media-controls{
            display:none !important;
        }
    }
}
</style>

