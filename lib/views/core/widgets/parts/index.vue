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
			   @ready="ready = true"
			   v-on="$listeners"
			   ref="widgets"
	>
		<slot/>
	</component>
</template>
<script>
	import {cssStyle2DomStyle} from '../../../../utils'
	import {store} from '../../../../store'

	let componentList = {
		border: () => import('./decoration/border'),
		dateTime: () => import('./decoration/date-time'),
		decoration: () => import('./decoration/decoration'),
		aImage: () => import('./decoration/image'),
		aSvg: () => import('./decoration/svg'),
		lottie: () => import('./decoration/lottie'),
		levelTitle: () => import('./decoration/title'),
		multilineText: () => import('./decoration/multiline-text.vue'),
		swiper: () => import('./decoration/swiper'),
		activeRingChart: () => import('./dv-charts/active-ring-chart'),
		barDvcharts: () => import('./dv-charts/bar'),
		capsuleChart: () => import('./dv-charts/capsule-chart'),
		conicalColumnChart: () => import('./dv-charts/conical-column-chart'),
		digitalFlop: () => import('./dv-charts/digital-flop'),
		flylineChart: () => import('./dv-charts/flyline-chart'),
		gaugeDvcharts: () => import('./dv-charts/gauge'),
		lineDvcharts: () => import('./dv-charts/line'),
		percentPond: () => import('./dv-charts/percent-pond'),
		pieDvcharts: () => import('./dv-charts/pie'),
		radarDvcharts: () => import('./dv-charts/radar'),
		scrollBoard: () => import('./dv-charts/scroll-board'),
		scrollRankingBoard: () => import('./dv-charts/scroll-ranking-board'),
		waterLevelPond: () => import('./dv-charts/water-level-pond'),
		bar: () => import('./echarts/bar'),
		lineChart: () => import('./echarts/line'),
		pie: () => import('./echarts/pie'),
		scatter: () => import('./echarts/scatter'),
		radar: () => import('./echarts/radar'),
		gauge: () => import('./echarts/gauge'),
		effectScatter: () => import('./echarts/effectScatter'),
		heatmap: () => import('./echarts/heatmap'),
		funnel: () => import('./echarts/funnel'),
		mapChart: () => import('./echarts/map'),
		parallel: () => import('./echarts/parallel'),
		sunburst: () => import('./echarts/sunburst'),
		presetSlot: () => import('./other/slot/index.vue'),
		iframeWeb: () => import('./other/iframe/index.vue'),
		propertySelect: () => import('./other/inquiry/property-select.vue'),
		propertySwitch: () => import('./other/inquiry/property-switch.vue'),
		keywordInput: () => import('./other/inquiry/keyword-input.vue'),
		floatForm: () => import('./other/inquiry/float-form.vue'),
		baiduMap: () => import('./other/baidu-map.vue'),
		slotTable: () => import('./other/slot-table.vue'),
		menuList: () => import('./other/menu.vue'),
		combination: () => import('./other/combination/index.vue'),
		marquee: () => import('./other/marquee'),
		numberDisplay: () => import('./other/number-display'),
		ratioBar: () => import('./other/ratio-bar.vue'),
	}

	export default {
		props: {
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
				querying: false,
				queryFailed: false,
				replayAnimation: false,
				ready: false,
				animationClass: null,
				animationStyle: 'opacity: 0',
				componentList
			}
		},
		computed: {
			currentComponent() {
				return this.componentList[cssStyle2DomStyle(this.type)]
			},
			animation() {
				return this.config.animation || {}
			},
			animationEnabled() {
				return this.animation.transitionEnable
			}
		},
		methods: {
			getEChartsConfigParseMap() {
				return this.$refs.widgets.getEChartsConfigParseMap()
			},
			beforeEnter(el, animation) {
				el.style.animationDuration = ` ${animation.duration}ms`
				el.style.animationDelay = `${animation.delay}ms`
			},
			handleAnimationEnd() {
				this.$debug('component', '动画结束')
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
				this.$debug('component', '动画开始')
			},
			removeAnimation() {
				this.animationClass = null
				this.animationStyle = null
				this.$debug('component', '移除动画')
			}
		},
		watch: {
			animation: {
				handler: function (value) {
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
			if (store.custom.components) {
				for (let key in store.custom.components) {
					this.$set(componentList, cssStyle2DomStyle(key), store.custom.components[key])
				}
			}
			this.$debug('component', '加载当前组件')
			this.$el.addEventListener('animationend', this.handleAnimationEnd)
		},
		beforeDestroy() {
			this.$el.removeEventListener('animationend', this.handleAnimationEnd)
		}
	}
</script>
