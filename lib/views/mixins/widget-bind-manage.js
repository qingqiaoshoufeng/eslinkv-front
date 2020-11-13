import parsePathToObject from '../../vendor/parse-path-to-object'
import findLeafPath from '../../vendor/object-find-leaf-path'

// 小工具关联关系
const bindMap_provider_to_responder = {}
// 逆向映射关系
const bindMap_responder_to_provider = {}

// provider 小工具，提供参数变更通知
const providers = {}
// responder 小工具，接收参数变更通知
const responders = {}
// responder 内部参数状态
const respondersParamsMap = {}
//

// provider 小工具可用参数映射
const paramsMap = {}

const unwatch = watchers => {
  watchers.forEach(unwatchHandler => {
    unwatchHandler && unwatchHandler()
  })
}

const paramsCleaner = (localParams, bindSetting) => {
  const paramsLinks = bindSetting.reduce((acc, current) => {
    const links = current.paramsLinks || []
    acc.push(...links)
    return acc
  }, []).map(link => link.responderParam)
  const localParamsPaths = findLeafPath(localParams)
  localParamsPaths.forEach(path => {
    if (!paramsLinks.includes(path)) {
      if (path.indexOf('.') === -1) {
        delete localParams[path]
      } else {
        const keys = path.split('.')
        let current = localParams
        while (keys.length > 0) {
          current = current[keys.shift()]
        }
        delete current[keys[0]]
      }
    }
  })
}

/**
 * 小工具参数关联
 * @param {Object} widget responders 小工具对象
 * @param {Array} targetIds providers 小工具 ID 列表，分别对应其 config.widget.id
 * @param {String} params 关联 providers 小工具的参数清单
 */
const bindParams = (widget, targetIds, params) => {
  const refId = widget.config.widget.id

  if (!responders[refId]) {
    console.warn(`请检查 ID 为 ${refId} 的小工具是否开启了数据源->组件关联，并指定了参数响应角色`)
    widget.$Message.warning(`请检查 ID 为 ${refId} 的小工具是否开启了数据源->组件关联，并指定了参数响应角色`)
    return
  }

  const ids = targetIds.filter(id => id && providers[id] && id !== refId)

  ids.forEach(id => {
    const provider = providers[id]
    if (!provider) {
      console.warn(`请检查 ID 为 ${id} 的小工具是否开启了数据源->组件关联，并指定了参数广播角色`)
      widget.$Message.warning(`请检查 ID 为 ${id} 的小工具是否开启了数据源->组件关联，并指定了参数广播角色`)
      return
    }
    const binder = bindMap_provider_to_responder[id] || (bindMap_provider_to_responder[id] = [])
    // param 是一个数组，支持多个参数 path 的关联
    const param = (params.find(param => param.providerId === id) || {}).paramsLinks || []
    const localParams = respondersParamsMap[refId] || (respondersParamsMap[refId] = {})
    paramsCleaner(respondersParamsMap[refId], params)
    const watcher = []
    param.forEach(({ providerParam, responderParam }) => {
      if (!providerParam || !responderParam) return
      // 利用 $watch 方法实现参数的关联
      watcher.push(provider.$watch(providerParam, function (value) {
        if (responderParam.indexOf('.') === -1) {
          localParams[responderParam] = value
        } else {
          parsePathToObject(responderParam, value, localParams)
        }
        widget.executeBindChange(localParams)
      }, { immediate: true }))
    })

    const refBinder = binder.find(bind => bind.id === refId)
    if (refBinder) {
      unwatch(refBinder.watcher)
      refBinder.watcher = watcher
    } else {
      binder.push({
        id: refId,
        watcher
      })
    }
  })

  bindMap_responder_to_provider[refId] = ids
}

// 解绑小工具参数关联
const unBindParams = widget => {
  const refId = widget.config.widget.id
  const binderIds = bindMap_responder_to_provider[refId]
  binderIds && binderIds.forEach(binderId => {
    const binder = bindMap_provider_to_responder[binderId]
    if (!binder) return
    const index = binder.findIndex(bind => bind.id === refId)
    if (index !== -1) {
      unwatch(binder[index].watcher)
      binder.splice(index, 1)
    }
    if (!binder.length) delete bindMap_provider_to_responder[binderId]
  })
  delete bindMap_responder_to_provider[refId]
}

/**
 * 小工具注册
 * @param {Object} widget 小工具对象，vue 实例
 * @param {Array} role 绑定角色，providers、responders
 */
const loadWidget = (widget, role = []) => {
  if (!widget) return
  unloadWidget(widget)

  const id = widget.config.widget.id
  // 默认都是广播
  providers[id] = widget
  // if (role.includes('provider')) providers[id] = widget
  // if (role.includes('responder')) responders[id] = widget
}

// 小工具注销
const unloadWidget = widget => {
  if (!widget) return
  const id = widget.config.widget.id
  delete providers[id]
  delete responders[id]
  delete paramsMap[id]
  delete respondersParamsMap[id]
  unBindParams(widget)
}

// 供外部，比如 "配置面板->数据源->组件关联->关联ID" 项目，获取已注册的小工具清单
const getProviderList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const list = await Promise.all(Object.values(providers).map(async widget => {
        const { id, name } = widget.config.widget
        const output = await getProviderParams(id)
        const paramsList = output.length ? output.map(item => item.path).join('\n') : '未知'
        const title = `ID: ${id}\n可绑定参数:\n${paramsList}`
        const label = widget.$options.label
        return {
          id,
          name: name || label,
          title
        }
      })).catch(reject)
      if (!list.length) list.push({ id: -1, name: '暂无可绑定小工具', disabled: true })
      resolve(list)
    } catch (err) {
      reject(err)
    }
  })
}

const getProviderParams = id => {
  return new Promise((resolve, reject) => {
    try {
      const cachedParams = paramsMap[id]
      if (cachedParams) {
        resolve([...cachedParams])
        return
      }
      const provider = providers[id]
      if (!provider) {
        resolve([])
        return
      }
      paramsMap[id] = []
      const params = paramsMap[id]
      const output = provider.output || []
      if (typeof output !== 'object' || Array.isArray(output)) {
        params.push({
          path: 'output'
        })
      } else {
        Object.keys(output).forEach(key => {
          params.push({
            path: `output.${key}`
          })
        })
      }
      resolve([...params])
    } catch (err) {
      reject(err)
    }
  })
}

window.widgetBindManager = {
  bindMap_provider_to_responder,
  bindMap_responder_to_provider,
  providers,
  responders,
  paramsMap,
  respondersParamsMap
}

export { bindParams, unBindParams, loadWidget, unloadWidget, getProviderList, getProviderParams }
