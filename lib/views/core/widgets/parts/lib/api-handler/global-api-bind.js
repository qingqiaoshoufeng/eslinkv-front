export default {
  data () {
    return {
      globalVariableWatcher: null,
      globalPathUpdateWatcher: null,
      globalPathUpdateTimer: null
    }
  },
  methods: {
    handleGlobalApiData (data) {
      // console.info(data)
      const { path, process } = this.config.api
      data != undefined && this.parseQueryResult(data, { path, process })
    },
    listenGlobalVariable (variable) {
      if (!variable || !this.globalApiConfig.enable) return
      this.globalVariableWatcher && this.globalVariableWatcher()
      this.globalPathUpdateWatcher && this.globalPathUpdateWatcher()
      const key = variable[0]
      if (!key) return
      this.handleGlobalApiData(this.kanboardEditor.variablesWatcher[key])
      this.globalVariableWatcher = this.$watch(`kanboardEditor.variablesWatcher.${key}`, this.handleGlobalApiData)
      this.globalPathUpdateWatcher = this.$watch(`config.api.path`, this.globalHandlePathUpdate)
    },
    globalHandlePathUpdate () {
      if (this.globalPathUpdateTimer) clearTimeout(this.globalPathUpdateTimer)
      this.globalPathUpdateTimer = setTimeout(() => {
        const variable = this.globalApiConfig.variable
        if (!variable || !variable[0]) return
        this.handleGlobalApiData(this.kanboardEditor.variablesWatcher[variable[0]])
        this.globalPathUpdateTimer = null
      }, 500)
    },
    handleGlobalVariablesUpdate (variables) {
      const globalApiConfig = this.globalApiConfig
      if (globalApiConfig) {
        globalApiConfig.variables = variables
      }
    }
  },
  computed: {
    globalApiConfig () {
      return this.config.api ? this.config.api.globalApiConfig : null
    }
  },
  watch: {
    'globalApiConfig.variable': {
      handler: 'listenGlobalVariable',
      immediate: true
    },
    'globalApiConfig.enable' (value) {
      if (value) {
        const api = this.config.api
        // 禁用数仓接口
        if (api.system) api.system.enable = false
        // 禁用自动刷新
        if (api.autoFetch) api.autoFetch.enable = false
        // 禁用数据共享
        if (api.dataShareConfig) api.dataShareConfig.enable = false
        // 清空数据查找路径
        api.path = ''
        this.listenGlobalVariable(this.globalApiConfig.variable)
      } else {
        this.globalVariableWatcher && this.globalVariableWatcher()
        this.globalPathUpdateWatcher && this.globalPathUpdateWatcher()
      }
    },
    'config.api.system.enable' (enabled) {
      if (enabled) {
        this.globalApiConfig.enable = false
      }
    },
    'kanboardEditor.globalVariables': {
      handler: 'handleGlobalVariablesUpdate',
      immediate: true
    }
  }
}