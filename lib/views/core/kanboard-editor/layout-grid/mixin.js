import copy from 'fast-copy'
import {
    getInputNumber, getSelect, getInput, getUnit, getNumberWithUnit, getSelectWithInput, getBackground, getColor, getRatio
} from '../../widgets/parts/lib/config-tools'
import sourceToLayout from '../../widgets/parts/lib/source-to-layout'

const gridsConfigSource = Object.freeze({
    grids: {
        size: {
            groupLabel: '尺寸',
            groupType: 'Collapse',
            groupActive: true,
            fields: {
                // 分组的表单元素
                'width.height.unit': [
                    getInputNumber('width', '尺寸', { placeholder: '宽度' }),
                    getUnit('widthUnit', '尺寸'),
                    getInputNumber('height', '尺寸', { placeholder: '高度' }),
                    getUnit('heightUnit', '尺寸')
                ]
            }
        },
        padding: {
            groupLabel: '内边距',
            groupType: 'Collapse',
            groupActive: true,
            fields: {
                value: getNumberWithUnit('内边距', 'value', 'unit', ['px', 'em', 'rem', '%'], { placeholder: '大小' })
            },
            detail: {
                groupLabel: '单边距配置',
                groupType: 'Collapse',
                fields: {
                    left: getNumberWithUnit('左边距', 'left', 'leftUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' }),
                    top: getNumberWithUnit('上边距', 'top', 'topUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' }),
                    right: getNumberWithUnit('右边距', 'right', 'rightUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' }),
                    bottom: getNumberWithUnit('下边距', 'bottom', 'bottomUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' })
                }
            }
        },
        margin: {
            groupLabel: '外边距',
            groupType: 'Collapse',
            groupActive: true,
            fields: {
                value: getNumberWithUnit('外边距', 'value', 'unit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
            },
            detail: {
                groupLabel: '单边距配置',
                groupType: 'Collapse',
                fields: {
                    left: getNumberWithUnit('左边距', 'left', 'leftUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
                    top: getNumberWithUnit('上边距', 'top', 'topUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
                    right: getNumberWithUnit('右边距', 'right', 'rightUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
                    bottom: getNumberWithUnit('下边距', 'bottom', 'bottomUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
                }
            }
        },
        background: {
            groupLabel: '背景',
            groupType: 'Collapse',
            groupActive: false,
            fields: {
                url: getBackground('url', '背景图片', { params: { type: 4 }, mountToBody: true }),
                url2: getInput('url', '自定义背景图片', { placeholder: '输入地址' }),
                size: getSelectWithInput('size', '尺寸', ['cover', 'contain', 'auto']),
                position: getSelectWithInput('position', '位置', ['left', 'top', 'right', 'bottom', 'center']),
                repeat: getSelect('repeat', '重复', ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round']),
                color: getColor('color', '背景色'),
                'blendMode.contentBlendMode': [
                    getSelect('blendMode', '叠加模式', [
                        'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                        'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                        'exclusion', 'hue', 'saturation', 'color', 'luminosity'
                    ], { placeholder: '背景叠加' }),
                    getSelect('contentBlendMode', '叠加模式', [
                        'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                        'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                        'exclusion', 'hue', 'saturation', 'color', 'luminosity'
                    ], { placeholder: '内容叠加' })
                ]
            }
        },
        fields: {
            zIndex: getInputNumber('zIndex', '层级', { min: -1 }),
            ratio: getRatio('ratio', '格子比例'),
            combinationTo: getInput('combinationTo', '组合ID', {
                disabled: true,
                placeholder: '未绑定至组合小工具'
            })
        }
    },
    grid: {
        padding: {
            groupLabel: '内边距',
            groupType: 'Collapse',
            groupActive: true,
            fields: {
                value: getNumberWithUnit('内边距', 'value', 'unit', ['px', 'em', 'rem', '%'], { placeholder: '大小' })
            },
            detail: {
                groupLabel: '单边距配置',
                groupType: 'Collapse',
                fields: {
                    left: getNumberWithUnit('左边距', 'left', 'leftUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' }),
                    top: getNumberWithUnit('上边距', 'top', 'topUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' }),
                    right: getNumberWithUnit('右边距', 'right', 'rightUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' }),
                    bottom: getNumberWithUnit('下边距', 'bottom', 'bottomUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小' })
                }
            }
        },
        margin: {
            groupLabel: '外边距',
            groupType: 'Collapse',
            groupActive: true,
            fields: {
                value: getNumberWithUnit('外边距', 'value', 'unit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
            },
            detail: {
                groupLabel: '单边距配置',
                groupType: 'Collapse',
                fields: {
                    left: getNumberWithUnit('左边距', 'left', 'leftUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
                    top: getNumberWithUnit('上边距', 'top', 'topUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
                    right: getNumberWithUnit('右边距', 'right', 'rightUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
                    bottom: getNumberWithUnit('下边距', 'bottom', 'bottomUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
                }
            }
        },
        background: {
            groupLabel: '背景',
            groupType: 'Collapse',
            groupActive: false,
            fields: {
                color: getColor('color', '背景色'),
                url: getBackground('url', '背景图片', { params: { type: 4 }, mountToBody: true }),
                url2: getInput('url', '自定义背景图片', { placeholder: '输入地址' }),
                size: getSelectWithInput('size', '尺寸', ['cover', 'contain', 'auto']),
                position: getSelectWithInput('position', '位置', ['left', 'top', 'right', 'bottom', 'center']),
                repeat: getSelect('repeat', '重复', ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round']),
                'blendMode.contentBlendMode': [
                    getSelect('blendMode', '叠加模式', [
                        'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                        'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                        'exclusion', 'hue', 'saturation', 'color', 'luminosity'
                    ], { placeholder: '背景叠加' }),
                    getSelect('contentBlendMode', '叠加模式', [
                        'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                        'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                        'exclusion', 'hue', 'saturation', 'color', 'luminosity'
                    ], { placeholder: '内容叠加' })
                ]
            }
        }
    }
})

export default {
    data () {
        return {
            gridsAdded: {},
            currentGridValue: null,
            activeType: 'grids',
            activeGridId: null,
            gridPanelPositionX: null,
            gridPanelPositionY: null,
            activeGridChainedId: null,
            rightMenuGrid: null
        }
    },
    methods: {
        getGridElementById (id, type = 'grid') {
            const targetSelector = type === 'grids' ? `.layout-grid-${id}` : type === 'grid' ? `.grid-${id}` : `.widget-${id}`
            return this.$el.querySelector('#kanban').querySelector(targetSelector)
        },
        handleLayoutGridDrop (e, data) {
            const id = Date.now() + ''
            const grid = this.createGrid(id, JSON.parse(data))
            this.$set(this.gridsAdded, id, grid)
            return grid
        },
        createGrid (id, { type, direction, grids, gap }, inputChainedId) {
            const isRow = direction === 'row'
            grids = ''.padStart(grids, '1').split('')
            const chainedId = inputChainedId ? `${inputChainedId}.${id}` : id
            return {
                id,
                chainedId,
                type,
                gap,
                config: {
                    size: {
                        width: isRow ? 100 : 0,
                        widthUnit: '%',
                        height: isRow ? 0 : 100,
                        heightUnit: '%'
                    },
                    padding: {
                        value: 0,
                        unit: 'px',
                        detail: {
                            left: isRow ? 0 : gap,
                            leftUnit: '',
                            right: gap,
                            rightUnit: '',
                            top: isRow ? gap : 0,
                            topUnit: '',
                            bottom: gap,
                            bottomUnit: ''
                        }
                    },
                    margin: {
                        value: 0,
                        unit: 'px',
                        detail: {
                            left: 0,
                            leftUnit: '',
                            right: 0,
                            rightUnit: '',
                            top: 0,
                            topUnit: '',
                            bottom: 0,
                            bottomUnit: ''
                        }
                    },
                    background: {
                        url: '',
                        size: 'cover',
                        position: 'center',
                        repeat: 'no-repeat',
                        color: '',
                        blendMode: '',
                        contentBlendMode: ''
                    },
                    zIndex: 1,
                    ratio: grids.map(item => +item),
                    combinationTo: ''
                },
                direction,
                grids: grids.map((item, index) => {
                    const gridId = `${id}-${index}`
                    const chainedId = inputChainedId ? `${inputChainedId}.${gridId}` : gridId
                    return {
                        chainedId,
                        id: gridId,
                        config: {
                            padding: {
                                value: 0,
                                unit: 'px',
                                detail: {
                                    left: 0,
                                    leftUnit: '',
                                    right: 0,
                                    rightUnit: '',
                                    top: 0,
                                    topUnit: '',
                                    bottom: 0,
                                    bottomUnit: ''
                                }
                            },
                            margin: {
                                value: 0,
                                unit: 'px',
                                detail: {
                                    left: isRow ? gap : 0,
                                    leftUnit: '',
                                    right: 0,
                                    rightUnit: '',
                                    top: isRow ? 0 : gap,
                                    topUnit: '',
                                    bottom: 0,
                                    bottomUnit: ''
                                }
                            },
                            background: {
                                url: '',
                                size: 'cover',
                                position: 'center',
                                repeat: 'no-repeat',
                                color: '',
                                blendMode: '',
                                contentBlendMode: ''
                            }
                        },
                        children: {}
                    }
                })
            }
        },
        createGridWidget (id, { type, config }, inputChainedId) {
            const chainedId = inputChainedId ? `${inputChainedId}.${id}` : id
            return {
                id,
                chainedId,
                type,
                config
            }
        },
        getGridByChainedId (chainedId) {
            const getCurrentGrid = (id, parent) => {
                const [gridId, childId] = id.split('-')
                let currentGrid = parent[gridId]
                if (childId) currentGrid = currentGrid.grids[+childId]
                return currentGrid
            }
            const ids = chainedId.split('.')
            let currentGrid = getCurrentGrid(ids.shift(), this.gridsAdded)
            while (ids.length) {
                currentGrid = getCurrentGrid(ids.shift(), currentGrid.children)
            }
            return currentGrid
        },
        handleEmbedDrop ({ data, chainedId }) {
            this.isDragIn = false
            const targetGrid = this.getGridByChainedId(chainedId)
            const id = Date.now() + ''
            this.$set(targetGrid.children, id, this.createGrid(id, JSON.parse(data), chainedId))
        },
        handleWidgetGridDrop ({ data, chainedId, id }) {
            this.isDragIn = false
            const { type, config: inputConfig } = JSON.parse(data)
            const { layout = {}, config = {}, widget = {}, api } = inputConfig || {}
            const gridElement = this.getGridElementById(id, 'grid')
            if (!gridElement) {
                this.$Message.warning('目标格子未找到！')
                return
            }
            const { left, top, width, height } = gridElement.getBoundingClientRect()

            layout.size = {
                width: 100,
                height: 100,
                unit: '%'
            }
            layout.position = {
                value: 'relative'
            }

            layout.zIndex = 1

            // 小工具初始化提示
            this.showProcessing(top, left, width, height)

            requestAnimationFrame(() => {
                const id = Date.now() + ''
                widget.id = id

                const targetGrid = this.getGridByChainedId(chainedId)
                const value = { layout, widget, config, api }
                this.$set(targetGrid.children, id, this.createGridWidget(id, {
                    type,
                    config: value
                }, chainedId))
            })
        },
        handleGridDragMove ({ data, chainedId, id }) {
            const { data: grids, fromId } = JSON.parse(data)
            if (fromId === id) return
            const gridChainedId = grids.chainedId
            this.handleGridDelete(gridChainedId, true)
            this.insertGrid(grids, chainedId)
        },
        // 所有的 chainedId 从旧的节点变更到新的节点
        updateSubGridsId (grids, newChainedId, oldChainedId) {
            grids.grids.forEach(grid => {
                grid.chainedId = grid.chainedId.replace(oldChainedId, newChainedId)
                const children = grid.children
                Object.keys(children).forEach(id => {
                    const grids = children[id]
                    const type = grids.type
                    // console.info('替换节点路径1：', oldChainedId)
                    // console.info('替换节点路径2：', newChainedId)
                    grids.chainedId = grids.chainedId.replace(oldChainedId, newChainedId)
                    if (type === 'layout-grid') {
                        this.updateSubGridsId(grids, newChainedId, oldChainedId)
                    } else {
                        // 小工具点击是末端无法添加子子节点的节点，其id及
                        this.updateWidgetId(grids)
                    }
                })
            })
        },
        getParentChainedId (chainedId) {
            const ids = chainedId.split('.')
            ids.pop()
            return ids.join('.')
        },
        updateWidgetId (grid) {
            const id = Date.now() + ''
            grid.id = id
            if (grid.type !== 'layout-grid') {
                grid.config.widget.id = id
            }
            return id
        },
        copyTargetGrid (grids) {
            const copyWidget = copy(grids)
            const { id, chainedId } = grids
            // console.info('复制对象ID', chainedId)
            const parentId = this.getParentChainedId(chainedId)
            // console.info('父级ID', parentId)
            this.updateWidgetId(copyWidget)
            this.insertGrid(copyWidget, parentId)
        },
        handleGridCopy (chainedId) {
            // console.info('复制目标ID', chainedId)
            const originGrids = this.getGridByChainedId(chainedId)
            originGrids && this.copyTargetGrid(originGrids)
        },
        insertGrid (grids, chainedId) {
            const targetGrid = this.getGridByChainedId(chainedId)
            const id = grids.id
            this.$set(targetGrid.children, id, grids)
            this.$emit('kanboard-edited')
            const oldChainedId = this.getParentChainedId(grids.chainedId)
            grids.chainedId = `${chainedId}.${id}`
            // console.info('新ID', chainedId)
            // console.info('旧ID', oldChainedId)
            if (grids.type === 'layout-grid') this.updateSubGridsId(grids, chainedId, oldChainedId)
        },
        handleGridWidgetConfig ({ data, widget }) {
            if (!data) return
            const { source, value = {} } = data
            const type = widget.type
            if (!this.widgetSources[type]) {
                this.$set(this.widgetSources, type, source)
            }
            if (this.widgetsImporting) {
                this.isWidgetProcessing = false
                return
            }
            this.$set(widget, 'config', value)
        },
        handleGridDelete (id, noConfirm) {
            const deleteGrid = () => {
                this.removeCombinationChild(id)
                const ids = id.split('.')
                const targetId = ids.pop()
                if (ids.length) {
                    const parent = this.getGridByChainedId(ids.join('.'))
                    this.$delete(parent.children, targetId)
                } else {
                    this.$delete(this.gridsAdded, targetId)
                }
                this.handleGridActive(false)
            }
            if (noConfirm) {
                deleteGrid()
            } else {
                this.$Modal.confirm({
                    title: '提示',
                    content: '是否删除当前格子？注意，很格子内部的内容也将一同被删除！',
                    onOk: deleteGrid
                });
            }
        },
        handleGridUpdate ({ config, type, chainedId, id }) {
            if (this.activeGridId === id) return
            this.hideSubPanels()
            this.activeType = type
            this.activeGridId = id
            this.activeGridChainedId = chainedId
            const configPanel = this.$refs.gridConfigPanel
            configPanel && configPanel.reset()
            setTimeout(() => {
                this.currentGridValue = config
                this.updateGridPanelPosition()
            })
        },
        handleGridActive (isActive) {
            if (!isActive) {
                this.currentGridValue = null
                this.activeGridId = null
                this.activeGridChainedId = null
            } else {
                this.activatedWidgetId = null
            }
        },
        updateGridPanelPosition () {
            const ele = this.getGridElementById(this.activeGridId, this.activeType)
            if (!ele) return null
            const { left, top, right, bottom } = ele.getBoundingClientRect()
            const { clientWidth, clientHeight } = document.body
            const width = 350
            const height = 440
            this.gridPanelPositionX = right + 10
            this.gridPanelPositionY = top - (height - bottom + top) / 2
            if (clientWidth - right < width) this.gridPanelPositionX = left > width + 30 ? left - width : clientWidth - width - 30
            if (this.gridPanelPositionY < 62) this.gridPanelPositionY = 62
            if (this.gridPanelPositionY > clientHeight - height) this.gridPanelPositionY = clientHeight - height
        },
        deactivateGrid () { }
    },
    computed: {
        isGridConfig () {
            return ['grids', 'grid'].includes(this.activeType)
        },
        gridConfigSource () {
            const { activeType, isGridConfig } = this
            if (!isGridConfig) {
                return this.widgetSources[activeType]
            }
            const source = gridsConfigSource[activeType]
            return source ? sourceToLayout(source) : null
        },
        showGridConfigPanel () {
            return this.activeGridId && this.activeType
        },
        gridConfigPanelStyle () {
            const styles = [`transform: translate3d(${this.gridPanelPositionX | 0}px, ${this.gridPanelPositionY | 0}px, 0)`]
            return styles.join(';')
        },
        ordinaryGrids () {
            const ordinaryGrids = {}
            Object.keys(this.gridsAdded).forEach(id => {
                const grid = this.gridsAdded[id]
                if (!grid.config.combinationTo) ordinaryGrids[id] = grid
            })
            return ordinaryGrids
        }
    }
}
