<template>
    <div class="widget-part" :style="styles" v-if="data">
        <div class="item" :class="{active:item.index.indexOf(store.scene.index)!==-1}" @click="switchTab(item.index[0])"
             v-for="item in data?data.value:[]">
            <img :src="item.img">
            <span>{{item.title}}</span>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, value} from './index.component'

    export default {
        mixins: [mixins],
        data() {
            return {
                store: window.GoldChart.store
            }
        },
        methods: {
            switchTab(n) {
                window.GoldChart.scene.setSceneIndex(n)
            }
        },
        created() {
            
            this.configValue = this.parseConfigValue(config, value)
        },
    };
</script>
<style lang="scss" scoped>
    .widget-part {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
            width: 198px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 24px;
            line-height: 24px;
            color: #FFFFFF;

            &.active {
                border-top: 2px solid #00DDFF;
                background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.5) 100%);
            }

            > img {
                width: 48px;
                height: 48px;
                margin-right: 16px;
            }
        }
    }
</style>

