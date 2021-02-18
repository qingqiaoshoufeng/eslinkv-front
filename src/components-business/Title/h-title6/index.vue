<template lang="pug">
    .widget-part(:style="styles")
        .fn-flex.flex-row.h-title-6
            .h-title-6-icon
            h2.pos-r.pointer(v-for="item in data?data:[]" :class="{active:store.scene.index===item.sceneId}" @click="handleClick(item.sceneId)") {{item.title}}
</template>
<script lang="ts">
    import mx from '../../mixins'
    import {Component} from 'vue-property-decorator'
    import {mixins} from 'vue-class-component'
    import {config, value} from './index.component'
	import scene from '../../../../lib/store/scene.store'
    @Component
    class HTitle6 extends mixins(mx) {
        store: any = window.GoldChart.store

        handleClick(index) {
            if (index) {
                scene.actions.setSceneIndex(index)
            }
        }

        created() {
            
            this.configValue = this.parseConfigValue(config, value)
        }
    }

    export default HTitle6
</script>
<style lang="scss">
    .h-title-6-icon {
        background-image: url('/static/icons/h-title1-1.svg');
        height: 34px;
        width: 34px;
        margin-right: 9px;
    }

    .h-title-6 {
        align-items: center;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);

        h2 {
            font-weight: 600;
            font-size: 24px;
            color: rgba(255, 255, 255, 0.75);
            margin-right: 24px;

            &.active {
                color: rgba(255, 255, 255, 1);

                &:before {
                    position: absolute;
                    content: '';
                    height: 4px;
                    width: 100%;
                    background: #00DDFF;
                    bottom: -15px;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
</style>

