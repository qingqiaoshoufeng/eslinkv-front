<template lang="pug">
    .widget-part(:style="styles")
        .fn-flex.flex-column.h-title-2
            h2 {{data&&data.value}}
            p {{config.config&&config.config.title}}
</template>
<script lang="ts">
    import mx from '../../mixins'
    import {Component} from 'vue-property-decorator'
    import {mixins} from 'vue-class-component'
    import {config, value, customConfig} from './index.component'

    @Component
    class HTitle2 extends mixins(mx) {
        created() {
            this.configValue = this.parseConfigValue(config, value, customConfig)
        }
    }

    export default HTitle2
</script>
<style lang="scss">
    .h-title-2 {
        background-image: url('/static/icons/h-title2-1.svg');
        background-size: 100%;
        background-repeat: no-repeat;
        height: 100%;
        align-items: center;
        justify-content: center;

        h2 {
            font-weight: bold;
            font-size: 40px;
            line-height: 40px;
            color: #fff;
            text-shadow: 0 0 6px #00DDFF;
        }

        p {
            color: #fff;
            font-size: 16px;
            line-height: 16px;
            margin-top: 12.4px;
        }
    }

</style>

