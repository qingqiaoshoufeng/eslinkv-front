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
import {store, mutations} from './store'

Vue.component('new', New)
Vue.component('pre-view', Preview)

const edit = {
	name: 'dvdp-edit',
	functional: true,
	render: (h) => {
		return h('new')
	}
}
const preview = {
	name: 'dvdp-preview',
	functional: true,
	render: (h, ctx) => {
		const parent = findComponentUpward(ctx.parent, 'New')
		return h('pre-view', {
			props: {
				data: ctx.parent.$attrs.data,
			},
			on: {
				close() {
					parent.previewBack()
				}
			}
		})
	}
}
const dvdp = {edit, preview}
export default dvdp
export {
	store,
	mutations,
	styleParser,
	widgetMixin,
	getInput,
	getInputNumber,
	getSelect,
	getColors,
	getAnimationCurve,
	getBooleanInput
}
