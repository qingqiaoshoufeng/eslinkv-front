<template>
    <div class="widget-part" :style="styles">
        <div class="icon" :style="`background-image: url(${config.config && config.config.icon})`"></div>
        <div class="num">{{ data && data.num }}{{config.config && config.config.suffix}}</div>
        <div class="text">{{ config.config && config.config.text }}</div>
    </div>
</template>
<script>
    import mixins from 'eslink-npm/mixins'
    import {customConfig, value} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            this.configValue = this.parseConfigValue(value, customConfig)
        },
    }
</script>
<style lang="scss" scoped>
    .widget-part {
        text-align: center;

        .icon {
            width: 122px;
            height: 110px;
            margin: 0 auto 40px;
            background-size: 100% 100%;
        }

        .num {
            font-weight: bold;
            font-size: 28px;
            line-height: 28px;
            color: #FEFFFF;
            margin-bottom: 12px;
        }

        .text {
            font-weight: normal;
            font-size: 20px;
            line-height: 24px;
            color: #00DDFF;
        }
    }
</style>

