<template>
	<div class="swiper-box1">
		<!-- 轮播视频部分 -->
		<div class="swiper-Part">
			<!-- 视频区域 -->
			<div class="left pos-r">
				<live-video @getPuList="getPuList" ref="live"></live-video>
			</div>
			<!-- 轮播图区域 -->
			<div class="right">
				<div class="select" v-if="deviceList.length">
					<div class="current ellipsis" @click="isShowDevice = !isShowDevice">
						<span>{{ deviceList[deviceIndex].Name }}</span>
						<img src="./img/arrow-down.svg">
					</div>
					<div class="options" v-show="isShowDevice">
						<div
							class="option ellipsis"
							v-for="(k, i) in deviceList"
							:key="i"
							:class="{active: i === deviceIndex}"
							@click="chooseDevice(i)"
						>
							{{ k.Name }}
						</div>
					</div>
				</div>
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
		<!--		<div class="carout-Part" v-if="[5].includes(step)">-->
		<!--			<video src="/static/images/airfeed/carout03.webm" controls="controls" autoplay="autoplay" muted="muted"-->
		<!--				   loop>-->
		<!--			</video>-->
		<!--		</div>-->
	</div>
</template>
<script>
	import Swiper from 'swiper'
	import 'swiper/css/swiper.min.css'
	import liveVideo from './live-video.vue'

	export default {
		components: { liveVideo },
		props: {
			step: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				deviceIndex: 0,
				deviceList: [],
				swiper: null,
				isShowDevice: false,
				galleryThumbs: null,
				galleryThumbs1: null
			}
		},
		methods: {
			chooseDevice (index) {
				if (index === this.deviceIndex) return
				this.deviceIndex = index
				this.isShowDevice = false
				this.$refs.live.updateDevice(index)
			},
			getPuList (list) {
				this.deviceList = list
			},
			swiperInit (swiper, tag, spaceBetween, slidesPerView, isControl) {
				const _this = this
				const options = {
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
							}px"></span>`
						}
					},
					on: {
						init: function (swiper) {
							this.activeIndex = 0
						},
						slideChange: function () {
							// 处理兼容 重新创建组件 会导致activeIndex数量翻倍 这里取余
						}
					}
				}
				return new Swiper(`${tag}`, options)
			}
		},
		mounted () {
			this.swiper = this.swiperInit(
				this.galleryThumbs,
				'.swiper-swiper',
				24,
				2.5,
				true
			)
		}
	}
</script>
<style lang="scss">
	.swiper-box1 {
		width: 992px;
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
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100%;

			.left {
				width: 640px;
				height: 400px;

				.video-player-box {
					width: 640px;
					height: 400px;
				}

				video,
				.video-js {
					width: 640px;
					height: 400px;
				}
			}

			.right {
				position: relative;
				width: 340px;
				height: 400px;

				.select {
					position: absolute;
					top: -42px;
					right: 10px;

					.current {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 180px;
						height: 32px;
						font-size: 20px;
						font-weight: 600;
						color: #fff;
						background: #0057a9;
						border: 1px solid #0df;
						border-radius: 4px;
					}

					.options {
						position: absolute;
						top: 36px;
						right: 0;
						left: 0;
						z-index: 9;
						padding: 8px 0;
						background: #0057a9;
						border-radius: 4px;

						.option {
							font-size: 20px;
							color: rgba(255, 255, 255, 0.75);
							text-align: center;
							cursor: pointer;

							& ~ .option {
								margin-top: 8px;
							}

							&.active,
							&:hover {
								font-weight: 600;
								color: #fff;
								background: rgba(0, 221, 255, 0.3);
							}
						}
					}
				}

				.swiper-area {
					position: relative;
					width: 340px;
					height: 400px;

					.swiper-swiper {
						width: 340px;
						height: 100%;

						.swiper-wrapper {
							position: relative;
							left: -10px;
							width: 320px;
						}

						.swiper-pagination {
							position: absolute;
							top: 200px;
							right: 11px;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: start;
							width: 8px;
							height: 400px;
							margin-left: 60px;
							background: #00217d;

							span {
								width: 8px;
							}

							.swiper-pagination-bullet {
								width: 0;
								height: 0;
								margin: 0 0 !important;
								border-radius: 0;
							}

							.swiper-pagination-bullet-active {
								width: 8px;
								background: #0df;
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

