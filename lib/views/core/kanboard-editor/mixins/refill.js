export default {
    inject: ['kanboard'],
    data () {
        return {
            refilling: false,
            refillPercent: 0
        }
    },
    methods: {
        getGridsLength (grids = {}) {
            let length = 0
            const count = grids => {
                grids.forEach(grid => {
                    Object.values(grid.children).forEach(child => {
                        child.type !== 'layout-grid' && length++
                        count(child.grids)
                    })
                })
            }
            Object.values(grids).forEach(grids => {
                count(grids.grids)
            })
            return length
        },
        sortWidgets: function (widgets) {
            const providers = []
            const responders = []
            widgets.forEach(widget => {
                const api = widget.value.api
                const isProvider = api && api.bind && api.bind.enable && api.bind.role.includes('provider')
                if (isProvider) {
                    providers.push(widget)
                } else {
                    responders.push(widget)
                }
            })
            return [...providers, ...responders]
        },
        refillConfig ({ kanboard, widgets, grids, apis, guides }) {
            return new Promise(resolve => {
                this.refilling = true
                this.guides = guides
                // this.apis = apis
                this.sidebarTools.$refs.globalApiPanel.setGlobalApiConfig(apis || [])
                const kanboardSize = kanboard.size
                kanboardSize.preset = undefined
                kanboardSize.isMobileKanboard = kanboardSize.isMobileKanboard || false
                this.canvasConfigValue = kanboard
                this.updateCanvasOffset()
                const widgetsArray = this.sortWidgets(Object.values(widgets))
                const length = widgetsArray.length
                // 小工具初始化需要时间，此处进行延时逐个回填
                const reDrawWidget = ({ id, type, value }) => {
                    this.initWidgetConfig(id, type)
                    const currentLength = widgetsArray.length
                    this.updateWidget(value)
                    if (currentLength) {
                        this.refillPercent = (length - currentLength) / length * 100 | 0
                        requestAnimationFrame(() => {
                            reDrawWidget(widgetsArray.shift())
                        })
                    } else {
                        this.refillPercent = 100
                        resolve()
                    }
                }
                // todo 网状结构，如何可视化进度？
                requestAnimationFrame(() => {
                    this.gridsAdded = grids || {}
                })
                if (length) {
                    reDrawWidget(widgetsArray.shift())
                } else {
                    this.refillPercent = 100
                    resolve()
                }
            })
        },
        refillDone () {
            setTimeout(() => {
                this.refilling = false
                if (!this.kanboard.isInEditor) return
                this.confirmKanboardName()
                this.$emit('kanboard-ready')
            }, 500)
        }
    },
    watch: {
        refillPercent (value) {
            if (value === 100) this.refillDone()
        }
    },
    mounted () {
        this.$nextTick(() => {
            const { kanboardId, templateId } = this.kanboard || {}
            if (!this.refilling && !kanboardId && !templateId) {
                setTimeout(() => {
                    this.$emit('kanboard-ready')
                })
            }
        })
    }
}
