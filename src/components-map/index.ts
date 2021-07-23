import { Editor } from '@eslinkv/core'
const editor = Editor.Instance()
const component = require.context('../components-map', true, /index\.(vue)$/)
const avatar = require.context(
	'../components-map',
	true,
	/snapshot\.(jpg|png)$/,
)
const conf = require.context('../components-map', true, /\.(component.ts)$/)

editor.localInit({ name: '杭图', component, avatar, conf })
