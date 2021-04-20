export default {
	path: '/full/:id',
	name: 'editorFull',
	mode: ['SIMPLE_PLATFORM'],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
