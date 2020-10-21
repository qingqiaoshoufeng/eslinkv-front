import parseParams from './parse-params'

export default {
  data () {
    return {
      unWatchers: [],
      crossParamsCache: null
    }
  },
  methods: {
    handleCrossFrameParam (params) {
      const unWatchers = this.unWatchers
      while (unWatchers.length) {
        unWatchers.pop()()
      }
      if (!params) {
        return
      }
      params.forEach(crossParam => {
        if (!crossParam.param) crossParam.param = crossParam.input
      })
      const paramSet = this.apiParams
      if (this.kanboard.isInEditor) {
        // 删除旧的参数
        if (this.crossParamsCache) {
          this.crossParamsCache.forEach(key => {
            delete paramSet[key]
          })
        }
        this.crossParamsCache = params.map(crossParam => crossParam.param)
      }
      this.api.params = Object.keys(paramSet).length ? { ...paramSet } : ''
      params.forEach(crossParam => {
        const { input, param } = crossParam
        unWatchers.push(this.$watch(`kanboardEditor.crossFrameParams.${input}`, function (value) {
          this.handleCrossFrameParamUpdate(param, value)
        }))
      })
    },
    handleCrossFrameParamUpdate (param, value) {
      const paramSet = this.apiParams
      // console.info(param, value)
      this.api.params = { ...paramSet, [param]: value }
    }
  },
  computed: {
    apiParams () {
      return this.api ? parseParams(this.api.params) : null
    },
    crossFrameParamsBindConfig () {
      const api = this.api
      if (!api) return null
      return api.crossFrameParamsBind ? api.crossFrameParamsBind.params.filter(param => param.input) : null
    }
  },
  watch: {
    crossFrameParamsBindConfig: {
      handler: 'handleCrossFrameParam',
      immediate: true,
      deep: true
    }
  }
}
