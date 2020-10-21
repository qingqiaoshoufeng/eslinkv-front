import sourceToLayout from '../../widgets/parts/lib/source-to-layout'
export default {
    data () {
        return {
            showDatabaseConfigModal: false,
            showJsEditorModal: false
        }
    },
    methods: {
        handleDatabaseConfig (payload) {
            const value = this.currentWidgetValue
            if (!value) return
            const api = value.api
            if (!api || !api.system) {
                this.$Message.warning('当前小工具不支持数仓配置！')
                return
            }
            if (!api.system.enable) {
                this.$Message.warning('请先在小工具配置面板开启数仓配置！')
                return
            }
            this.showDatabaseConfigModal = true
            this.$refs.dataBaseConfig.setQueryCond(api.system.params)
        },
        updateApiSystem (value) {
            Object.assign(this.currentWidgetValue.api.system.params, value)
            this.showDatabaseConfigModal = false
        },
        handleProcessConfig (payload) {
            const value = this.currentWidgetValue
            if (!value) return
            const api = value.api
            if (!api || !api.process) {
                this.$Message.warning('当前小工具不支持数据加工配置！')
                return
            }
            if (!api.process.enable) {
                this.$Message.warning('请先在小工具配置面板开启数据加工配置！')
                return
            }
            this.showJsEditorModal = true
            this.$refs.jsEditorModal.setQueryCond(api.process.methodBody)
        },
        updateProcessBody (value) {
            this.currentWidgetValue.api.process.methodBody = value
            this.showJsEditorModal = false
        }
    }
}
