<template>
    <div class="widget-part" :style="styles" v-if="data">
        <ETable :list="data.list" :size="4" :titles="data.titles"></ETable>
    </div>
</template>
<script>
    import mixins from 'eslink-npm/mixins'
    import ETable from './ETable'
    import {value} from './index.component'

    export default {
        mixins: [mixins],
        components: {ETable},
        created() {
            this.configValue = this.parseConfigValue(value)
        }
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        .title {
            width: 100%;
            height: 32px;
            background: rgba(23, 123, 255, 0.2);
            display: flex;
            align-items: center;
            box-sizing: border-box;

            & > li {
                font-size: 18px;
                line-height: 24px;
                color: #00CBF4;
                padding-left: 8px;
                text-align: left;

                &:nth-child(1) {
                    margin-right: 8px;
                    width: 24px;
                    height: 24px;
                }

                &:nth-child(2) {
                    width: 240px;
                }

                &:nth-child(3) {
                    width: 90px;
                }

                &:nth-child(4) {
                    width: 65px;
                }

                &:nth-child(5) {
                    flex: 1;
                }
            }
        }

        .content {
            height: 170px;

            &__seamless-warp1 {
                height: 170px;
                overflow: hidden;
            }

            &__row1 {
                height: 32px;
                display: flex;
                align-items: center;
                padding-left: 8px;
                box-sizing: border-box;

                &:first-child > li.first {
                    background: #FF7217;
                }

                & > li {
                    text-align: left;
                    font-size: 18px;
                    line-height: 24px;
                    color: #FFFFFF;

                    &:nth-child(1) {
                        width: 24px;
                        height: 24px;
                        background: #0057A9;
                        font-weight: bold;
                        text-align: center;
                        margin-right: 8px;
                    }

                    &:nth-child(2) {
                        width: 240px;
                    }

                    &:nth-child(3) {
                        width: 90px;
                    }

                    &:nth-child(4) {
                        width: 65px;
                    }

                    &:nth-child(5) {
                        flex: 1;
                    }
                }
            }
        }
    }
</style>

