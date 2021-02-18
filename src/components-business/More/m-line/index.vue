<template>
    <div class="widget-part" :style="styles" v-if="data">
        <ul class="list">
            <li>
                <div class="title">
                    <div class="title-txt">{{data.name}}</div>
                    <div class="title-unit">用气量<span>(m³)</span></div>
                </div>
                <LineOne class="line-chart" :config="config1" :data="data.data1"></LineOne>
            </li>
            <li>
                <div class="title">
                    <div class="title-txt">{{data.name}}</div>
                    <div class="title-unit">累计流量<span>(m³)</span></div>
                </div>
                <LineOne class="line-chart" :config="config2" :data="data.data2"></LineOne>
            </li>
            <li>
                <div class="title">
                    <div class="title-txt">{{data.name}}</div>
                    <div class="title-unit">瞬时流量<span>(m³)</span></div>
                </div>
                <LineOne class="line-chart" :config="config3" :data="data.data3"></LineOne>
            </li>
            <li>
                <div class="title">
                    <div class="title-txt">{{data.name}}</div>
                    <div class="title-unit">压力<span>(kpa)</span></div>
                </div>
                <LineOne class="line-chart" :config="config4" :data="data.data4"></LineOne>
            </li>
            <li>
                <div class="title">
                    <div class="title-txt">{{data.name}}<br/></div>
                    <div class="title-unit">温度<span>(°C)</span></div>
                </div>
                <LineOne class="line-chart" style="height: 180px" :config="config5" :data="data.data5"></LineOne>
            </li>
        </ul>
    </div>
</template>
<script>
    import mixins from '../../mixins';
    import LineOne from '@/components/LineOne'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        components: {LineOne},
        data() {
            return {
                config1: {
                    lineColor: '#00DDFF',
                    lineStopColor: '',
                    scale: false,
                    isShowMarker: false,
                    isShowXAxis: false
                },
                config2: {
                    lineColor: '#FFDC45',
                    lineStopColor: '',
                    scale: false,
                    isShowMarker: true,
                    isShowXAxis: false
                },
                config3: {
                    lineColor: '#00DDFF',
                    lineStopColor: '',
                    scale: false,
                    isShowMarker: true,
                    isShowXAxis: false
                },
                config4: {
                    lineColor: '#00FFCF',
                    lineStopColor: '',
                    scale: true,
                    isShowMarker: true,
                    isShowXAxis: false
                },
                config5: {
                    lineColor: '#FB592C',
                    lineStopColor: '#FFD771',
                    scale: true,
                    isShowMarker: true,
                    isShowXAxis: true
                },
            }
        },
        methods: {},
        created() {
            this.configValue = this.parseConfigValue(config, value)
        },
    };
</script>
<style lang="scss" scoped>
    .list {
        li {
            display: flex;
            margin-bottom: 16px;

            .title {
                flex: none;
                padding-top: 50px;
                width: 160px;
                height: 154px;
                border-top: 4px solid rgba(0, 221, 255, 0.4);
                background: linear-gradient(180deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0) 100%);
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                text-align: center;
                color: #FFFFFF;

                .title-unit {
                    span {
                        font-size: 18px;
                        line-height: 24px;
                        color: rgba(255, 255, 255, 0.75);
                    }
                }
            }

            .line-chart {
                width: 1376px;
                height: 154px;
            }
        }
    }
</style>

