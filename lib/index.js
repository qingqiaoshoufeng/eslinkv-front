import New from './views/New'
import Preview from './views/preview'
import styleParser from './views/core/widgets/parts/lib/style-parser'
import widgetMixin from './views/core/widgets/parts/lib/widget-mixin'
import {findComponentUpward} from './utils'
import {
	getInput,
	getInputNumber,
	getSelect,
	getColors,
	getAnimationCurve,
	getBooleanInput
} from './views/core/widgets/parts/lib/config-tools'
import './api'

Vue.component('new', New)
Vue.component('pre-view', Preview)
const dvdp = function (obj) {
	this.diyComponent = obj
}
dvdp.prototype = {
	constructor: dvdp,
	edit: function () {
		const diyComponent = this.diyComponent
		return {
			name: 'dvdp-edit',
			functional: true,
			render: (h, ctx) => {
				return h('new', {
					props: {
						diyStep: 1,
						diyComponent
					}
				})
			}
		}
	},
	preview: function () {
		const diyComponent = this.diyComponent
		return {
			name: 'dvdp-preview',
			functional: true,
			render: (h, ctx) => {
				const parent = findComponentUpward(ctx.parent, 'New')
				return h('pre-view', {
					props: {
						diyStep: 1,
						data: ctx.parent.$attrs.data,
						diyComponent
					},
					on: {
						close() {
							parent.previewBack()
						}
					}
				})
			}
		}
	}
}
export default dvdp
export {styleParser, widgetMixin, getInput, getInputNumber, getSelect, getColors, getAnimationCurve, getBooleanInput}
