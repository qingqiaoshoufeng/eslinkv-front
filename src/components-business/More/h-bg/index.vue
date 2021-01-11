<template>
    <div class="widget-part pos-r" :style="`${styles}left:0px;top:0px;z-index:1002;`">
        <div class="h-bg pos-r">
            <div class="h-bg-back pos-a"></div>
            <div class="h-bg-5441 pos-a" v-if="status54441"></div>
            <template v-if="!status54441">
                <video id="video" class="pos-a bg-video" src="/static/videos/bg1.webm" autoplay="autoplay" @ended="end"
                       ref="video"
                       v-show="!video1Ended"></video>
                <video class="pos-a bg-video" src="/static/videos/bg2.webm" autoplay="autoplay" loop ref="video2"
                       v-show="video1Ended"></video>
            </template>
            <div class="h-bg-top pos-a"></div>
            <div class="h-bg-control pos-a"></div>
            <div class="h-bg-left pos-a"></div>
            <div class="h-bg-right pos-a"></div>
            <div @mouseover="hover54441=true"
                 @mouseleave="hover54441=false">
                <video class="h-bg-red1 pos-a pointer" src="./img/dengleft.webm" @click="open54441" v-if="hover54441"
                       autoplay="autoplay" loop="loop"></video>
                <div class="h-bg-red1 pos-a pointer" :class="{active:status54441}" @click="open54441"
                     v-else></div>
            </div>
            <div @mouseover="hoverVideo=true"
                 @mouseleave="hoverVideo=false">
                <video class="h-bg-red2 pos-a pointer" src="./img/dengright.webm" @click="openVideo"
                       v-if="hoverVideo" autoplay="autoplay" loop="loop"></video>
                <div class="h-bg-red2 pos-a pointer" :class="{active:statusVideo}" @click="openVideo"
                     v-else></div>
            </div>
            <h-bg-54441 v-if="status54441" :status="status54441" :close="close54441"/>
            <div class="h-bg-center pos-a"></div>
            <ul class="h-bg-nav pos-a fn-flex flex-row">
                <li class="pointer fn-flex flex-column pos-r" @click="handleClick('nn16rowdl5r')"
                    @mouseover="hoverNav1=true"
                    @mouseleave="hoverNav1=false">
                    <video class="pos-a" src="./img/nav-1.webm" v-if="hoverNav1" autoplay="autoplay"/>
                    <img class="pos-a" src="./img/nav-1.svg" v-show="!hoverNav1"/>
                    <span class="pos-a">杭燃供气</span>
                </li>
                <li class="pointer fn-flex flex-column pos-r" @click="handleClick('6gouq223fze')"
                    @mouseover="hoverNav2=true"
                    @mouseleave="hoverNav2=false">
                    <video class="pos-a" src="./img/nav-2.webm" v-if="hoverNav2" autoplay="autoplay"/>
                    <img class="pos-a" src="./img/nav-2.svg" v-show="!hoverNav2"/>
                    <span class="pos-a">杭燃服务</span>
                </li>
                <li class="pointer fn-flex flex-column pos-r" @click="handleClick('o8tkm981qdh')"
                    @mouseover="hoverNav3=true"
                    @mouseleave="hoverNav3=false">
                    <video class="pos-a" src="./img/nav-3.webm" v-if="hoverNav3" autoplay="autoplay"/>
                    <img class="pos-a" src="./img/nav-3.svg" v-show="!hoverNav3"/>
                    <span class="pos-a">杭燃优家</span>
                </li>
                <li class="pointer fn-flex flex-column pos-r" @click="handleClick('vxoiljh5my9')"
                    @mouseover="hoverNav4=true"
                    @mouseleave="hoverNav4=false">
                    <video class="pos-a" src="./img/nav-4.webm" v-if="hoverNav4" autoplay="autoplay"/>
                    <img class="pos-a" src="./img/nav-4.svg" v-show="!hoverNav4"/>
                    <span class="pos-a">杭燃体验</span>
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
    import hBg54441 from './h-bg-54441'
    import {config, value, configSource} from './index.component'

    export default {
        data() {
            return {
                hoverNav1: false,
                hoverNav2: false,
                hoverNav3: false,
                hoverNav4: false,
                hover54441: false,
                hoverVideo: false,
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
                    window.GoldChart.scene.createSceneInstance(JSON.parse(this.config.config.sceneId)[0], 'fadeIn', 'none')
                }
            }
            const video = document.getElementById('video')
            if (video) {
                if (video.paused) {
                    video.play()
                }
            }
        },
        methods: {
            end() {
                if (this.video1Ended) return
                this.video1Ended = true
            },
            handleStart() {
                if (this.config.config.sceneId) {
                    window.GoldChart.scene.createSceneInstance(JSON.parse(this.config.config.sceneId)[1], 'fadeIn')
                }
            },
            handleClick(index) {
                window.GoldChart.scene.setSceneIndex(index)
                window.GoldChart.scene.destroyScene(JSON.parse(this.config.config.sceneId)[0])
                this.status54441 = false
                this.statusVideo = false
            },
            open54441() {
                this.status54441 = true
                this.hover54441 = false
            },
            openVideo() {
                this.statusVideo = true
                this.hoverVideo = false
                window.GoldChart.scene.createSceneInstance('grdnn9tiey', 'slideUp')
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
        },
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
            width: 160px;
            height: 160px;
            
            span {
                font-size: 40px;
                line-height: 40px;
                top: 107px;
            }
            
            video {
                left: 50%;
                transform: translateX(-50%);
            }
            
            img {
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            
            &:nth-child(1) {
                video {
                    top: -6px;
                }
            }
            
            &:nth-child(2) {
                video {
                    top: -12px;
                }
            }
            
            &:nth-child(3) {
                video {
                    top: -6px;
                }
            }
            
            &:nth-child(4) {
                video {
                    top: -14px;
                }
            }
            
            &:before {
                content: '';
                position: absolute;
                opacity: 0;
                transition: all .3s;
                left: 50%;
                margin-left: -80px;
                width: 160px;
                height: 180px;
            }
            
            &:after {
                content: '';
                position: absolute;
                opacity: 0;
                left: 50%;
                width: 160px;
                height: 8px;
                margin-left: -80px;
                bottom: -27px;
                transition: all .3s;
            }
            
            &:hover {
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                
                &:before {
                    opacity: 1;
                    background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.3) 100%);
                }
                
                &:after {
                    opacity: 1;
                    background: #00DDFF;
                }
            }
            
            &:last-child {
                margin-right: 0;
            }
        }
    }
    
    div.h-bg-red1 {
        background-image: url('./img/red-1.png');
        background-size: 257px 64px;
        opacity: 0.6;
        
        &.active {
            opacity: 1;
        }
    }
    
    .h-bg-red1 {
        width: 257px;
        height: 64px;
        left: 738px;
        bottom: 60px;
    }
    
    div.h-bg-red2 {
        background-image: url('./img/red-2.png');
        background-size: 257px 64px;
        opacity: 0.6;
        
        &.active {
            opacity: 1;
        }
    }
    
    .h-bg-red2 {
        width: 257px;
        height: 64px;
        right: 738px;
        bottom: 60px;
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
    
    .h-bg-5441 {
        background: url("./img/bg-54441.png") no-repeat;
        background-size: 100% 100%;
        height: 100%;
        width: 100%;
    }
    
    .h-bg {
        height: 100%;
        background-size: 3500px 1050px;
        background-repeat: no-repeat;
        overflow: hidden;
        top: 0;
        
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
