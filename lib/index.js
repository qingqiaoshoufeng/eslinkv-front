import New from './views/New'
import Edit from './views/Edit'
import Detail from './views/Detail'
import Full from './views/Full'
import Local from './views/Local'
import Preview from './views/preview'
import styleParser from './views/core/widgets/parts/lib/style-parser'
import widgetMixin from './views/core/widgets/parts/lib/widget-mixin'
import {findComponentUpward} from './utils'
import {
    getInput,
    getInputNumber,
    getSelect,
    getArrayGroup,
    getColors,
    getAnimationCurve,
    getBooleanInput, getBackground, getColor, getFile
} from './views/core/widgets/parts/lib/config-tools'
import './api'

Vue.component('pre-view', Preview)

const previewComponent = {
    name: 'dvdp-preview',
    functional: true,
    render: (h, ctx) => {
        let parent = findComponentUpward(ctx.parent, 'New')
        let type = 'new'
        if (!parent) {
            parent = findComponentUpward(ctx.parent, 'Edit')
            type = 'edit'
        }
        return h('pre-view', {
            props: {
                data: type === 'new' ? ctx.parent.$attrs.data : ctx.parent.$route.params.data,
            },
            on: {
                close() {
                    parent.previewBack()
                }
            }
        })
    }
}
const dvdp = {local: Local, new: New, edit: Edit, full: Full, detail: Detail, preview: previewComponent}
export default dvdp
export {
    styleParser,
    widgetMixin,
    getInput,
    getInputNumber,
    getSelect,
    getArrayGroup,
    getColors,
    getAnimationCurve,
    getBooleanInput,
    getBackground, getColor, getFile
}
