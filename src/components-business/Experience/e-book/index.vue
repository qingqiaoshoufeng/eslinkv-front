<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="container">
            <ul class="tabs">
                <li :class="{active: i === tab}" v-for="(k, i) in data.list" :key="i" @click="changeTab(i)">
                    <span class="tab-name">{{ k.name }}</span>
                    <img src="./img/arrow.svg" v-show="i === tab">
                </li>
            </ul>
            <div class="main">
                <div class="content magazine animated"></div>
                <div class="btns">
                    <img src="./img/left2.svg" class="prev" @click="prePage" v-show="isStart">
                    <img src="./img/left1.svg" class="prev" @click="prePage" v-show="!isStart">
                    <img src="./img/right1.svg" class="next" @click="nextPage" v-show="!isEnd">
                    <img src="./img/right2.svg" class="next" @click="nextPage" v-show="isEnd">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins';
    import '../../../../plugins/turn.min'
    import {value, config} from './index.component'

    export default {
        mixins: [mixins],
        data() {
            return {
                tab: 1,
                isStart: false,
                isEnd: false
            }
        },
        computed: {
            curr() {
                if (!this.data) return {}
                return this.data.list[this.tab]
            }
        },
        watch: {
            data: {
                handler(val) {
                    if (val) {
                        let that = this
                        this.$nextTick(() => {
                            $('.magazine').turn({
                                width: 1035,
                                height: 696,
                                elevation: 50,
                                duration: 1000,
                                pages: val.list[this.tab].pageNumber,
                                page: 2,
                                gradients: true,
                                autoCenter: true,
                                when: {
                                    missing: function (e, pages) {
                                        for (let i = 0; i < pages.length; i++) {
                                            that.addPage(pages[i], $(this))
                                        }
                                    },
                                    last: e => {
                                        this.isEnd = true
                                    },
                                    start: e => {
                                        this.isEnd = false
                                        this.isStart = false
                                    },
                                    first: e => {
                                        this.isStart = true
                                    }
                                }
                            })
                        })
                    }
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            loadPage(page, pageElement) {
                var img = $('<img />')
                img.on('load', function () {
                    $(this).css({width: '100%', height: '100%'})
                    $(this).appendTo(pageElement)
                    pageElement.find('.loader').remove()
                })
                // img.attr('src', `pdf/${this.curr.id}/${page}.${this.curr.type}`)
                img.attr('src', `/cdn/pdf/${this.curr.id}/${page}.${this.curr.type}`)
                let reg = $('.p' + page)
                reg.appendTo(pageElement)
            },
            addPage(page, book) {
                const element = $('<div />', {}).html('<div class="gradient"></div><div class="loader"></div>')
                if (book.turn('addPage', element, page)) {
                    this.loadPage(page, element)
                }
            },
            nextPage() {
                $('.magazine').turn('next')
            },
            prePage() {
                $('.magazine').turn('previous')
            },
            changeTab(n) {
                this.tab = n
                const that = this
                $('.magazine').turn('destroy')
                $('.magazine').turn({
                    width: 1035,
                    height: 696,
                    elevation: 50,
                    duration: 1000,
                    pages: this.data.list[this.tab].pageNumber,
                    page: 2,
                    gradients: true,
                    autoCenter: true,
                    when: {
                        missing: function (e, pages) {
                            for (var i = 0; i < pages.length; i++) {
                                that.addPage(pages[i], $(this))
                            }
                        }
                    }
                })
            }
        },
        created() {
            this.configSource = this.parseConfigSource(config);
            this.configValue = this.parseConfigValue(config, value);
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        display: flex;
        width: 1600px;
        height: 860px;
        background: #060460;
        border: 2px solid #00DDFF;

        .tabs {
            background: #001A77;
            width: 200px;
            height: 100%;
            padding-top: 48px;

            li {
                cursor: pointer;
                padding: 0 14px 0 18px;
                height: 80px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 24px;
                color: rgba(255, 255, 255, 0.75);

                &.active {
                    color: #fff;
                    background: #0057A9;

                    &:before {
                        position: absolute;
                        content: '';
                        display: block;
                        left: 0;
                        top: 0;
                        width: 4px;
                        height: 80px;
                        background: #00DDFF;
                    }
                }

                > img {
                    width: 12px;
                    height: 12px;
                }
            }
        }

        .main {
            flex: 1;

            .content {
                width: 1035px;
                height: 696px;
                margin: 50px auto 35px !important;
            }

            .btns {
                display: flex;
                justify-content: center;
                align-items: center;

                .next {
                    margin-left: 60px;
                }
            }
        }

        /deep/ {
            .magazine {
                img {
                    width: 100%;
                }

                .page {
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                    background-color: white;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .even .gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.2) 100%);
                }

                .odd .gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(to left, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.15) 100%);
                }

                .loader {
                    background-image: url(./img/loader.gif);
                    background-repeat: no-repeat;
                    background-position: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 99;
                    background-color: #fff;
                }
            }

            .shadow {
                box-shadow: 0 0 20px #ccc;
            }

            .animated {
                transition: margin-left 0.5s;
            }
        }
    }
</style>

