<template>
	<component :is="currentComponent"
			   :class="animationClass"
			   :id="config.widget && config.widget.id"
			   :widget-ref="config.widget && config.widget.id"
			   v-bind="{config,readonly,...$attrs}"
			   @widget-config-update="data => $emit('widget-config-update', data)"
			   @query-start="querying = true"
			   @query-end="querying = false"
			   @query-failed="querying = true"
			   @config-reset="$emit('config-reset')"
			   v-on="$listeners"
			   ref="widgets"
	>
		<slot/>
	</component>
</template>
<script>
	import {cssStyle2DomStyle} from '../../utils'
	import Vue from "vue"
	import custom from '../../store/custom.store'

	export default {
		props: {
			market: {},
			classification: {
				type: String
			},
			type: {
				type: String,
				required: true
			},
			config: {
				type: Object,
				default: null
			},
			readonly: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				componentVersion: '',
				querying: false,
				queryFailed: false,
				replayAnimation: false,
				ready: false,
				animationClass: null,
				animationStyle: 'opacity: 0',
				componentList: {},
				custom: custom.state
			}
		},
		computed: {
			currentComponent() {
				if (this.componentList[cssStyle2DomStyle(this.type)])
					return this.componentList[cssStyle2DomStyle(this.type)]

				if (this.ready) {
					if (this.market)
						return `market-${this.type}-${this.componentVersion}`
					return `dvdp-${this.type}`
				}

				return null
			},
			animation() {
				return this.config.animation || {}
			},
			animationEnabled() {
				return this.animation.transitionEnable
			}
		},
		methods: {
			beforeEnter(el, animation) {
				el.style.animationDuration = ` ${animation.duration}ms`
				el.style.animationDelay = `${animation.delay}ms`
			},
			handleAnimationEnd() {
				this.replayAnimation = false
			},
			// type: 入场动画 or 出场动画
			setAnimation(type) {
				if (!this.animationEnabled || !this.animation) {
					this.removeAnimation()
					return
				}
				const {enter, leave, duration, delay} = this.animation
				let animationClass
				const animationSource = type === 'enter' ? enter : leave
				if (!Array.isArray(animationSource)) {
					animationClass = `animate__${animationSource}`
				} else {
					animationClass = animationSource.map(item => `animate__${item}`).join(' ')
				}
				this.animationClass = `animate__animated ${animationClass}`
				this.animationStyle = `animation-duration: ${duration}ms; animation-delay: ${delay}ms`
				let timer = setTimeout(() => {
					this.removeAnimation()
					this.handleAnimationEnd()
					clearTimeout(timer)
				}, delay + duration + 300)
			},
			removeAnimation() {
				this.animationClass = null
				this.animationStyle = null
			}
		},
		watch: {
			animation: {
				handler: function () {
					this.replayAnimation = true
				},
				deep: true
			},
			animationEnabled(value) {
				value && this.setAnimation('enter')
			},
			ready() {
				this.setAnimation('enter')
			},
			replayAnimation(value) {
				value ? this.setAnimation('enter') : this.removeAnimation()
			}
		},
		mounted() {
			if (this.componentList[cssStyle2DomStyle(this.type)]) {
				this.ready = true
			} else {
				if (this.market) {
					this.componentVersion = this.config.widget.componentVersion
					if (window.GoldChart.components[`${this.type}-${this.componentVersion}`]) {
						this.ready = true
					} else {
						this.$sysApi.bussiness.detailMarket({
							componentEnTitle: this.type,
							componentVersion: this.config.widget.componentVersion
						}).then(res => {
							let script = document.createElement('script')
							script.onload = () => {
								Vue.component(
									`market-${res.componentEnTitle}-${this.config.widget.componentVersion}`,
									window.GoldChart.components[`${res.componentEnTitle}-${this.config.widget.componentVersion}`].component)
								this.ready = true
							}
							script.src = res.componentJsUrl
							document.head.appendChild(script)
						})
					}
				} else {
					if (window.GoldChart.components[`dvdp-${this.type}`]) {
						this.ready = true
					} else {
						Vue.component(`dvdp-${this.type}`, this.custom.components[this.type])
						window.GoldChart.components[`dvdp-${this.type}`] = this.custom.components[this.type]
						this.ready = true
					}
				}
			}
			this.$el.addEventListener('animationend', this.handleAnimationEnd)
		},
		beforeDestroy() {
			this.$el.removeEventListener('animationend', this.handleAnimationEnd)
		}
	}
</script>
