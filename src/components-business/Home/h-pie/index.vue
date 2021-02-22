<template>
    <div class="widget-part" :style="styles" v-if="data">
        <pie
                class="pie"
                :data="data"
                :unit="config.config.unit"
                :text="config.config.title1"
                :subtext="config.config.title2"
                :startAngle="config.config.startAngle"
        ></pie>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import pie from '../../More/h-left/pie'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        components: {pie},
        created() {
            this.configValue = this.parseConfigValue(value)
        }
    }
</script>
<style lang="scss" scoped>
    .pie {
        width: 100%;
        height: 100%;
    }
</style>

