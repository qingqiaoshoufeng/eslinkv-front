<template>
    <div class="h-table-status widget-part" :style="styles" v-if="data">
        <ul class="h-table-status__title">
            <li>时间</li>
            <li>业务类型</li>
            <li>渠道</li>
            <li>客户</li>
            <li>状态</li>
        </ul>
        <div
                class="h-table-status__content"
                @mouseenter="isStop = true"
                @mouseleave="isStop = false"
        >
            <ul
                    class="h-table-status__content__row"
                    v-for="(item, index) in curr"
                    :key="index">
                <li>{{item.time || ''}}</li>
                <li>{{item.businessType || ''}}</li>
                <li>{{item.channel || ''}}</li>
                <li>{{item.customer || ''}}</li>
                <li :class="{active: item.statusDesc === '已处理'}">{{item.statusDesc || ''}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import mixins from '../../../../lib/mixins'
    import {config, value} from './index.component'

    const SIZE = 4
    export default {
        mixins: [mixins],
        data() {
            return {
                timer: null,
                loop: 0,
                isStop: false
            }
        },
        watch: {
            data: {
                handler(val) {
                    clearInterval(this.timer)
                    this.loop = 0
                    this.timer = setInterval(() => {
                        if (this.isStop) return
                        if (this.loop === Math.ceil(val.length / SIZE) - 1) {
                            this.loop = 0
                        } else {
                            this.loop++
                        }
                    }, 2000)
                },
                deep: true,
                immediate: true
            },
        },
        computed: {
            curr() {
                if (!this.data) return []
                return this.data.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
            }
        },
        created() {
            this.configValue = this.parseConfigValue(value)
        },
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null
        }
    }
</script>
<style lang="scss">
    .h-table-status {
        &__title {
            width: 480px;
            height: 32px;
            background: rgba(23, 123, 255, 0.2);
            display: flex;
            align-items: center;
            padding: 8px;
            box-sizing: border-box;

            & > li {
                font-size: 16px;
                line-height: 16px;
                color: #00CBF4;
                text-align: left;

                &:nth-child(1) {
                    width: 104px;
                }

                &:nth-child(2) {
                    width: 114px;
                }

                &:nth-child(3) {
                    width: 80px;
                }

                &:nth-child(4) {
                    width: 120px;
                }

                &:nth-child(5) {
                    width: 56px;
                }
            }
        }

        &__content {
            margin-top: 9px;
            height: 152px;

            &__seamless-warp {
                height: 152px;
                overflow: hidden;
            }

            &__row {
                width: 480px;
                height: 24px;
                display: flex;
                align-items: center;
                padding: 4px 8px;
                box-sizing: border-box;
                margin-top: 16px;

                & > li {
                    text-align: left;
                    font-size: 16px;
                    line-height: 16px;
                    color: #FFFFFF;

                    &:nth-child(1) {
                        width: 104px;
                        color: rgba(255, 255, 255, 0.6);
                    }

                    &:nth-child(2) {
                        width: 114px;
                    }

                    &:nth-child(3) {
                        width: 80px;
                    }

                    &:nth-child(4) {
                        width: 120px;
                    }

                    &:nth-child(5) {
                        width: 56px;
                        color: #FF7217;

                        &.active {
                            color: #00FFCF;
                        }
                    }
                }
            }
        }
    }
</style>

