export default {
  data () {
    return {
      pathExecuteTimer: null
    }
  },
  methods: {
    // 按照引用路径，查找末端数据
    usePath (path, data) {
      const keys = path ? path.split('.') : []
      while (keys.length) {
        const key = keys.shift()
        this.pathExecuteTimer && clearTimeout(this.pathExecuteTimer)
        if (!key) {
          this.pathExecuteTimer = setTimeout(() => {
            this.$Message.warning(`数据源查找路径 ${path} 无效！`)
            this.pathExecuteTimer = null
          }, 500)
          break
        }
        data = data[key]
        if (data == undefined) {
          this.pathExecuteTimer = setTimeout(() => {
            this.$Message.warning(`数据源查找路径 ${path}，在 ${key} 处未引用到有效数据！`)
            this.pathExecuteTimer = null
          }, 500)
          break
        }
      }
      return data
    },
    parseQueryResult (response, { path }) {
      response = this.usePath(path, response)
      this.api.data = response
      this.$emit('api-data-update', response)
    }
  }
}
