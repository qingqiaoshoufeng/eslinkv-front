import { commonConvertMap } from '../utils/convert-helper'
import eventHelper from '../utils/event-helper'
import { lazyAMapApiLoaderInstance } from '../services/injected-amap-api-instance'
import CONSTANTS from '../utils/constant'
import VueAMap from '../'

function findAmapRoot() {
	if (this.$amap) return this.$amap
	const parent = this.$parent
	if (parent) {
		const fun = findAmapRoot.bind(parent)
		return fun()
	}
}

export default {
	data() {
		return {
			unwatchFns: [],
		}
	},

	async mounted() {
		if (lazyAMapApiLoaderInstance) {
			lazyAMapApiLoaderInstance.load().then(() => {
				this.__contextReady &&
					this.__contextReady.call(this, this.convertProps())
			})
		}
		const fun = findAmapRoot.bind(this)
		this.$amap = fun()
		if (this.$amap) {
			this.register()
		} else {
			this.$on(CONSTANTS.AMAP_READY_EVENT, map => {
				this.$amap = map
				this.register()
			})
		}
	},

	destroyed() {
		this.unregisterEvents()
		if (!this.$amapComponent) return
		this.$amapComponent.setMap && this.$amapComponent.setMap(null)
		this.$amapComponent.close && this.$amapComponent.close()
		this.$amapComponent.editor && this.$amapComponent.editor.close()
		this.unwatchFns.forEach(item => item())
		this.unwatchFns = []
	},

	methods: {
		getHandlerFun(prop) {
			if (this.handlers && this.handlers[prop]) {
				return this.handlers[prop]
			}

			return (
				this.$amapComponent[`set${prop}`] ||
				this.$amapComponent.setOptions
			)
		},

		convertProps() {
			const props = {}
			if (this.$amap) props.map = this.$amap
			let {
				$options: { propsData = {} },
				propsRedirect,
			} = this
			propsData = JSON.parse(JSON.stringify(propsData))
			return Object.keys(propsData).reduce((res, _key) => {
				let key = _key
				const propsValue = this.convertSignalProp(key, propsData[key])
				if (propsValue === undefined) return res
				if (propsRedirect && propsRedirect[_key]) {
					key = propsRedirect[key]
				}
				props[key] = propsValue
				return res
			}, props)
		},

		convertSignalProp(key, sourceData) {
			let converter = ''
			let type = ''

			if (this.amapTagName) {
				try {
					const name = this.amapTagName.replace(/^El/, '')
					const componentConfig = VueAMap[name] || ''

					type = componentConfig.props[key].$type
					converter = commonConvertMap[type]
				} catch (e) {}
			}

			if (type && converter) {
				return converter(sourceData)
			} else if (this.converters && this.converters[key]) {
				return this.converters[key].call(this, sourceData)
			} else {
				const convertFn = commonConvertMap[key]
				if (convertFn) return convertFn(sourceData)
				return sourceData
			}
		},

		registerEvents() {
			this.setEditorEvents && this.setEditorEvents()
			if (!this.$options.propsData) return
			if (this.$options.propsData.events) {
				for (const eventName in this.events) {
					eventHelper.addListener(
						this.$amapComponent,
						eventName,
						this.events[eventName],
					)
				}
			}

			if (this.$options.propsData.onceEvents) {
				for (const eventName in this.onceEvents) {
					eventHelper.addListenerOnce(
						this.$amapComponent,
						eventName,
						this.onceEvents[eventName],
					)
				}
			}
		},

		unregisterEvents() {
			eventHelper.clearListeners(this.$amapComponent)
		},

		setPropWatchers() {
			const {
				propsRedirect,
				$options: { propsData = {} },
			} = this

			Object.keys(propsData).forEach(prop => {
				let handleProp = prop
				if (propsRedirect && propsRedirect[prop]) {
					handleProp = propsRedirect[prop]
				}
				const handleFun = this.getHandlerFun(handleProp)
				if (!handleFun && prop !== 'events') return

				// watch props
				const unwatch = this.$watch(prop, nv => {
					if (prop === 'events') {
						this.unregisterEvents()
						this.registerEvents()
						return
					}
					if (
						handleFun &&
						handleFun === this.$amapComponent.setOptions
					) {
						return handleFun.call(this.$amapComponent, {
							[handleProp]: this.convertSignalProp(prop, nv),
						})
					}

					handleFun.call(
						this.$amapComponent,
						this.convertSignalProp(prop, nv),
					)
				})

				// collect watchers for destroyed
				this.unwatchFns.push(unwatch)
			})
		},

		registerToManager() {
			const manager = this.amapManager || this.$parent.amapManager
			if (manager && this.vid !== undefined) {
				manager.setComponent(this.vid, this.$amapComponent)
			}
		},

		// some prop can not init by initial created methods
		initProps() {
			const props = ['editable', 'visible']

			props.forEach(propStr => {
				if (this[propStr] !== undefined) {
					const handleFun = this.getHandlerFun(propStr)
					handleFun &&
						handleFun.call(
							this.$amapComponent,
							this.convertSignalProp(propStr, this[propStr]),
						)
				}
			})

			// this.printReactiveProp();
		},

		/**
		 * methods for developing
		 * find reactive props
		 */
		printReactiveProp() {
			Object.keys(this._props).forEach(k => {
				const fn = this.$amapComponent[`set${k}`]
				if (fn) {
					console.log(k)
				}
			})
		},

		register() {
			const res =
				this.__initComponent &&
				this.__initComponent(this.convertProps())
			if (res && res.then) {
				res.then(instance => this.registerRest(instance))
			}
			// promise
			else this.registerRest(res)
		},

		registerRest(instance) {
			if (!this.$amapComponent && instance) this.$amapComponent = instance
			this.registerEvents()
			this.initProps()
			this.setPropWatchers()
			this.registerToManager()

			if (this.events && this.events.init) {
				this.events.init(
					this.$amapComponent,
					this.$amap,
					this.amapManager || this.$parent.amapManager,
				)
			}
		},

		// helper method
		$$getInstance() {
			return this.$amapComponent
		},
	},
}
