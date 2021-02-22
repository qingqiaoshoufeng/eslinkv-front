import New from './views/New'
import Edit from './views/Edit'
import Detail from './views/Detail'
import Full from './views/Full'
import Local from './views/Local'
import Preview from './views/Preview'
import styleParser from './views/core/widgets/parts/lib/style-parser'
import widgetMixin from './views/core/widgets/parts/lib/widget-mixin'

import './api'

const getInput = () => {
}
const getInputNumber = () => {
}
const getSelect = () => {
}
const getArrayGroup = () => {
}
const getColors = () => {
}
const getAnimationCurve = () => {
}
const getBooleanInput = () => {
}
const getBackground = () => {
}
const getColor = () => {
}
const getFile = () => {
}
const dvdp = {local: Local, new: New, edit: Edit, full: Full, detail: Detail, preview: Preview}
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
