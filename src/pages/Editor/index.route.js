export default {
	path: '/editor/manger/:id',
	name: 'editorEdit',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
