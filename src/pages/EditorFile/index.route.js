export default {
	path: '/file/:file',
	name: 'editorFull',
	mode: ['SIMPLE_PLATFORM'],
	component: () => import('./index.vue'),
}
