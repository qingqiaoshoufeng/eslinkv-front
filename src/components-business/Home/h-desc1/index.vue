<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="content">
            <span class="num font-num">{{ data.value | toThousand }}</span>
            <span class="unit">{{ config.config.unit }}</span>
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
    };
</script>
<style lang="scss" scoped>
    .content {
        font-weight: bold;
        font-size: 32px;
        line-height: 32px;
        color: #FFFFFF;
    }
</style>

