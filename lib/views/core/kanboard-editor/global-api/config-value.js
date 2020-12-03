const configValue = Object.freeze({
  api: {
    url: '',
    method: 'GET',
    params: '',
    path: 'data',
    data: '',
    autoFetch: {
      enable: false,
      duration: 5000
    },
    check: {
      enable: true,
      key: 'status',
      value: 200,
      type: 'Number'
    },
    system: {
      enable: false,
      interface: 'api/impalaByQueryId',
      method: 'GET',
      path: 'data',
      check: {
        enable: true,
        key: 'responseCode',
        value: '100000',
        type: 'String'
      },
      params: {
        chartCondition: '',
        analyseCondition: '',
        chartQueryType: '',
        dataAnalyseId: '',
        databaseId: '',
        databaseType: '',
        databaseName: '',
        dataSourceId: '',
        dataType: '',
        executeSql: '',
        projectId: '',
        tableId: '',
        tableName: ''
      }
    },
    bind: {
      enable: false,
      role: [],
      refIds: [],
      params: [],
    },
    crossFrameParamsBind: {
      params: []
    }
  }
})

export default configValue
