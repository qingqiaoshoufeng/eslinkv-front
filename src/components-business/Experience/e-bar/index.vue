<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="item" v-for="(k, i) in data.list" :key="i">
            <div class="num font-num">{{ k.percent }}%</div>
            <div class="bar-wrap">
                <div class="bar" :style="{top: `${100 - k.percent}%`}"></div>
            </div>
            <p class="txt">{{ k.txt }}</p>
        </div>
    </div>
</template>
<script>
    import mixins from '../../../../lib/mixins'
    import {value,config} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            
            this.configValue = this.parseConfigValue(value)
        },
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
            .num {
                font-weight: bold;
                font-size: 24px;
                line-height: 24px;
                color: #FFFFFF;
                margin-bottom: 8px;
            }

            .bar-wrap {
                position: relative;
                width: 16px;
                height: 136px;
                margin: 0 auto;
                background: #0057A9;

                .bar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    background: #00ddff;
                }
            }

            .txt {
                font-size: 16px;
                line-height: 16px;
                color: #00DDFF;
                margin-top: 8px;
            }
        }
    }
</style>

