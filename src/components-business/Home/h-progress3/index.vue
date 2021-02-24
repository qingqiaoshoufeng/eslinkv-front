<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div v-for="(k, i) in data" class="item" :key="i">
            <img :src="k.icon">
            <div class="gas-main">
                <div class="gas-info">
                    <div class="gas-title">{{ k.name }}</div>
                    <div class="gas-percent font-num">{{ (k.percent).toFixed(2) }}%</div>
                    <div class="gas-num font-num"><em>{{ k.value | toThousand }}</em> {{ config.config.unit }}
                    </div>
                </div>
                <div class="gas-progress">
                    <div class="progress" :style="{width: k.percent + '%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '../../../../lib/mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            this.configValue = this.parseConfigValue(value)
        }
    }
</script>
<style lang="scss" scoped>
    .item {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        > img {
            width: 56px;
            height: 56px;
            margin-right: 16px;
        }

        .gas-main {
            flex: 1;
        }

        .gas-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .gas-title {
                font-size: 24px;
                line-height: 24px;
                color: #fff;
            }

            .gas-percent {
                font-weight: bold;
                font-size: 32px;
                line-height: 32px;
                color: #FFFFFF;
                margin-left: 16px;
                flex: 1;
                text-align: left;
            }

            .gas-num {
                font-size: 18px;
                line-height: 24px;
                color: #FFFFFF;

                em {
                    font-weight: bold;
                    font-size: 32px;
                    line-height: 32px;
                    font-style: normal;
                }
            }
        }
    }

    .gas-progress {
        height: 16px;
        background: #0057A9;
        padding: 4px 4px;
        margin-top: 10px;

        .progress {
            width: 260px;
            height: 8px;
            background: #00FFCF;
        }
    }
</style>

