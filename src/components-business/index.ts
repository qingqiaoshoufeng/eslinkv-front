const Editor = eslinkV.Editor
const editor = Editor.Instance()
const component = require.context(
	'../components-business',
	true,
	/index\.(vue)$/,
)
const avatar = require.context(
	'../components-business',
	true,
	/snapshot\.(jpg|png)$/,
)
const conf = require.context(
	'../components-business',
	true,
	/\.(component.ts)$/,
)

editor.localInit({ name: '杭组', component, avatar, conf })
