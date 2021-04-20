export default {
	path: '/detail/:id',
	name: 'editorDetail',
	mode: ['SIMPLE_PLATFORM'],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
