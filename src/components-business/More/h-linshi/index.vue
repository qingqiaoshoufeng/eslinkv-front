<template>
    <div class="widget-part" :style="styles" v-if="data" ref="img">
        <section class="title">
            <img src="/static/icons/left-icon.svg">
            <div class="title-txt">杭燃供气</div>
            <img src="/static/icons/right-icon.svg">
        </section>
        <div class="container" style="padding-bottom: 10px;">
            <section class="total">
                <img src="./img/air-bar.svg" class="total-icon">
                <div class="total-info">
                    <div class="total-title">年度累计供气量</div>
                    <div class="num font-num">{{ data.total | toThousand }} <span>m³</span></div>
                </div>
            </section>
            <ul class="air">
                <li class="li">
                    <div class="air-name">门站</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.shop | toThousand }}</span>
                        <span class="air-unit">座</span>
                    </div>
                </li>
                <li class="li">
                    <div class="air-name">高压管线</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.highPipeline/1000  | toThousand }}</span>
                        <span class="air-unit">km</span>
                    </div>
                </li>
                <li class="li">
                    <div class="air-name">高中压调压站</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.pressureStation | toThousand }}</span>
                        <span class="air-unit">个</span>
                    </div>
                </li>
                <li class="li">
                    <div class="air-name">中压管线</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.mediumPipeline/1000  | toThousand }}</span>
                        <span class="air-unit">km</span>
                    </div>
                </li>
                <li class="li">
                    <div class="air-name">应急气源站</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.gasStation | toThousand }}</span>
                        <span class="air-unit">座</span>
                    </div>
                </li>
                <li class="li">
                    <div class="air-name">低压管线</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.lowPipeline/1000 | toThousand }}</span>
                        <span class="air-unit">km</span>
                    </div>
                </li>
                <li class="li">
                    <div class="air-name">调压器</div>
                    <div>
                        <span class="air-num font-num">{{ data.air.voltageRegulator | toThousand }}</span>
                        <span class="air-unit">个</span>
                    </div>
                </li>
            </ul>
        </div>
        <section class="title">
            <img src="/static/icons/left-icon.svg">
            <div class="title-txt">杭燃服务</div>
            <img src="/static/icons/right-icon.svg">
        </section>

        <div class="container">
            <section class="service">
                <ul>
                    <li class="li">
                        <div class="air-name">居民户</div>
                        <div>
                            <span class="air-num font-num">{{ data.service.household | toThousand }}</span>
                            <span class="air-unit">户</span>
                        </div>
                    </li>
                    <li class="li">
                        <div class="air-name">公建用户</div>
                        <div>
                            <span class="air-num font-num">{{ data.service.publicUsers | toThousand }}</span>
                            <span class="air-unit">户</span>
                        </div>
                    </li>
                    <li class="li">
                        <div class="air-name">工业用户</div>
                        <div>
                            <span class="air-num font-num">{{ data.service.industrialUsers | toThousand }}</span>
                            <span class="air-unit">户</span>
                        </div>
                    </li>
                    <li class="li">
                        <div class="air-name">在用钢瓶用户</div>
                        <div>
                            <span class="air-num font-num">{{ data.service.inUseUsers | toThousand }}</span>
                            <span class="air-unit">户</span>
                        </div>
                    </li>
                    <li class="li">
                        <div class="air-name">在册钢瓶用户</div>
                        <div>
                            <span class="air-num font-num">{{ data.service.registeredUsers | toThousand }}</span>
                            <span class="air-unit">户</span>
                        </div>
                    </li>
                </ul>
                <div class="standard">
                    <img src="./img/standard.svg">
                    <p>
                        一个工作日<br>
                        0份资料容缺受理<br>
                        受理通气两个环节
                    </p>
                </div>
            </section>
            <section class="links">
                <div class="link" :class="{active: animateActiveIndex === 0}">最多跑<br/>一次</div>
                <div class="link" :class="{active: animateActiveIndex === 1}">三社联动<br/>安心安居</div>
                <div class="link" :class="{active: animateActiveIndex === 2}">31个<br/>服务网点</div>
                <div class="link" :class="{active: animateActiveIndex === 3}">网上19<br/>营业厅</div>
                <div class="link" :class="{active: animateActiveIndex === 4}">杭燃码</div>
            </section>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, value, configSource} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            this.configSource = this.parseConfigSource(config, configSource)
            this.configValue = this.parseConfigValue(config, value)
        },
        mounted() {
            this.animateTimer = setInterval(() => {
                if (this.animateActiveIndex < 4) {
                    this.animateActiveIndex = this.animateActiveIndex + 1
                } else {
                    this.animateActiveIndex = 0
                }
            }, 1000)
        }
    }
</script>
<style lang="scss" scoped>
    .widget-part {
        transition: all .5s;
        padding-top: 40px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        background: rgba(0, 87, 169, 0.5);
        border: 1px solid #00DDFF;

        .title-txt {
            font-weight: 600;
            font-size: 32px;
            line-height: 32px;
            color: #FFFFFF;
            margin: 0 8px;
        }
    }

    .container {
        border: 1px solid #00DDFF;
        border-top-width: 0;
        padding: 30px 30px 20px;
        margin-bottom: 32px;
        background: #011B79;
    }

    .total {
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        .total-info {
            margin-left: 16px;
            text-align: left;

            .total-title {
                font-weight: 600;
                font-size: 24px;
                line-height: 24px;
                color: #5EE2FD;
            }

            .num {
                font-weight: bold;
                font-size: 48px;
                line-height: 48px;
                color: #FFFFFF;
                margin-top: 16px;

                span {
                    font-weight: normal;
                    font-size: 24px;
                    line-height: 24px;
                    color: #FFFFFF;
                }
            }
        }
    }

    .air {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 494px;
    }

    .li {
        width: 232px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #0057A9;
        padding-bottom: 8px;
        margin-bottom: 20px;
        position: relative;
        white-space: nowrap;

        &:before {
            content: '';
            display: block;
            width: 3px;
            height: 3px;
            background: #00DDFF;
            position: absolute;
            left: 0;
            bottom: -1.5px;
        }

        &:after {
            content: '';
            display: block;
            width: 3px;
            height: 3px;
            background: #00DDFF;
            position: absolute;
            right: 0;
            bottom: -1.5px;
        }

        .air-name {
            font-size: 20px;
            line-height: 20px;
            color: #5EE2FD;
        }

        .air-num {
            font-weight: bold;
            font-size: 32px;
            line-height: 32px;
            color: #FFFFFF;
        }

        .air-unit {
            font-size: 20px;
            line-height: 20px;
            color: #FFFFFF;
            margin-left: 4px;
        }
    }

    .service {
        display: flex;
        align-items: center;

        .li {
            width: 336px;
            margin-right: 48px;
            margin-bottom: 9px;
        }

        .standard {
            img {
                width: 144px;
                height: 130px;
            }

            p {
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #5EE2FD;
                margin-top: 4px;
            }
        }
    }

    .links {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .link {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            line-height: 24px;
            color: #FFFFFF;
            background-color: rgba(0, 87, 169, 0.5);
            border-radius: 50%;
            background-image: url("./img/link-bg.svg");
            background-repeat: no-repeat;
            background-size: 0;
            transition: all .3s;

            &.active {
                background-size: 100% 100%;
            }
        }
    }
</style>

