<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="content">
            <span class="num font-num">{{ data.value | toThousand }}</span>
            <span class="unit">{{ config.config.unit }}</span>
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

