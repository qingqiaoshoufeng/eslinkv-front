export default {
	path: '/file/:file',
	name: 'editorFull',
	mode: ['SIMPLE_PLATFORM'],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
