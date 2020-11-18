<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="left-circle"></div>
		<div class="main">
			<div class="main-lt">
				<div class="title">{{ data&&data.title }}</div>
				<div class="base-info">
					<div class="base-info-item">
						<label>开始时间</label>
						<span>{{ data&&data.startTime }}</span>
					</div>
					<div class="base-info-item">
						<label>结束时间</label>
						<span>{{ data&&data.endTime }}</span>
					</div>
					<div class="base-info-item">
						<label>活动地点</label>
						<span>{{ data&&data.place }}</span>
					</div>
					<div class="base-info-item">
						<label>人员组成</label>
						<span>{{ data&&data.people }}</span>
					</div>
					<div class="base-info-item">
						<label>参加人数</label>
						<span>{{ data&&data.peopleNum }}人</span>
					</div>
					<div class="base-info-item">
						<label>计划服务用户数量</label>
						<span>{{ data&&data.planNum }}户</span>
					</div>

				</div>
				<div class="detail-title">
					<div class="detail-title-logo">
						<img src="./img/detail-title.svg" alt="">
					</div>
					<span>活动详情</span>
				</div>
				<div class="content-wrap">
					<div class="content">{{ data&&data.content }}</div>
				</div>
				<div class="quota">
					<div class="chart">
						<div class="chart-main" :id="id"></div>
						<div class="chart__desc">
							<div class="chart__desc__rate font-num">
								{{ data&&data.securityCheckRate }}%
							</div>
							<div class="chart__desc__font">
								安检率
							</div>
						</div>
					</div>
					<div class="quota-detail">
						<div class="quota-row">
							<div class="quota-row-head">
								<div class="quota-row-head-num font-num">{{ data&&data.planCheckNum }}</div>
								<div class="quota-row-head-txt">计划安检数(户)</div>
							</div>
							<div class="quota-item">
								<div class="quota-item-logo">
									<img src="./img/quota1.svg">
								</div>
								<div>
									<div class="quota-item-num font-num">{{ data&&data.brochuresNum }}</div>
									<div class="quota-item-txt">宣传册发放</div>
								</div>
							</div>
							<div class="quota-item">
								<div class="quota-item-logo">
									<img src="./img/quota1.svg">
								</div>
								<div>
									<div class="quota-item-num font-num">{{ data&&data.uSaleNum }}</div>
									<div class="quota-item-txt">优家销量(台)</div>
								</div>
							</div>
							<div class="quota-item">
								<div class="quota-item-logo">
									<img src="./img/quota1.svg">
								</div>
								<div>
									<div class="quota-item-num font-num">{{ data&&data.uSaleMoney }}</div>
									<div class="quota-item-txt">优家销售额(元)</div>
								</div>
							</div>
						</div>
						<div class="quota-row">
							<div class="quota-row-head">
								<div class="quota-row-head-num font-num">{{ data&&data.actualCheckNum }}</div>
								<div class="quota-row-head-txt">实际安检数(户)</div>
							</div>
							<div class="quota-item">
								<div class="quota-item-logo">
									<img src="./img/quota1.svg">
								</div>
								<div>
									<div class="quota-item-num font-num">{{ data&&data.installNum }}</div>
									<div class="quota-item-txt">现场安装数</div>
								</div>
							</div>
							<div class="quota-item">
								<div class="quota-item-logo">
									<img src="./img/quota1.svg">
								</div>
								<div>
									<div class="quota-item-num font-num">{{ data&&data.repairNum }}</div>
									<div class="quota-item-txt">现场维修数</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in data?data.imgList:[]" :key="index">
							<div :style="{backgroundImage:'url('+item.img+')'}" class="swiper-slide"></div>
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
	import mixins from '../../mixins';
	import getOption from './options';
	import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
				title: '桂花城紫云苑-杭燃服务进社区活动',
				startTime: '2020/10/01  08:30',
				endTime: '2020/10/01  08:30',
				place: '桂花城紫云苑',
				people: '退休职工',
				peopleNum: 220,
				planNum: 160,
				content: `为积极彰显企业担当，更好地为用户提供优质满意的杭燃服务。9月13日上午，杭天管网输配分公司28名正气志愿者
            联合杭天服务发展公司27名工作人员，走进盛德嘉苑、假山新村、天时苑、盛德欣苑等小区开展“三社联动、安心安
            居”杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份...27名工作人员，走进盛德嘉苑、假山新村、天时苑、盛德欣苑等小区开展“三社联动、安心安
            居”杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份...
            杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份
            杭燃服务进社区活动，与社区居民积极互动，现场咨询42人/次，发放宣传资料31份`,
				securityCheckRate: 90,
				planCheckNum: 120,
				brochuresNum: 210,
				uSaleNum: 64,
				uSaleMoney: '24,910',
				actualCheckNum: 120,
				installNum: 60,
				repairNum: 120,
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
				video: '/static/videos/test.mov'
			}),
		},
	};
	export default {
		components: {
			Swiper,
			SwiperSlide
		},
		mixins: [mixins],
		data() {
			return {
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
							type: 'video/mp4',
							src: '/static/videos/test.mov',
						},
					],
				}
			}
		},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(data.securityCheckRate))
			},
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(val)
							this.$refs.videoPlayer.player.src(val.video)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		}
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		width: 3500px;
		height: 1050px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: url("./img/activity-service-bg.png") no-repeat;
		background-size: 100% 100%;
		padding: 0 280px;

		.left-circle {
			background: url("/static/images/serves/left-circle.svg") no-repeat;
			background-size: 100% 100%;
			width: 220px;
			height: 100%;
		}

		.right-circle {
			background: url("/static/images/serves/right-circle.svg") no-repeat;
			background-size: 100% 100%;
			width: 220px;
			height: 100%;
		}
	}

	.main {
		flex: 1;
		display: flex;
		justify-content: space-between;

		.main-lt {
			width: 992px;

			.title {
				position: relative;
				background: url("./img/activity-title.svg") no-repeat;
				background-size: 100% 100%;
				width: 992px;
				height: 64px;
				line-height: 64px;
				font-size: 32px;
				color: #FEFFFF;
				padding: 0 32px;

				&:before {
					display: block;
					content: '';
					position: absolute;
					left: 8px;
					width: 4px;
					height: 24px;
					top: 20px;
					background: #00DDFF;
					box-shadow: 0px 0px 4px #00DDFF;
				}

				&:after {
					display: block;
					content: '';
					position: absolute;
					right: 8px;
					width: 4px;
					height: 24px;
					top: 20px;
					background: #00DDFF;
					box-shadow: 0px 0px 4px #00DDFF;
				}
			}

			.base-info {
				display: flex;
				flex-wrap: wrap;
				padding-right: 300px;
				margin-top: 24px;

				.base-info-item {
					width: 326px;
					margin-bottom: 16px;

					label {
						font-size: 18px;
						line-height: 24px;
						color: #00DDFF;
						margin-right: 16px;
					}

					> span {
						font-size: 18px;
						line-height: 24px;
						color: #FEFFFF;
					}
				}
			}

			.detail-title {
				width: 100%;
				background: linear-gradient(90deg, rgba(196, 196, 196, 0.2) 0%, rgba(196, 196, 196, 0) 100.94%);
				height: 44px;
				display: flex;
				align-items: center;
				padding-left: 6px;
				margin: 8px 0 16px;

				.detail-title-logo {
					width: 32px;
					height: 32px;
					background: #064F94;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 10px;

					img {
						width: 22px;
						height: 24px;
					}
				}

				span {
					font-size: 20px;
					line-height: 24px;
					color: #FEFFFF;
				}
			}

			.content-wrap {
				height: 160px;
				background: #001F6D;
				border-radius: 4px;
				font-size: 18px;
				line-height: 32px;
				color: #FFFFFF;
				padding: 24px 8px 24px 24px;
			}

			.content {
				height: 100%;
				padding-right: 29px;
				overflow-y: auto;

				&::-webkit-scrollbar { /*滚动条整体样式*/
					width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
					height: 1px;
				}

				&::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
					background: #00DDFF;
				}

				&::-webkit-scrollbar-track { /*滚动条里面轨道*/
					background: rgba(255, 255, 255, 0.4);
				}
			}

			.quota {
				display: flex;
				margin-top: 44px;

				.chart {
					position: relative;
					width: 136px;
					height: 136px;
					flex: none;
					margin-right: 30px;
					background-image: url('/static/icons/ellipse-dashed.svg');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					background-position: center;

					.chart-main {
						width: 100%;
						height: 100%;
					}

					&__desc {
						position: absolute;
						display: flex;
						flex-direction: column;
						top: 41px;
						left: 50%;
						width: 100%;
						text-align: center;
						transform: translateX(-50%);

						&__rate {
							font-weight: bold;
							font-size: 32px;
							line-height: 32px;
							color: #FEFFFF;
						}

						&__font {
							font-size: 18px;
							line-height: 24px;
							color: rgba(255, 255, 255, 0.75);
							margin-top: 7px;
						}
					}
				}

				.quota-detail {
					.quota-row {
						display: flex;
						margin-bottom: 16px;

						.quota-row-head {
							width: 144px;

							.quota-row-head-num {
								font-weight: bold;
								font-size: 24px;
								line-height: 24px;
								color: #FEFFFF;
							}

							.quota-row-head-txt {
								font-size: 18px;
								line-height: 24px;
								color: rgba(255, 255, 255, 0.75);
								margin-top: 4px;
							}
						}

						.quota-item {
							display: flex;
							width: 200px;

							.quota-item-logo {
								width: 56px;
								height: 56px;
								background: #064F94;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 16px;
							}

							.quota-item-num {
								font-weight: bold;
								font-size: 24px;
								line-height: 24px;
								color: #FEFFFF;
							}

							.quota-item-txt {
								font-size: 18px;
								line-height: 24px;
								color: #00DDFF;
								margin-top: 8px;
							}
						}
					}
				}
			}

			.swiper {
				margin-top: 30px;
				position: relative;

				&:before {
					content: '';
					display: block;
					z-index: 2;
					position: absolute;
					left: -2px;
					top: 0;
					width: 160px;
					height: 160px;
					background: linear-gradient(90deg, rgba(2, 2, 61, 1) 0%, rgba(2, 2, 61, 0) 100%);
				}

				&:after {
					content: '';
					display: block;
					z-index: 2;
					position: absolute;
					right: -2px;
					top: 0;
					width: 160px;
					height: 160px;
					background: linear-gradient(270deg, rgba(2, 2, 61, 1) 0%, rgba(2, 2, 61, 0) 100%);
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
			background: url("./img/activity-right.svg") no-repeat;
			background-size: 100% 100%;
			padding: 40px 68px 0;

			/deep/ .vjs-big-play-button {
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;
				border-radius: 50%;
				width: 72px;
				height: 72px;
				background: #fff;

				.vjs-icon-placeholder:before {
					color: #000;
					font-size: 50px;
					line-height: 70px;
				}
			}
		}
	}
</style>

