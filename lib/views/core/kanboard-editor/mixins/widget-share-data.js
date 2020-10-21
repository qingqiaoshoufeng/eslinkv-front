export default {
  data () {
    return {
      shareVariablesMap: {},
      shareDataMap: {},
      shareVariables: []
    }
  },
  methods: {
    setShareData ({ config }, variable, data) {
      const id = config.widget.id
      const currentVariable = this.shareVariablesMap[id]
      const variableChanged = currentVariable !== variable
      if (variableChanged || !variable) {
        currentVariable && this.$delete(this.shareDataMap, currentVariable)
      }
      if (variable) {
        if (variableChanged) {
          this.$set(this.shareVariablesMap, id, variable)
        }
        this.$set(this.shareDataMap, variable, data)
      } else {
        this.$delete(this.shareVariablesMap, id)
      }
    },
    removeShareData ({ config }) {
      const id = config.widget.id
      const currentVariable = this.shareVariablesMap[id]
      if (currentVariable) {
        this.$delete(this.shareDataMap, currentVariable)
        this.$delete(this.shareVariablesMap, id)
      }
    }
  },
  watch: {
    shareVariablesMap: {
      handler: function (value) {
        this.shareVariables = Object.values(value)
      },
      deep: true
    }
  }
}
