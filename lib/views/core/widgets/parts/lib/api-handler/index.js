import fetch from './fetch'
import dimensionAndQuota from './dimension-quota'
import dataProcess from './data-process'
import paramBind from './param-bind'
import globalApiBind from './global-api-bind'
import dataShare from './data-share'
import crossFrameParamsWatcher from './cross-frame-params-watcher'

export default {
  mixins: [fetch, dimensionAndQuota, dataProcess, paramBind, globalApiBind, dataShare, crossFrameParamsWatcher]
}
