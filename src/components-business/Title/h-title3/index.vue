<template lang="pug">
    .widget-part(:style="styles")
        .fn-flex.flex-row.h-title-3
            .left-box.circle.fn-flex(:style="{borderColor:config.config&&config.config.color}")
                img(:src="config.config&&config.config.background")
            .right-box.text-left
                h2
                    i.font-num {{data&&data.title}}
                    span {{config.config&&config.config.suffix}}
                ul.fn-flex.flex-row
                    li(v-for="(item,index) in icons" :key="index")
                p {{config.config&&config.config.subTitle}}
</template>
<script lang="ts">
    import mx from '../../mixins'
    import {Component} from 'vue-property-decorator'
    import {mixins} from 'vue-class-component'
    import {config, configSource, value} from './index.component'

    @Component
    class HTitle3 extends mixins(mx) {
        icons: Int8Array = new Int8Array(50)

        created() {
            
            this.configValue = this.parseConfigValue(config, value)
        }
    }

    export default HTitle3
</script>
<style lang="scss">
    .h-title-3 {
        width: 100%;
        height: 100%;

        .left-box {
            width: 56px;
            height: 56px;
            border: 1px dashed;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
        }

        .right-box {
            ul {
                margin: 2px 0;
            }

            li {
                width: 1px;
                height: 4px;
                background-color: rgba(96, 230, 255, .32);
                transform: rotate(-10deg);
                margin-right: 2px;
            }

            h2 {
                font-size: 24px;
                line-height: 24px;
                color: #FEFFFF;

                i {
                    font-style: normal;
                }

                span {
                    margin-left: 8px;
                    font-size: 20px;
                    line-height: 24px;
                    font-weight: normal;
                }
            }

            p {
                font-size: 20px;
                line-height: 24px;
                color: rgba(254, 255, 255, 0.6);
            }
        }
    }
</style>

