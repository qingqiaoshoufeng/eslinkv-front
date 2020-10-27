import fetch from './fetch'
import paramBind from './param-bind'
import dataProcess from './data-process'
import crossFrameParamsWatcher from './cross-frame-params-watcher'

export default {
	name: 'api',
	mixins: [fetch, paramBind, dataProcess, crossFrameParamsWatcher],
	inject: ['kanboardEditor'],
	props: {
		api: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			config: {
				widget: {
					id: null
				}
			}
		}
	},
	watch: {
		api: {
			handler: function (value) {
				this.config.widget.id = value.variable
			},
			immediate: true
		}
	},
	render: function (h) {
		return null
	}
}
