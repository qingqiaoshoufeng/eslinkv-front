import apiExecutor from './api-executor'

export default {
  components: { apiExecutor },
  data () {
    return {
      apis: null,
      variablesWatcher: {}
    }
  },
  methods: {
    handleGlobalApiUpdate (apis) {
      this.apis = apis.filter(api => {
        const system = api.system
        const isSystemApi = system.enable && system.interface && Object.values(system.params).filter(item => !!item).length
        return api.variable && (api.url || isSystemApi)
      })
    },
    handleApiDataUpdate (variable, data) {
      this.$set(this.variablesWatcher, variable, data)
    }
  },
  computed: {
    globalVariables () {
      if (!this.apis) return []
      return this.apis.map(api => api.variable)
    }
  }
}
