export default {
    data () {
        return {
            widgetSources: {},
            panelPositionX: null,
            panelPositionY: null,
            startPanelDrag: false,
            fixPanelPosition: false,
            mouseCurrentX: null,
            mouseCurrentY: null,
            panelResizing: false,
            configPanelValueUpdateTimer: null,
            configPanelValueFreshing: false
        }
    },
    methods: {
        initConfigPanelPosition (clientX, clientY, width, height, startX, startY) {
            if (this.panelPositionX !== null) return
            if (width !== undefined) {
                this.panelPositionX = clientX + (width ? width - startX + 10 : 10)
                this.panelPositionY = clientY - (430 - (height || 40)) / 2
            } else {
                this.panelPositionX = clientX + 10
                this.panelPositionY = clientY - 195
            }
        },
        updatePanelPosition () {
            this.isWidgetDragging = this.isWidgetResizing = false
            if (this.fixPanelPosition) return
            this.$nextTick(() => {
                const ele = this.currentWidgetEle
                if (!ele) return null
                const { left, top, right, bottom } = ele.getBoundingClientRect()
                const { clientWidth, clientHeight } = document.body
                let { width, height } = this.$refs.configPanelWrapper.getBoundingClientRect()
                width += 10
                height += 10
                this.panelPositionX = right + 10
                this.panelPositionY = top - (height - bottom + top) / 2
                if (clientWidth - right < width) this.panelPositionX = left > width + 30 ? left - width : clientWidth - width - 30
                if (this.panelPositionY < 62) this.panelPositionY = 62
                if (this.panelPositionY > clientHeight - height - 45) this.panelPositionY = clientHeight - height - 45
            })
        },
        setPanelDrag () {
            this.startPanelDrag = true
            this.fixPanelPosition = true
        },
        setPanelHorizontalResizeStart (e) {
            this.panelResizing = true
            this.mouseCurrentX = e.clientX
        },
        setPanelVerticalResizeStart (e) {
            this.panelResizing = true
            this.mouseCurrentY = e.clientY
        },
        setPanelResize ({ clientX, clientY }) {
            if (!this.panelResizing) return
            const panelWrapper = this.$refs.configPanelWrapper
            const { clientWidth, clientHeight } = document.body
            if (this.mouseCurrentX) {
                const width = panelWrapper.getBoundingClientRect().width
                const delta = (clientX - this.mouseCurrentX) | 0
                let newWidth = width + delta
                if (newWidth < 300) {
                    newWidth = 300
                    this.stopUpdateMousePosition()
                }
                if (newWidth > clientWidth * 0.5) {
                    newWidth = clientWidth * 0.5 | 0
                    this.stopUpdateMousePosition()
                }
                panelWrapper.style.width = newWidth + 'px'
                this.mouseCurrentX = clientX
            }
            if (this.mouseCurrentY) {
                const height = panelWrapper.getBoundingClientRect().height
                const delta = (clientY - this.mouseCurrentY) | 0
                let newHeight = height + delta
                if (newHeight < 360) {
                    newHeight = 360
                    this.stopUpdateMousePosition()
                }
                if (newHeight > clientHeight * 0.9) {
                    newHeight = clientHeight * 0.9 | 0
                    this.stopUpdateMousePosition()
                }
                panelWrapper.style.height = newHeight + 'px'
                this.mouseCurrentY = clientY
            }
        },
        stopUpdateMousePosition (e) {
            this.panelResizing = false
            this.mouseCurrentY = this.mouseCurrentX = null
        },
        updateConfigPanelValue (id, oldId) {
            this.configPanelValueFreshing = true
            const update = () => {
                const configPanel = this.$refs.configPanel
                if (oldId) {
                    configPanel && configPanel.reset()
                    this.$nextTick(() => {
                        this.currentWidgetValue = this.widgetsAdded[id].config
                        this.configPanelValueFreshing = false
                    })
                } else {
                    this.currentWidgetValue = this.widgetsAdded[id].config
                    this.configPanelValueFreshing = false
                }
                this.configPanelValueUpdateTimer = null
            }
            if (this.fixPanelPosition) {
                update()
                return
            }
            this.configPanelValueUpdateTimer && clearTimeout(this.configPanelValueUpdateTimer)
            this.configPanelValueUpdateTimer = setTimeout(update, 380)
        }
    },
    computed: {
        showConfigPanel () {
            return !this.refilling && !this.widgetsImporting && this.widgetSource && this.activatedWidgetId
        },
        configPanelStyle () {
            const styles = [`transform: translate3d(${this.panelPositionX | 0}px, ${this.panelPositionY | 0}px, 0)`]
            if (this.isWidgetDragging || this.isWidgetResizing || this.isDragIn) {
                styles.push('opacity: .2', 'pointer-events: none')
            }
            if (this.startPanelDrag) styles.push('transition: unset')
            return styles.join(';')
        },
        widgetSource () {
            return this.widgetSources[this.currentWidgetType]
        },
        currentWidgetEle () {
            const id = this.activatedWidgetId
            if (!id) return null
            return this.$refs[`widget_${id}`][0].$el
        }
    },
    watch: {
        fixPanelPosition (value) {
            if (!value) {
                this.$nextTick(this.updatePanelPosition)
            }
        }
    },
    mounted () {
        window.addEventListener('resize', this.updatePanelPosition)
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('resize', this.updatePanelPosition)
        })
    }
}
