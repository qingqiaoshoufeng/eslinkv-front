<template>
    <div class="widget-part fn-flex flex-row" :style="styles">
        <div class="h-circle-1 pos-r">
            <h2 class="circle pos-a" :style="{backgroundColor:color(0)}"></h2>
            <h3 class="circle pos-a" :style="{backgroundColor:color(1),width:ratio1,height:ratio1}"></h3>
            <h4 class="circle pos-a" :style="{backgroundColor:color(2),width:ratio2,height:ratio2}"></h4>
        </div>
        <div class="h-circle-1-list fn-flex flex-column">
            <h1>{{config.config&&config.config.title}}</h1>
            <ul>
                <li class="fn-flex flex-row" v-for="(item,index) in data?data.value:[]" :key="index">
                    <i class="circle" :style="{backgroundColor:color(index)}"/>
                    <label>{{item.title}}</label>
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, value, configSource} from './index.component'

    export default {
        mixins: [mixins],
        computed: {
            color() {
                return (index) => {
                    if (this.config.config) {
                        return JSON.parse(this.config.config.color)[index]
                    }
                    return ''
                }
            },
            ratio1() {
                if (this.data) {
                    return `${this.data.value[1].value / this.data.value[0].value * 100}%`
                }
                return ''
            },
            ratio2() {
                if (this.data) {
                    return `${this.data.value[2].value / this.data.value[0].value * 100}%`
                }
                return ''
            }
        },
        methods: {},
        created() {
            this.configSource = this.parseConfigSource(config, configSource)
            this.configValue = this.parseConfigValue(config, value)
        }
    }
</script>
<style lang="scss">
    .h-circle-1 {
        width: 120px;
        height: 120px;

        h2 {
            width: 100%;
            height: 100%;
        }

        h2, h3, h4 {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .h-circle-1-list {
        margin-left: 16px;

        h1 {
            font-size: 20px;
            line-height: 24px;
            color: #00DDFF;
            margin-top: 44px;
            margin-bottom: 8px;
            margin-left: 16px;
            font-weight: normal;
        }

        li {
            align-items: center;
            margin-bottom: 8px;
        }

        i {
            width: 8px;
            height: 8px;
            margin-right: 8px;
        }

        label, span {
            font-size: 16px;
            line-height: 16px;
            color: #fff;
        }
    }

</style>

