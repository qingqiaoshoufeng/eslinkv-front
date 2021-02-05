<template>
    <div ref="canvas-wrapper" id="kanban" class="canvas-wrapper" :style="canvasStyle()">
        <template v-for="item in platform.widgetAdded">
            <template v-if="!item.config.widget.combinationTo">
                <parts v-if="showParts(item)" :key="item.id" :type="item.type" :config="item.config"
                       :ref="item.id" :market="item.market"
                       :style="item.config.widget.hide ? 'display: none' : ''" readonly>
                    <template v-if="shouldBeShow(item)">
                        <template v-for="child in getItemChildren(item, 'widget')">
                            <parts
                                    v-if="showParts(child)"
                                    :key="child.id" :market="item.market"
                                    :ref="child.id"
                                    :class="[
								  `group-item group-item-${child.id}`,
								  {
									'slide-hide': calcSlideHide(item.config, child.id)
								  },
								]"
                                    :type="child.type"
                                    :config="child.config"
                                    :style="child.config.widget.hide ? 'display: none' : ''"
                                    readonly
                            />
                        </template>
                    </template>
                </parts>
            </template>
        </template>
        <api-executor v-for="api in apis" :key="api.variable" :api="api"
                      @api-data-update="(data) => handleApiDataUpdate(api.variable, data)"/>
    </div>
</template>
<script>
    import parts from './core/widgets/parts/index'
    import styleParser from './core/widgets/parts/lib/style-parser'
    import widgetOperation from './core/kanboard-editor/mixins/widget-operation'
    import combination from './core/kanboard-editor/mixins/combination'
    import globalApi from './core/kanboard-editor/global-api/mixin'
    import widgetShareData from './core/kanboard-editor/mixins/widget-share-data'
    import crossFrameMessageParamBind from './core/kanboard-editor/mixins/cross-frame-message-param-bind'
    import * as widgetBindManager from './mixins/widget-bind-manage'
    import loadMask from '../components/load-mask'
    import platform from '../store/platform.store'
    import scene from '../store/scene.store'

    export default {
        name: 'kanboard-editor',
        mixins: [widgetOperation, combination, globalApi, widgetShareData, crossFrameMessageParamBind],
        provide() {
            return {...widgetBindManager, kanboard: this, kanboardEditor: this}
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
            
            .layout-grid-row,
            .layout-grid-col {
                outline: none;
                
                &:hover {
                    background-color: unset;
                }
                
                .grid,
                .widget-part:not(.widget-preset-slot) {
                    outline: none;
                    
                    &:after,
                    &:before {
                        display: none;
                    }
                }
                
                .delete {
                    display: none !important;
                }
            }
            
            .combination-body {
                outline: none;
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
