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
    import mixins from '../../mixins'
    import getOption from './options'
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {value, config} from './index.component'

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        mixins: [mixins],
        data() {
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
                    autoplay: true,
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
                            src: '/cdn/videos/sanshe.MOV',
                        },
                    ],
                },
            };
        },
        methods: {
            setOption(data) {
                this.instance && this.instance.setOption(getOption(~~data.taskRate));
            },
            nextQuota() {
                this.$refs.quotaSwiper.$swiper.slideNext()
            },
            prevQuota() {
                this.$refs.quotaSwiper.$swiper.slidePrev()
            },
        },
        watch: {
            data: {
                handler(val) {
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
                immediate: true,
            },
        },
        created() {
            this.configValue = this.parseConfigValue(value)
        },
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        width: 3500px;
        height: 1050px;
        display: flex;
        justify-content: space-between;
        background: url('img/activity-service-bg.png') no-repeat;
        background-size: 100% 100%;
        padding: 0 280px;

        .left-circle {
            background: url('/static/images/serves/left-circle.svg') no-repeat;
            width: 220px;
            height: 100%;
        }

        .right-circle {
            background: url('/static/images/serves/right-circle.svg') no-repeat;
            width: 220px;
            height: 100%;
        }
    }

    .main {
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-top: 150px;

        .main-lt {
            width: 992px;

            .title {
                position: relative;
                background: url('img/activity-title.svg') no-repeat;
                background-size: 100% 100%;
                width: 992px;
                height: 64px;
                line-height: 64px;
                font-size: 32px;
                color: #feffff;
                padding: 0 32px;
                text-align: left;

                &:before {
                    display: block;
                    content: '';
                    position: absolute;
                    left: 8px;
                    width: 4px;
                    height: 24px;
                    top: 20px;
                    background: #00ddff;
                    box-shadow: 0px 0px 4px #00ddff;
                }

                &:after {
                    display: block;
                    content: '';
                    position: absolute;
                    right: 8px;
                    width: 4px;
                    height: 24px;
                    top: 20px;
                    background: #00ddff;
                    box-shadow: 0px 0px 4px #00ddff;
                }
            }

            .base-info {
                display: flex;
                justify-content: space-between;
                margin-top: 16px;

                .base-info-item {
                    width: 280px;
                    height: 80px;
                    background: linear-gradient(90deg, rgba(0, 221, 255, 0.2) 0%, rgba(0, 221, 255, 0) 100%);
                    border-left: 4px solid rgba(0, 221, 255, 0.6);
                    padding: 10px 0 0 12px;
                    text-align: left;

                    label {
                        display: block;
                        font-size: 18px;
                        line-height: 24px;
                        color: #00ddff;
                        margin-right: 16px;
                        flex: none;
                        margin-bottom: 12px;
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
                width: 100%;
                background: linear-gradient(
                                90deg,
                                rgba(196, 196, 196, 0.2) 0%,
                                rgba(196, 196, 196, 0) 100.94%
                );
                height: 44px;
                display: flex;
                align-items: center;
                padding-left: 6px;
                margin: 24px 0 16px;

                .detail-title-logo {
                    width: 32px;
                    height: 32px;
                    background: #064f94;
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
                    color: #feffff;
                }
            }

            .content-wrap {
                height: 160px;
                background: #001f6d;
                border-radius: 4px;
                font-size: 18px;
                line-height: 32px;
                color: #ffffff;
                padding: 24px 8px 24px 24px;
            }

            .content {
                height: 100%;
                padding-right: 29px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
                    height: 1px;
                }

                &::-webkit-scrollbar-thumb {
                    /*滚动条里面小方块*/
                    background: #00ddff;
                }

                &::-webkit-scrollbar-track {
                    /*滚动条里面轨道*/
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
                    margin-right: 32px;
                    background: url("./img/anjiandi.svg") no-repeat;
                    background-size: 100% 100%;
                    padding-top: 12px;

                    .qua-left-top {
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 4px;

                        p {
                            font-weight: bold;
                            font-size: 24px;
                            line-height: 24px;
                            color: #FEFFFF;
                            font-family: font-num;
                            margin-bottom: 4px;
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
                            color: #feffff;
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
                    flex: 1;
                    overflow: hidden;

                    .quota-detail-top {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        padding-bottom: 32px;
                        margin-bottom: 32px;
                        border-bottom: 1px dashed #00DDFF;

                        .quota-icon {
                            display: flex;

                            img {
                                width: 56px;
                                height: 56px;
                                margin-right: 16px;
                            }

                            p {
                                font-family: font-num;
                                font-weight: bold;
                                font-size: 24px;
                                line-height: 24px;
                                color: #FEFFFF;
                            }

                            label {
                                display: block;
                                font-size: 18px;
                                line-height: 24px;
                                color: #00DDFF;
                                margin-top: 8px;
                            }
                        }
                    }

                    .quota-list-wrap {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .swiper {
                            width: 616px;

                            &:after {
                                content: none
                            }

                            &:before {
                                content: none
                            }
                        }

                        img {
                            width: 20px;
                            height: 40px;
                        }

                        .quota-list-item {
                            text-align: left;
                            flex: none;
                            margin-right: 24px;

                            span {
                                font-family: font-num;
                                font-style: normal;
                                font-weight: bold;
                                font-size: 24px;
                                line-height: 24px;
                                color: #FEFFFF;
                            }

                            p {
                                font-size: 18px;
                                line-height: 24px;
                                color: #00DDFF;
                                margin-top: 4px;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }

            .swiper2 {
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
                    background: linear-gradient(
                                    90deg,
                                    rgba(2, 2, 61, 1) 0%,
                                    rgba(2, 2, 61, 0) 100%
                    );
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
                    background: linear-gradient(
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
            background: url('img/activity-right.svg') no-repeat;
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

