export default {
	data() {
		return {
			shareDataUnWatcher: null,
			sharePathUpdateWatcher: null,
			providerTimer: null,
			sharePathUpdateTimer: null,
			dataForShare: null
		}
	},
	methods: {
		shareData() {
			this.providerTimer && clearTimeout(this.providerTimer)
			const variable = this.dataShareConfig.shareVariable
			if (!this.isShareDataProvider || !variable) return
			this.providerTimer = setTimeout(() => {
				this.dispatchQuery(this.config.api)
				this.providerTimer = null
			}, 300)
		},
		unshareData() {
			this.kanboardEditor && this.kanboardEditor.removeShareData(this)
		},
		handleShareData(data) {
			const {path, process} = this.config.api
			data != undefined && this.parseQueryResult(data, {path, process})
		},
		getShareData(variable) {
			this.shareDataUnWatcher && this.shareDataUnWatcher()
			this.sharePathUpdateWatcher && this.sharePathUpdateWatcher()
			if (!this.isShareDataUser || !variable) return
			const key = variable[0]
			if (!key) return
			this.handleShareData(this.kanboardEditor.shareDataMap[key])
			this.shareDataUnWatcher = this.$watch(`kanboardEditor.shareDataMap.${key}`, this.handleShareData)
			this.sharePathUpdateWatcher = this.$watch(`config.api.path`, this.shareHandlePathUpdate)
		},
		shareHandlePathUpdate() {
			if (this.sharePathUpdateTimer) clearTimeout(this.sharePathUpdateTimer)
			this.sharePathUpdateTimer = setTimeout(() => {
				const variable = this.dataShareConfig.useVariable
				if (!variable || !variable[0]) return
				this.handleShareData(this.kanboardEditor.shareDataMap[variable[0]])
				this.sharePathUpdateTimer = null
			}, 500)
		},
		removeShareData() {
			this.shareDataUnWatcher && this.shareDataUnWatcher()
			this.sharePathUpdateWatcher && this.sharePathUpdateWatcher()
		},
		handleShareVariablesUpdate(variables) {
			const dataShareConfig = this.dataShareConfig
			if (dataShareConfig) {
				dataShareConfig.shareVariables = variables
			}
		}
	},
	computed: {
		dataShareConfig() {
			return this.config.api ? this.config.api.dataShareConfig : null
		},
		dataShareEnabled() {
			return this.dataShareConfig && this.dataShareConfig.enable
		},
		isShareDataProvider() {
			if (!this.dataShareEnabled) return false
			const role = this.dataShareConfig.role
			return role === 'provider'
		},
		isShareDataUser() {
			if (!this.dataShareEnabled) return false
			const role = this.dataShareConfig.role
			return role === 'responder'
		}
	},
	watch: {
		isShareDataProvider: {
			handler: function (value) {
				if (value) {
					const api = this.config.api
					if (api.globalApiConfig) api.globalApiConfig.enable = false
					this.shareData()
				} else {
					this.unshareData()
				}
			},
			immediate: true
		},
		'dataShareConfig.shareProcessedData': {
			handler: 'shareData'
		},
		'dataShareConfig.shareVariable'(value) {
			if (!this.isShareDataProvider) return
			value ? this.shareData() : this.unshareData()
		},
		isShareDataUser: {
			handler: function (value) {
				if (value) {
					const api = this.config.api
					// 禁用数仓数据源
					if (api.system) api.system.enable = false
					// 禁用自动刷新
					if (api.autoFetch) api.autoFetch.enable = false
					// 禁用全局数据源配置
					if (api.globalApiConfig) api.globalApiConfig.enable = false
					// 清空数据查找路径
					api.path = ''
					this.handleShareVariablesUpdate(this.kanboardEditor.shareVariables)
					this.getShareData(this.dataShareConfig.useVariable)
				} else {
					this.removeShareData()
				}
			},
			immediate: true
		},
		'dataShareConfig.useVariable'(value) {
			if (!this.isShareDataUser) return
			value ? this.getShareData(value) : this.removeShareData()
		},
		'kanboardEditor.shareVariables': {
			handler: 'handleShareVariablesUpdate',
			immediate: true
		},
		dataForShare(value) {
			if (!this.isShareDataProvider) return
			const variable = this.dataShareConfig.shareVariable
			variable && this.kanboardEditor.setShareData(this, variable, value)
		}
	}
}
