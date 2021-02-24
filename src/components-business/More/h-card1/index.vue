<template>
    <div class="widget-part" :style="styles">
        <div class="h-card-1 pos-a"/>
        <div class="h-card-1-title fn-flex flex-row pos-r">
            <ul class="h-card-1-icon pos-r">
                <li class="pos-a" v-for="(item,index) in icon" :key="index"
                    :style="{transform:`rotate(${18*index}deg)`}"></li>
                <img class="pos-a" src="" alt=""/>
            </ul>
            <h2>{{data&&data.title}}</h2>
        </div>
        <ul class="h-card-1-list fn-flex flex-row pos-a">
            <li class="fn-flex flex-column" v-for="(item,index) in data?data.value:[]" :key="index">
                <h3>{{item.title}}</h3>
                <p>{{item.value}}<span>{{item.suffix}}</span></p>
            </li>
        </ul>
        <div class="pos-a h-card-1-top-left"></div>
        <div class="pos-a h-card-1-top-right"></div>
        <div class="pos-a h-card-1-bottom-left"></div>
        <div class="pos-a h-card-1-bottom-right"></div>
    </div>
</template>

<script>
    import mixins from '../../../../lib/mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        data() {
            return {
                icon: new Int8Array(20),
            }
        },
        created() {
            this.configValue = this.parseConfigValue(value)
        }
    }
</script>
<style lang="scss">

    .h-card-1-list {
        bottom: 14px;
        left: 16px;

        h3 {
            font-size: 18px;
            line-height: 24px;
            color: rgba(255, 255, 255, .6);
        }
    }

    .h-card-1-icon {
        width: 24px;
        height: 24px;

        li {
            width: 2px;
            height: 1px;
            background-color: #00DDFF;
            top: 0;
            left: 50%;
            margin-left: -.5px;
            transform-origin: 0 12px;
        }
    }

    .h-card-1-title {
        top: 14px;
        left: 16px;
        align-items: center;

        h2 {
            font-size: 20px;
            line-height: 28px;
            margin-left: 8px;
            color: #fff;
        }
    }

    .h-card-1 {
        border: 1px solid #00DDFF;
        box-shadow: inset 0 0 24px rgba(0, 221, 255, 0.4);
        opacity: .2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .h-card-1-top-left, .h-card-1-top-right, .h-card-1-bottom-left, .h-card-1-bottom-right {

        &:before, &:after {
            content: '';
            position: absolute;
            width: 2px;
            height: 16px;
            background-color: #00DDFF;
        }

        &:after {
            transform: rotate(90deg);
        }
    }

    .h-card-1-top-left {
        top: 0;
        left: 0;

        &:before {
            top: 0;
            left: -.5px;
        }

        &:after {
            top: -7.5px;
            left: 6.5px;
        }
    }

    .h-card-1-top-right {
        right: 0;
        top: 0;

        &:before {
            top: 0;
            left: -1.5px;
        }

        &:after {
            top: -7.5px;
            left: -8.5px;
        }
    }

    .h-card-1-bottom-left {
        bottom: 0;
        left: 0;

        &:before {
            top: -15.5px;
            left: -.5px;
        }

        &:after {
            top: -8.5px;
            left: 6.5px;
        }
    }

    .h-card-1-bottom-right {
        bottom: 0;
        right: 0;

        &:before {
            top: -15.5px;
            left: -1.5px;
        }

        &:after {
            top: -8.5px;
            left: -8.5px;
        }
    }

</style>

