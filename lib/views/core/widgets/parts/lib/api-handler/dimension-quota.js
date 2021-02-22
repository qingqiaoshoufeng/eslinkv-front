export default {
  data () {
    return {
      isArrayType: true,
      analyseData: null
    }
  },
  methods: {
    useDimensionQuota (data) {
      if (!this.isDimensionAndQuotaEnabled || !data) return data
      this.isArrayType = Array.isArray(data)
      this.setAnalyseData(data)
      const { dimensions = [], quotas = [] } = this.dimensionAndQuota
      const result = {}
      if (this.isArrayType) {
        data.forEach(item => {
          dimensions.forEach(({ fieldName, dimensionName }) => {
            if (!result[dimensionName]) result[dimensionName] = []
            result[dimensionName].push(item[fieldName])
          })
          quotas.forEach(({ fieldName, quotaName }) => {
            if (!result[quotaName]) result[quotaName] = []
            result[quotaName].push(item[fieldName])
          })
        })
        return result
      }
      dimensions.forEach(({ fieldName, dimensionName }) => {
        result[dimensionName] = data[fieldName]
      })
      quotas.forEach(({ fieldName, quotaName }) => {
        result[quotaName] = data[fieldName]
      })
      return result
    },
    setAnalyseData (data) {
      if (!this.isDimensionAndQuotaEnabled || !data) return
      const index = this.dimensionAndQuota.index
      this.analyseData = index ? data[index] : data
    },
    setFieldsSource () {
      if (!this.isDimensionAndQuotaEnabled) return
      const analyseKeys = this.analyseKeys
      if (!analyseKeys) return
      const fieldsSource = this.dimensionAndQuota.fieldsSource
      fieldsSource.splice(0)
      const fields = this.analyseKeys.map(key => {
        return {
          label: key,
          value: key
        }
      })
      fieldsSource.push(...fields)
    },
    setDimensions (dimensionFields) {
      if (!this.isDimensionAndQuotaEnabled) return
      const dimensions = this.dimensionAndQuota.dimensions
      const cacheDimensions = [...dimensions]
      dimensions.splice(0)
      dimensionFields.forEach(({ value }, index) => {
        const cacheDimension = cacheDimensions.find(dimension => dimension.fieldName === value)
        dimensions.push(cacheDimension || {
          fieldName: value,
          dimensionName: `name${index ? index : ''}`
        })
      })
    },
    setQuotas (quotaFields) {
      if (!this.isDimensionAndQuotaEnabled) return
      const quotas = this.dimensionAndQuota.quotas
      const cacheQuotas = [...quotas]
      quotas.splice(0)
      quotaFields.forEach(({ value }, index) => {
        const cacheQuota = cacheQuotas.find(quota => quota.fieldName === value)
        quotas.push(cacheQuota || {
          fieldName: value,
          quotaName: `value${index ? index : ''}`
        })
      })
    }
  },
  computed: {
    isDimensionAndQuotaEnabled () {
      const api = this.config.api
      return api && api.dimensionAndQuota && api.dimensionAndQuota.enable
    },
    dimensionAndQuota () {
      return this.isDimensionAndQuotaEnabled ? this.config.api.dimensionAndQuota : null
    },
    analyseKeys () {
      return this.analyseData ? Object.keys(this.analyseData) : []
    }
  },
  watch: {
    'dimensionAndQuota.index': {
      handler: 'setFieldsSource',
      immediate: true
    },
    analyseKeys: {
      handler: 'setFieldsSource',
      deep: true
    },
    'dimensionAndQuota.dimensionFields': {
      handler: 'setDimensions',
      immediate: true
    },
    'dimensionAndQuota.quotaFields': {
      handler: 'setQuotas',
      immediate: true
    }
  }
}
