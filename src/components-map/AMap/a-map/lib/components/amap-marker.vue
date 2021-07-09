<script>
import registerMixin from '../mixins/register-component'
import { lngLatTo, pixelTo, toPixel } from '../utils/convert-helper'

import { compile, mountedVNode, mountedRenderFn } from '../utils/compile'
import Vue from 'vue'

const TAG = 'el-amap-marker'

export default {
	name: TAG,
	mixins: [registerMixin],
	inject: ['parentInfo'],
	props: [
		'routeData',
		'vid',
		'position',
		'anchor',
		'offset',
		'icon',
		'content',
		'topWhenClick',
		'bubble',
		'draggable',
		'raiseOnDrag',
		'cursor',
		'visible',
		'zIndex',
		'angle',
		'autoRotation',
		'animation',
		'shadow',
		'title',
		'clickable',
		'shape',
		'extData',
		'label',
		'events',
		'onceEvents',
		'template',
		'vnode',
		'contentRender',
	],
	data() {
		const self = this
		return {
			$tagName: TAG,
			withSlots: false,
			tmpVM: null,
			propsRedirect: {
				template: 'content',
				vnode: 'content',
				contentRender: 'content',
			},
			converters: {
				shape(options) {
					return new AMap.MarkerShape(options)
				},
				shadow(options) {
					return new AMap.Icon(options)
				},
				template(tpl) {
					const template = compile(tpl, self)
					this.$customContent = template
					return template.$el
				},
				vnode(vnode) {
					const _vNode =
						typeof vnode === 'function' ? vnode(self) : vnode
					const vNode = mountedVNode(_vNode)
					this.$customContent = vNode
					return vNode.$el
				},
				contentRender(renderFn) {
					const template = mountedRenderFn(renderFn, self)
					this.$customContent = template
					return template.$el
				},
				label(options) {
					const { content = '', offset = [0, 0] } = options
					return {
						content: content,
						offset: toPixel(offset),
					}
				},
			},
			handlers: {
				zIndex(index) {
					this.setzIndex(index)
				},
				visible(flag) {
					flag === false ? this.hide() : this.show()
          if (flag && self.routeData && self.routeData.length > 1) {
            self.startRouteAnimation()
          }
				},
				position(lnglat) {
					this.setPosition(new AMap.LngLat(lnglat.lng, lnglat.lat))
				},
			},
		}
	},
	created() {
		const scaleRatio = this.scaleRatio
		this.tmpVM = new Vue({
			data() {
				return { node: '' }
			},
			render(h) {
				const { node } = this
				return h(
					'div',
					{
						ref: 'node',
						style: `transform: scale(${scaleRatio});transform-origin:center center`,
					},
					Array.isArray(node) ? node : [node],
				)
			},
		}).$mount()
	},
	computed: {
		scaleRatio() {
			return (this.parentInfo && this.parentInfo.scaleRatio) || 1
		},
	},
	methods: {
		__initComponent(options) {
			const { scaleRatio, offset } = this
			if (this.$slots.default && this.$slots.default.length) {
				options.content = this.tmpVM.$refs.node
			}
			let compOffset = offset || [0, 0]
			const [offsetX, offsetY] = compOffset
			compOffset = toPixel(compOffset)
			this.$amapComponent = new AMap.Marker({
				...options,
				offset: compOffset,
			})
		},
    startRouteAnimation () {
      // 计算速度
      const totalDistance = AMap.GeometryUtil.distanceOfLine(
          this.routeData,
      )
      const speed = totalDistance / 1000 / (6 / 60 / 60)
      this.$amapComponent.moveAlong(this.routeData, speed)
    },
		$$getExtData() {
			return this.$amapComponent.getExtData()
		},

		$$getPosition() {
			return lngLatTo(this.$amapComponent.getPosition())
		},

		$$getOffset() {
			return pixelTo(this.$amapComponent.getOffset())
		},
	},
	render(h) {
		const slots = this.$slots.default || []
		if (slots.length) {
			this.tmpVM.node = slots
		}
		return null
	},
	destroyed() {
		this.tmpVM.$destroy()
		if (this.$customContent && this.$customContent.$destroy) {
			this.$customContent.$destroy()
		}
	},
}
</script>
