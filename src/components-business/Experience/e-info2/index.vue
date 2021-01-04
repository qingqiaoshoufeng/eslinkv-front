<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="title">
            <div class="color"></div>
            <span>线路总览</span>
        </div>
        <div class="main">
            <img :src="data.map" class="map">
            <div class="content" v-html="data.content"></div>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            this.configSource = this.parseConfigSource(config);
            this.configValue = this.parseConfigValue(config, value);
        },
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        background: url("./img/dikuang.svg") no-repeat;
        background-size: 100% 100%;

        .title {
            height: 48px;
            padding-left: 16px;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 24px;
            color: #FFFFFF;

            .color {
                width: 6px;
                height: 28px;
                background: #00DDFF;
                transform: skewY(30deg);
                margin-right: 8px;
            }
        }

        .main {
            padding: 16px;

            .content {
                font-size: 18px;
                line-height: 25px;
                color: #FFFFFF;
                text-align: left;
                margin-top: 32px;
            }
        }
    }
</style>

