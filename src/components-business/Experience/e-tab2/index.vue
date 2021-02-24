<template>
    <div class="widget-part" :style="styles" v-if="data">
        <ul class="tabs">
            <li></li>
            <li
                    :class="{active: currIndex === i}"
                    v-for="(k, i) in data.list"
                    :key="i"
                    @click="changeTab(i)"
            ><span>{{ k.name }}</span></li>
            <li></li>
        </ul>
    </div>
</template>
<script>
    import mixins from '../../../../lib/mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        data() {
            return {
                currIndex: 0
            }
        },
        computed: {},
        methods: {
            changeTab(n) {
                this.currIndex = n
            }
        },
        created() {
            
            this.configValue = this.parseConfigValue(value)
        },
    };
</script>
<style lang="scss" scoped>
    .tabs {
        font-size: 24px;
        color: #00DDFF;
        display: flex;
        height: 56px;

        li {
            position: relative;
            width: 200px;
            text-align: center;
            line-height: 56px;
            cursor: pointer;

            &:hover {
                color: #fff;
            }

            &:after {
                content: '';
                display: block;
                height: 2px;
                width: 100%;
                background: #00DDFF;
                position: absolute;
                bottom: 0;
                left: 0;
            }

            &:first-child:after {
                background: linear-gradient(to left, #00DDFF, rgba(0, 221, 255, 0));
            }

            &:last-child:after {
                background: linear-gradient(to right, #00DDFF, rgba(0, 221, 255, 0));
            }

            &.active {
                width: 326px;
                font-weight: 600;
                font-size: 32px;
                background: url("./img/menu-bg.svg") no-repeat;
                background-size: 100% 100%;

                span {
                    background-image: -webkit-linear-gradient(top, #fff, #7AEDFF);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                &:after {
                    height: 0;
                }
            }
        }
    }
</style>

