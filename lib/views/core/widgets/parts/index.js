import border from './decoration/border'
import dateTime from './decoration/date-time'
import decoration from './decoration/decoration'
import aImage from './decoration/image'
import aSvg from './decoration/svg'
import lottie from './decoration/lottie'
import levelTitle from './decoration/title'
import multilineText from './decoration/multiline-text.vue'
import swiper from './decoration/swiper'
import activeRingChart from './dv-charts/active-ring-chart'
import barDvcharts from './dv-charts/bar'
import capsuleChart from './dv-charts/capsule-chart'
import conicalColumnChart from './dv-charts/conical-column-chart'
import digitalFlop from './dv-charts/digital-flop'
import flylineChart from './dv-charts/flyline-chart'
import gaugeDvcharts from './dv-charts/gauge'
import lineDvcharts from './dv-charts/line'
import percentPond from './dv-charts/percent-pond'
import pieDvcharts from './dv-charts/pie'
import radarDvcharts from './dv-charts/radar'
import scrollBoard from './dv-charts/scroll-board'
import scrollRankingBoard from './dv-charts/scroll-ranking-board'
import waterLevelPond from './dv-charts/water-level-pond'
import bar from './echarts/bar'
import lineChart from './echarts/line'
import pie from './echarts/pie'
import scatter from './echarts/scatter'
import radar from './echarts/radar'
import gauge from './echarts/gauge'
import effectScatter from './echarts/effectScatter'
import heatmap from './echarts/heatmap'
import funnel from './echarts/funnel'
import mapChart from './echarts/map'
import parallel from './echarts/parallel'
import sunburst from './echarts/sunburst'

import presetSlot from './other/slot/index.vue'
import iframeWeb from './other/iframe/index.vue'
import propertySelect from './other/inquiry/property-select.vue'
import propertySwitch from './other/inquiry/property-switch.vue'
import keywordInput from './other/inquiry/keyword-input.vue'
import floatForm from './other/inquiry/float-form.vue'
import baiduMap from './other/baidu-map.vue'
import slotTable from './other/slot-table.vue'
import menuList from './other/menu.vue'
import combination from './other/combination/index.vue'
import marquee from './other/marquee'
import numberDisplay from './other/number-display'
import ratioBar from './other/ratio-bar.vue'

import loadMask from '../../../../components/load-mask'

/**
 * @description
 *
 * todo
 *
 * component is xxx 按需引入模块
 * render ---> html 易读
 *
 */

export default {
	name: 'widgets',
	components: {
		activeRingChart,
		border,
		aImage,
		aSvg,
		lottie,
		capsuleChart,
		lineDvcharts,
		barDvcharts,
		pieDvcharts,
		gaugeDvcharts,
		radarDvcharts,
		conicalColumnChart,
		dateTime,
		decoration,
		digitalFlop,
		flylineChart,
		percentPond,
		scrollBoard,
		scrollRankingBoard,
		levelTitle,
		waterLevelPond,
		loadMask,
		presetSlot,
		iframeWeb,
		multilineText,
		marquee,
		ratioBar,
		swiper,
		propertySelect,
		propertySwitch,
		keywordInput,
		floatForm,
		baiduMap,
		slotTable,
		bar,
		lineChart,
		pie,
		scatter,
		numberDisplay,
		radar,
		gauge,
		effectScatter,
		heatmap,
		funnel,
		mapChart,
		parallel,
		sunburst,
		menuList,
		combination
	},
	inject: ['diyComponent'],
	props: {
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
			animationStyle: 'opacity: 0'
		}
	},
	computed: {
		statusChildren() {
			const h = this.$createElement
			const children = []
			this.querying && children.push(h('load-mask', {
				props: {
					text: '数据请求中…',
					iconSize: 36
				}
			}))
			this.queryFailed && children.push(h('load-mask', {
				props: {
					text: '数据加载失败！',
					iconSize: 0
				}
			}))
			return children
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
			this.replayAnimation = false
		},
		// type: 入场动画 or 出场动画
		setAnimation(type) {
			if (!this.animationEnabled) {
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
			setTimeout(() => {
				this.animationClass = `animate__animated ${animationClass}`
				this.animationStyle = `animation-duration: ${duration}ms; animation-delay: ${delay}ms`
				setTimeout(() => {
					this.removeAnimation()
					this.handleAnimationEnd()
				}, delay + duration + 16)
			}, 0)
		},
		removeAnimation() {
			this.animationClass = null
			this.animationStyle = null
		}
	},
	render: function (createElement) {
		const {type, config} = this
		if (!type) return null
		/**
		 * @description 由于可以自定义注入业务组件，所以取消判断
		 *
		 * if (!Object.values(this.$options.components).find(widget => widget.name === 'widget-' + type))
		 *
		 * 注册来自外部的组件
		 */
		if (this.diyComponent) {
			for (let key in this.diyComponent.components) {
				Vue.component(key, this.diyComponent.components[key])
			}
		}
		const {widget} = config
		const Widget = createElement(
			type,
			{
				'class': this.animationClass,
				attrs: {
					'widget-ref': widget && widget.id
				},
				style: this.animationStyle,
				props: {
					config,
					readonly: this.readonly,
					...this.$attrs
				},
				on: {
					'widget-config-update': data => this.$emit('widget-config-update', data),
					'query-start': () => {
						this.querying = true
					},
					'query-end': () => {
						this.querying = false
					},
					'query-failed': () => {
						this.queryFailed = true
					},
					'config-reset': () => this.$emit('config-reset'),
					ready: () => {
						this.ready = true
					},
					...this.$listeners
				},
				ref: 'widgets'
			},
			this.$slots ? [this.$slots.default] : null
		)
		return Widget
	},
	computed: {
		animation() {
			return this.config.animation || {}
		},
		animationEnabled() {
			return this.animation.transitionEnable
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
		this.$el.addEventListener('animationend', this.handleAnimationEnd)
	},
	beforeDestroy() {
		this.$el.removeEventListener('animationend', this.handleAnimationEnd)
	}
}
