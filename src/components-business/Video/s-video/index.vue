<template>
    <div class="widget-part" :style="styles" v-if="data">
        <video-player
                class="video-player-box"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
        ></video-player>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        data() {
            return {
                playerOptions: {
                    width: 920,
                    height: 480,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    autoplay: false,
                    loop: true,
                    sources: [
                        {
                            src: '/cdn/videos/sanshe.MOV',
                        },
                    ],
                },
            };
        },
        watch: {
            data: {
                handler(val) {
                    this.playerOptions.sources[0].src = val?.videoSrc
                    this.playerOptions.poster = val?.poster
                },
                deep: true,
                immediate: true
            }
        },
        created() {
            this.configValue = this.parseConfigValue(value)
        }
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        background: url("img/video-bg.svg") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

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
</style>

