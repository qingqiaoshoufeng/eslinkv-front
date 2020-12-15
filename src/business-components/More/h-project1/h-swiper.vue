<template>
	<div class="swiper-box1">
		<!-- 轮播视频部分 -->
		<div class="swiper-Part" v-if="![7,8].includes(step)">
			<!-- 视频区域 -->
			<div class="left pos-r">
        <live-video></live-video>
			</div>
			<!-- 轮播图区域 -->
			<div class="right">
				<div class="swiper-area">
					<div class="swiper-container gallery-thumbs swiper-swiper">
						<div class="swiper-wrapper" ref="backTop">
							<div class="swiper-slide">
                <img src="./img/fixing-1.png">
              </div>
							<div class="swiper-slide">
                <img src="./img/fixing-2.png">
              </div>
							<div class="swiper-slide">
                <img src="./img/fixing-3.png">
              </div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 出车抢修部分 -->
		<div class="carout-Part" v-if="[5].includes(step)">
			<video src="/static/images/airfeed/carout03.webm" controls="controls" autoplay="autoplay" muted="muted"
				   loop>
			</video>
		</div>
	</div>
</template>
<script>
	import Swiper from 'swiper';
	import 'swiper/css/swiper.min.css';
	import LiveVideo from '@/components/LiveVideo'

	export default {
	  components: { LiveVideo },
		props: {
			step: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				swiper: null,
				galleryThumbs: null,
				galleryThumbs1: null,
			};
		},
		methods: {
			swiperInit(swiper, tag, spaceBetween, slidesPerView, isControl) {
				let _this = this;
				let options = {
					direction: 'vertical',
					spaceBetween: spaceBetween,
					slidesPerView: slidesPerView,
					observer: true,
					observeParents: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
							return `<span class="${className}" style="height:${
							400 / 2
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
		},
		mounted() {
			this.swiper = this.swiperInit(
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
		background-color: rgba(1, 1, 1, 0);

		.swiper-slide {
			background-size: cover;
      img {
        width: 100%;
        height: 100%;
      }
		}

		.swiper-Part {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.left {
				width: 640px;
				height: 400px;

				.video-player-box {
					width: 640px;
					height: 400px;
				}

				video, .video-js {
					width: 640px;
					height: 400px;
				}
			}

			.right {
				width: 340px;
				height: 400px;

				.swiper-area {
					width: 340px;
					height: 400px;
					position: relative;

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

		.carout-Part {
			video::-webkit-media-controls {
				display: none !important;
			}
		}
	}
</style>

