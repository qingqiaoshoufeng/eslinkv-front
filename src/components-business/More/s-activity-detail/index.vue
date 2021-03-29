<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="left-circle"></div>
		<div class="main">
			<div class="main-lt">
				<div class="title">{{ data.name }}</div>
				<div class="base-info">
					<div class="base-info-item">
						<label>活动时间</label>
						<span>{{ data.startTime && data.startTime.match(/\S+/)[0] }}</span>
					</div>
					<div class="base-info-item">
						<label>活动地点</label>
						<span>{{ data.place }}</span>
					</div>
					<div class="base-info-item">
						<label>人员组成</label>
						<span>{{ data.people }}</span>
					</div>
				</div>
				<div class="detail-title">
					<div class="detail-title-logo">
						<img src="./img/detail-title.svg" alt=""/>
					</div>
					<span>活动详情</span>
				</div>
				<div class="content-wrap">
					<div class="content">{{ data.content }}</div>
				</div>
				<div class="quota">
					<div class="quota-left">
						<div class="qua-left-top">
							<div class="qlt-1">
								<p>{{ data.totalTaskNum }}</p>
								<label>总任务数(户)</label>
							</div>
							<div class="qlt-2">
								<p>{{ data.actualTaskNum }}</p>
								<label>实际入户(户)</label>
							</div>
						</div>
						<div class="chart">
							<div class="chart-main" :id="id"></div>
							<div class="chart__desc">
								<div class="chart__desc__rate font-num">
									{{ ~~data.taskRate }}%
								</div>
								<div class="chart__desc__font">入户率</div>
							</div>
						</div>
					</div>
					<div class="quota-detail">
						<div class="quota-detail-top">
							<div class="quota-icon">
								<img src="./img/quota3.svg">
								<div>
									<p>{{ data.consultNum }}</p>
									<label>现场咨询</label>
								</div>
							</div>
							<div class="quota-icon">
								<img src="./img/quota2.svg">
								<div>
									<p>{{ data.propagandaNum }}</p>
									<label>宣传册发放</label>
								</div>
							</div>
							<div class="quota-icon">
								<img src="./img/quota1.svg">
								<div>
									<p>{{ data.saleNum }}</p>
									<label>燃气具销量(台)</label>
								</div>
							</div>
						</div>
						<div class="quota-list-wrap">
							<img src="./img/arrow-lt.svg" @click="prevQuota">
							<swiper class="swiper" :options="swiperOption2" ref="quotaSwiper">
								<swiper-slide v-for="(k, i) in data.labelVOS" :key="i" class="quota-list-item">
									<span>{{ k.value }}</span>
									<p>{{ k.label }}</p>
								</swiper-slide>
							</swiper>
							<img src="./img/arrow-rt.svg" @click="nextQuota">
						</div>
					</div>
				</div>
				<div class="swiper2">
					<swiper :options="swiperOption">
						<swiper-slide
							v-for="(item, index) in data ? data.imgList : []"
							:key="index"
						>
							<div
								:style="{
									backgroundImage: 'url(' + item.img + ')',
								}"
								class="swiper-slide"
							></div>
						</swiper-slide>
					</swiper>
				</div>
			</div>
			<div class="main-rt">
				<video-player
					class="video-player-box"
					ref="videoPlayer"
					:options="playerOptions"
					:playsinline="true"
					customEventName="customstatechangedeventname"
				></video-player>
			</div>
		</div>
		<div class="right-circle"></div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import getOption from './options'
	import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	import { value } from './index.component'

	export default {
		components: {
			Swiper,
			SwiperSlide
		},
		mixins: [widgetMixin],
		data () {
			return {
				swiperOption2: {
					slidesPerView: 5,
					centeredSlides: true,
					spaceBetween: 30,
					loop: true,
					autoplay: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				},
				swiperOption: {
					slidesPerView: 4,
					spaceBetween: 30,
					centeredSlides: true,
					loop: true,
					autoplay: true
				},
				playerOptions: {
					width: 1352,
					height: 760,
					muted: true,
					language: 'en',
					playbackRates: [0.7, 1.0, 1.5, 2.0],
					autoplay: true,
					loop: true,
					sources: [
						{
							src: '/cdn/videos/sanshe.MOV'
						}
					]
				}
			}
		},
		methods: {
			setOption (data) {
				this.instance && this.instance.setOption(getOption(~~data.taskRate))
			},
			nextQuota () {
				this.$refs.quotaSwiper.$swiper.slideNext()
			},
			prevQuota () {
				this.$refs.quotaSwiper.$swiper.slidePrev()
			}
		},
		watch: {
			data: {
				handler (val) {
					if (this.id) {
						this.$nextTick(() => {
							const ref = document.getElementById(this.id)
							if (!ref) return
							this.instance = echarts.init(ref)
							this.setOption(val)
							this.playerOptions.sources[0].src = val.video
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		justify-content: space-between;
		width: 3500px;
		height: 1050px;
		padding: 0 280px;
		background: url('img/activity-service-bg.png') no-repeat;
		background-size: 100% 100%;

		.left-circle {
			width: 220px;
			height: 100%;
			background: url('/static/images/serves/left-circle.svg') no-repeat;
		}

		.right-circle {
			width: 220px;
			height: 100%;
			background: url('/static/images/serves/right-circle.svg') no-repeat;
		}
	}

	.main {
		display: flex;
		flex: 1;
		justify-content: space-between;
		margin-top: 150px;

		.main-lt {
			width: 992px;

			.title {
				position: relative;
				width: 992px;
				height: 64px;
				padding: 0 32px;
				font-size: 32px;
				line-height: 64px;
				color: #feffff;
				text-align: left;
				background: url('img/activity-title.svg') no-repeat;
				background-size: 100% 100%;

				&::before {
					position: absolute;
					top: 20px;
					left: 8px;
					display: block;
					width: 4px;
					height: 24px;
					content: '';
					background: #0df;
					box-shadow: 0 0 4px #0df;
				}

				&::after {
					position: absolute;
					top: 20px;
					right: 8px;
					display: block;
					width: 4px;
					height: 24px;
					content: '';
					background: #0df;
					box-shadow: 0 0 4px #0df;
				}
			}

			.base-info {
				display: flex;
				justify-content: space-between;
				margin-top: 16px;

				.base-info-item {
					width: 280px;
					height: 80px;
					padding: 10px 0 0 12px;
					text-align: left;
					background: linear-gradient(90deg, rgba(0, 221, 255, 0.2) 0%, rgba(0, 221, 255, 0) 100%);
					border-left: 4px solid rgba(0, 221, 255, 0.6);

					label {
						display: block;
						flex: none;
						margin-right: 16px;
						margin-bottom: 12px;
						font-size: 18px;
						line-height: 24px;
						color: #0df;
					}

					> span {
						flex: none;
						font-size: 18px;
						line-height: 24px;
						color: #feffff;
						text-align: left;
					}
				}
			}

			.detail-title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 44px;
				padding-left: 6px;
				margin: 24px 0 16px;
				background:
					linear-gradient(
						90deg,
						rgba(196, 196, 196, 0.2) 0%,
						rgba(196, 196, 196, 0) 100.94%
					);

				.detail-title-logo {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 32px;
					height: 32px;
					margin-right: 10px;
					background: #064f94;

					img {
						width: 22px;
						height: 24px;
					}
				}

				span {
					font-size: 20px;
					line-height: 24px;
					color: #feffff;
				}
			}

			.content-wrap {
				height: 160px;
				padding: 24px 8px 24px 24px;
				font-size: 18px;
				line-height: 32px;
				color: #fff;
				background: #001f6d;
				border-radius: 4px;
			}

			.content {
				height: 100%;
				padding-right: 29px;
				overflow-y: auto;

				&::-webkit-scrollbar {
					width: 10px; /* 高宽分别对应横竖滚动条的尺寸 */
					height: 1px;
				}

				&::-webkit-scrollbar-thumb {
					/* 滚动条里面小方块 */
					background: #0df;
				}

				&::-webkit-scrollbar-track {
					/* 滚动条里面轨道 */
					background: rgba(255, 255, 255, 0.4);
				}
			}

			.quota {
				display: flex;
				margin-top: 24px;

				.quota-left {
					flex: none;
					width: 264px;
					height: 214px;
					padding-top: 12px;
					margin-right: 32px;
					background: url("./img/anjiandi.svg") no-repeat;
					background-size: 100% 100%;

					.qua-left-top {
						display: flex;
						justify-content: space-around;
						margin-bottom: 4px;

						p {
							margin-bottom: 4px;
							font-family: font-num;
							font-size: 24px;
							font-weight: bold;
							line-height: 24px;
							color: #feffff;
						}

						label {
							font-size: 18px;
							line-height: 24px;
							color: rgba(255, 255, 255, 0.75);
						}
					}
				}

				.chart {
					position: relative;
					width: 136px;
					height: 136px;
					margin: 0 auto;
					//background-image: url('/static/icons/ellipse-dashed.svg');
					background-repeat: no-repeat;
					background-position: center;
					background-size: 100% 100%;

					.chart-main {
						width: 100%;
						height: 100%;
					}

					&__desc {
						position: absolute;
						top: 41px;
						left: 50%;
						display: flex;
						flex-direction: column;
						width: 100%;
						text-align: center;
						transform: translateX(-50%);

						&__rate {
							font-size: 32px;
							font-weight: bold;
							line-height: 32px;
							color: #feffff;
						}

						&__font {
							margin-top: 7px;
							font-size: 18px;
							line-height: 24px;
							color: rgba(255, 255, 255, 0.75);
						}
					}
				}

				.quota-detail {
					flex: 1;
					overflow: hidden;

					.quota-detail-top {
						display: flex;
						justify-content: space-between;
						padding-bottom: 32px;
						margin-bottom: 32px;
						text-align: left;
						border-bottom: 1px dashed #0df;

						.quota-icon {
							display: flex;

							img {
								width: 56px;
								height: 56px;
								margin-right: 16px;
							}

							p {
								font-family: font-num;
								font-size: 24px;
								font-weight: bold;
								line-height: 24px;
								color: #feffff;
							}

							label {
								display: block;
								margin-top: 8px;
								font-size: 18px;
								line-height: 24px;
								color: #0df;
							}
						}
					}

					.quota-list-wrap {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.swiper {
							width: 616px;

							&::after {
								content: none;
							}

							&::before {
								content: none;
							}
						}

						img {
							width: 20px;
							height: 40px;
						}

						.quota-list-item {
							flex: none;
							margin-right: 24px;
							text-align: left;

							span {
								font-family: font-num;
								font-size: 24px;
								font-style: normal;
								font-weight: bold;
								line-height: 24px;
								color: #feffff;
							}

							p {
								margin-top: 4px;
								font-size: 18px;
								line-height: 24px;
								color: #0df;
								white-space: nowrap;
							}
						}
					}
				}
			}

			.swiper2 {
				position: relative;
				margin-top: 30px;

				&::before {
					position: absolute;
					top: 0;
					left: -2px;
					z-index: 2;
					display: block;
					width: 160px;
					height: 160px;
					content: '';
					background:
						linear-gradient(
							90deg,
							rgba(2, 2, 61, 1) 0%,
							rgba(2, 2, 61, 0) 100%
						);
				}

				&::after {
					position: absolute;
					top: 0;
					right: -2px;
					z-index: 2;
					display: block;
					width: 160px;
					height: 160px;
					content: '';
					background:
						linear-gradient(
							270deg,
							rgba(2, 2, 61, 1) 0%,
							rgba(2, 2, 61, 0) 100%
						);
				}

				.swiper-slide {
					width: 240px;
					height: 160px;
				}
			}
		}

		.main-rt {
			width: 1488px;
			height: 838px;
			padding: 40px 68px 0;
			background: url('img/activity-right.svg') no-repeat;
			background-size: 100% 100%;

			&::v-deep .vjs-big-play-button {
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 72px;
				height: 72px;
				margin: auto;
				background: #fff;
				border-radius: 50%;

				.vjs-icon-placeholder::before {
					font-size: 50px;
					line-height: 70px;
					color: #000;
				}
			}
		}
	}
</style>

