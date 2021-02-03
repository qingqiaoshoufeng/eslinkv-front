import New from './views/New'
import Edit from './views/Edit'
import Detail from './views/Detail'
import Full from './views/Full'
import Local from './views/Local'
import styleParser from './views/core/widgets/parts/lib/style-parser'
import widgetMixin from './views/core/widgets/parts/lib/widget-mixin'
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

const dvdp = {local: Local, new: New, edit: Edit, full: Full, detail: Detail}
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
