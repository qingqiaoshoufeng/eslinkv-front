import fetch from './fetch'
import dimensionAndQuota from './dimension-quota'
import dataProcess from './data-process'
import dataShare from './data-share'
import crossFrameParamsWatcher from './cross-frame-params-watcher'

export default {
  mixins: [fetch, dimensionAndQuota, dataProcess, dataShare, crossFrameParamsWatcher]
}
