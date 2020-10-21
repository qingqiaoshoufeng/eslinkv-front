export default {
    props: {
        template: {
            type: Object,
            default: null
        }
    },
    methods: {
        loadTemplate (dataBoardId) {
            this.$emit('querying', true)
            this.$api.getKanboardConfig({ dataBoardId }).then(res => {
                if (res.responseCode == 100000) {
                    const value = JSON.parse(res.result.attribute)
                    value.kanboard.info = {
                        name: '新看板' + Date.now(),
                        remark: ''
                    }
                    this.refillConfig(value).then(() => {})
                }
            }).catch(error => {
                console.info(error)
            }).finally(() => {
                this.$emit('querying', false)
            })
        },
        checkTemplate () {
            if (!this.template) return
            const { size, templateId } = this.template
            // console.info(size)
            if (size) {
                const { width, height, isMobileKanboard, deviceType } = size
                const canvasSize = this.canvasConfigValue.size
                canvasSize.width = width
                canvasSize.height = height
                canvasSize.isMobileKanboard = isMobileKanboard
                canvasSize.deviceType = deviceType
            }
            if (templateId) this.loadTemplate(templateId)
        }
    },
    created () {
        this.checkTemplate()
    }
}
