import parseParams from './parse-params'

const isValidBindParamLink = link => link.providerParam && link.responderParam

export default {
	inject: ['bindParams', 'unBindParams', 'loadWidget', 'unloadWidget', 'getProviderList', 'kanboard'],
	props: {
		noBindParams: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			bindTimer: null,
			registerTimer: null,
			bindFirstFetchOccurred: false,
			bindParamsCache: null,
			paramsUpdateTimer: null
		}
	},
	methods: {
		updateParamsAutoFill(value) {
			if (!this.isBindEnabled) return
			const bind = this.config.api.bind
			value = value ? value.filter(id => !!id) : []
			if (value.length) {
				let params = bind.params
				// 兼容旧的配置
				if (typeof params === 'string' && params) {
					params = (bind.params = params.split(/\n/).map(param => {
						let [providerId, paramsLinks] = param.split(':')
						paramsLinks = paramsLinks ? paramsLinks.split(',').map(p => {
							const [providerParam, responderParam] = p.split('>').map(item => item.trim())
							return {
								providerId,
								providerParam,
								responderParam
							}
						}) : []
						return {
							providerId,
							paramsLinks
						}
					}))
				} else {
					params = params || (bind.params = [])
				}
				const copiedParams = [...params]
				params.splice(0)
				value.forEach(id => {
					const existedParamSet = copiedParams.find(param => param.providerId === id)
					if (!existedParamSet) {
						params.push({
							providerId: id,
							paramsLinks: []
						})
					} else {
						params.push(existedParamSet)
					}
				})
			} else {
				bind.params ? bind.params.splice(0) : bind.params = []
			}
		},
		updateWidgetParamsBind() {
			// console.info(this._uid, this.isBindEnabled)
			if (!this.isBindEnabled) return
			if (this.bindTimer) clearTimeout(this.bindTimer)
			this.bindTimer = setTimeout(() => {
				const bindSetting = this.config.api ? this.config.api.bind : null
				this.unBindParams(this)
				if (!bindSetting) return
				let {refIds, params} = bindSetting
				if (!refIds || !refIds.length || !params || !params.length) return
				// 配置中新增关联，补全关联 ID
				params.forEach(({providerId, paramsLinks}) => {
					paramsLinks.forEach(link => {
						if (!link.providerId) link.providerId = providerId
					})
				})
				// console.info(JSON.stringify(refIds), JSON.stringify(params))
				// 以下，仅绑定参数配置齐全的项目
				refIds = refIds.filter(id => {
					return !!id && params.find(({providerId, paramsLinks}) => {
						return providerId === id && paramsLinks.some(isValidBindParamLink)
					})
				})
				const bindableParam = []
				params.forEach(({providerId, paramsLinks}) => {
					if (refIds.includes(providerId) && paramsLinks.some(isValidBindParamLink)) {
						bindableParam.push({
							providerId,
							paramsLinks: paramsLinks.filter(isValidBindParamLink)
						})
					}
				})
				// console.info(refIds, bindableParam)
				refIds.length && this.bindParams(this, refIds, bindableParam)
			}, 500)
		},
		executeBindChange(params) {
			this.paramsUpdateTimer && clearTimeout(this.paramsUpdateTimer)
			this.paramsUpdateTimer = setTimeout(() => {
				const paramSet = parseParams(this.config.api.params)
				if (this.kanboard.isInEditor) {
					// 删除旧的参数
					if (this.bindParamsCache) {
						Object.keys(this.bindParamsCache).forEach(key => {
							delete paramSet[key]
						})
					}
					this.bindParamsCache = {...params}
				}
				this.config.api.params = {...paramSet, ...params}
				if (this.paramsToIframeContext) {
					this.iframeContext && this.iframeContext.contentWindow.postMessage(this.config.api.params, this.iframeContext.src)
				}
				this.bindFirstFetchOccurred = true
				this.paramsUpdateTimer = null
			}, 50)
		},
		registerWidgetBind() {
			const api = this.config.api
			if (!api || this.noBindParams) return
			this.registerTimer && clearTimeout(this.registerTimer)
			this.registerTimer = setTimeout(() => {
				const {enable, role = []} = api.bind || {}
				if (enable) {
					this.loadWidget(this, [...role])
					this.updateWidgetParamsBind()
				} else {
					this.unloadWidget(this)
				}
				this.registerTimer = null
			})
		}
	},
	computed: {
		isBindEnabled() {
			if (this.noBindParams) return false
			const api = this.config.api
			return api && api.bind && api.bind.enable
		},
		isPreviewInEditor() {
			if (this.$route) {
				return [
					'big-data-new-preview',
					'big-data-edit-preview',
					'big-data-template-add-preview',
					'big-data-template-edit-preview'
				].includes(this.$route.name)
			} else {
				return [
					'big-data-new-preview',
					'big-data-edit-preview',
					'big-data-template-add-preview',
					'big-data-template-edit-preview'
				]
			}
		},
		isBindResponder() {
			return this.isBindEnabled && this.config.api.bind.role.includes('responder')
		},
		isBindParamsValidated() {
			if (!this.isBindResponder) return false
			const bindParams = this.config.api.bind.params
			return bindParams && bindParams.some(bind => bind.paramsLinks.some(link => link.providerId && link.providerParam && link.responderParam))
		}
	},
	watch: {
		'config.api.bind.enable': {
			handler: 'registerWidgetBind',
			immediate: true
		},
		'config.api.bind.role': {
			handler: 'registerWidgetBind',
			immediate: true,
			deep: true
		},
		'config.api.bind.refIds': {
			handler: function (value) {
				if (!value || !value.length) return
				this.updateParamsAutoFill(value)
				this.updateWidgetParamsBind()
			},
			immediate: true,
			deep: true
		},
		'config.api.bind.params': {
			handler: 'updateWidgetParamsBind',
			immediate: true,
			deep: true
		}
	},
	beforeDestroy() {
		!this.isPreviewInEditor && this.unloadWidget(this)
		this.bindTimer && clearTimeout(this.bindTimer)
	}
}
