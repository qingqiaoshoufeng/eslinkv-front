<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="title">{{ config.config.title }}</div>
        <div class="num font-num">{{ data.count | toThousand }}</div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            this.configValue = this.parseConfigValue(config, value)
        },
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        .title {
            height: 32px;
            font-size: 24px;
            line-height: 32px;
            color: #FFFFFF;
            background: #0057A9;
            border-right: 6px solid #fff;
            border-left: 6px solid #fff;
            margin-bottom: 8px;
        }

        .num {
            background: linear-gradient(180deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0) 100%);
            width: 100%;
            height: 80px;
            line-height: 80px;
            font-weight: bold;
            font-size: 48px;
            text-align: center;
            color: #FFFFFF;
        }
    }
</style>

