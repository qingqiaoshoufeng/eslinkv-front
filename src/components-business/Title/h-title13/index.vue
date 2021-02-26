<template>
    <div class="widget-part" :style="styles">
        <div class="h-title-5">
            <p class="pos-r text-left">{{data&&data.title}}工艺图</p>
        </div>
    </div>
</template>
<script>
    import mixins from 'eslink-npm/mixins'
    import {value} from './index.component'

    export default {
        mixins: [mixins],
        created() {
            this.configValue = this.parseConfigValue(value)
        }
    }
</script>
<style lang="scss">
    .h-title-5 {

        p {
            font-weight: 600;
            font-size: 32px;
            line-height: 32px;
            color: #fff;
            padding-bottom: 16px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.4);

            &:before, &:after {
                position: absolute;
                content: '';
                width: 48px;
                height: 2px;
                background: #00DDFF;
                bottom: 0;
            }

            &:before {
                left: 0;
            }

            &:after {
                right: 0;
            }
        }
    }

</style>

