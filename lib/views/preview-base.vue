<template>
    <div ref="canvas-wrapper" id="kanban" class="canvas-wrapper" :style="canvasStyle()">
        <template v-for="item in platform.widgetAdded">
			<parts v-if="showParts(item)" :key="item.id" :type="item.type" :config="item.config"
				   :ref="item.id" :market="item.market"
				   :style="item.config.widget.hide ? 'display: none' : ''" readonly>
			</parts>
        </template>
    </div>
</template>
<script>
    import parts from '../components/d-widget-part/index'
    import styleParser from './core/widgets/parts/lib/style-parser'
    import widgetOperation from './core/kanboard-editor/mixins/widget-operation'
    import widgetShareData from './core/kanboard-editor/mixins/widget-share-data'
    import crossFrameMessageParamBind from './core/kanboard-editor/mixins/cross-frame-message-param-bind'
    import loadMask from '../components/load-mask'
    import platform from '../store/platform.store'
    import scene from '../store/scene.store'

    export default {
        name: 'kanboard-editor',
        mixins: [widgetOperation, widgetShareData, crossFrameMessageParamBind],
        provide() {
            return {kanboard: this, kanboardEditor: this}
        },
        components: {
            parts,
            loadMask
        },
        data() {
            return {
                platform: platform.state,
				scene: scene.state,
                time: Date.now()
            }
        },
        methods: {
            canvasStyle() {
                const val = styleParser(this.platform.panelConfig)
                if (val) {
                    this.$emit('mounted', val)
                }
                return val
            },
            showParts(item) {
                if (item.scene === 0 && this.scene.showMainScene) {
                    return true
                } else if (item.scene === this.scene.index) {
                    return true
                }
                return false
            },
        },
        mounted() {
            window.GoldChart.mutations.setInstance('kanboard', this)
            window.GoldChart.mutations.setStatus('inPreview')
        }
    }
</script>

<style lang="scss">
    .scene-temporary-wrapper {
        .widget-part {
            position: absolute !important;
        }
    }
</style>
<style lang="scss" scoped>
    .canvas-wrapper {
        &:before {
            content: '';
            display: flex;
        }
        
        /deep/ {
            & > .widget-part {
                position: absolute !important;
            }
        }
    }
    
    /deep/ {
        .load-mask {
            position: fixed !important;
        }
        
        .anchorBL {
            display: none;
        }
    }
</style>
