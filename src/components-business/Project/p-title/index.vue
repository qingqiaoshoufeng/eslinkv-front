<template>
    <div class="widget-part" :style="styles">
        <div class="project-flex">
            <div class="title">{{ config.config && config.config.desc }}</div>
            <div class="value font-num">{{ data && data.value }}</div>
        </div>
    </div>
</template>
<script>
    import mixins from '../../../../lib/mixins'
    import {config, configSource, value} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            
            this.configValue = this.parseConfigValue(value)
        },
    }
</script>
<style lang="scss">
    .project-flex {
        display: flex;
        height: 120px;
        flex-direction: column;
        justify-content: space-between;

        .title {
            border-left: 2px solid #00DDFF;
            width: 240px;
            height: 40px;
            line-height: 40px;
            color: #00DDFF;
            background: linear-gradient(
                            90deg,
                            #00217D 0%,
                            rgba(0, 33, 125, 0.0001) 100%
            );
            text-align: left;
            padding-left: 16px;
            font-size: 24px;
        }

        .value {
            width: 240px;
            height: 72px;
            line-height: 72px;
            padding-left: 16px;
            text-align: left;
            background: #000F58;
            background-image: url('/static/images/project/value-bg.svg');
            color: #fff;
            font-size: 40px;
            font-weight: 700;
        }
    }
</style>

