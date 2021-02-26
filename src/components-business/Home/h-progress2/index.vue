<template>
    <div class="widget-part" :style="styles">
        <div class="fn-flex flex-row h-progress-2">
            <h2>{{config.config&&config.config.title}}</h2>
            <p class="font-num">{{data&&data.value}}{{config.config&&config.config.suffix}}</p>
        </div>
        <div class="pos-r h-progress-2-ratio">
            <i class="pos-a" :style="{width:`calc(${ratio} - 12px)`}"></i>
            <span class="pos-a circle" :style="{left:`calc(${ratio} - 12px)`}"/>
        </div>
    </div>
</template>
<script>
    import mixins from 'eslinkv-npm/mixins'
    import {customConfig, value} from './index.component'

    export default {
        mixins: [mixins],
        computed: {
            ratio() {
                if (this.data) {
                    if (this.data.value <= this.data.max) {
                        return `${this.data.value / this.data.max * 100}%`
                    }
                    return `100%`
                }
                return `0%`
            },
        },
        created() {
            this.configValue = this.parseConfigValue(value, customConfig)
        }
    }
</script>
<style lang="scss">
    .h-progress-2-ratio {
        height: 16px;
        background: rgba(255, 255, 255, 0.1);
        padding: 6px;

        span {
            width: 20px;
            height: 20px;
            top: 50%;
            margin-top: -10px;
            border: 2px solid rgba(0, 254, 207, 0.4);

            &:before {
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 100px;
                top: 50%;
                left: 50%;
                margin-top: -6px;
                margin-left: -6px;
                background: #00FFCF;
                box-shadow: 0 0 4px #00FECF;
            }
        }

        i {
            height: 4px;
            top: 6px;
            left: 6px;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 4px;
                top: 0;
                left: 0;
                background: linear-gradient(90deg, rgba(1, 229, 255, 0.0001) 0%, #00DDFF 100%);
            }
        }
    }

    .h-progress-2 {
        margin-bottom: 12px;
        align-items: center;

        h2 {
            font-size: 24px;
            line-height: 24px;
            color: #FEFFFF;
            font-weight: bold;
        }

        p {
            font-weight: bold;
            color: #FEFFFF;
            margin-left: auto;
            font-size: 24px;
            line-height: 24px;
        }
    }


</style>

