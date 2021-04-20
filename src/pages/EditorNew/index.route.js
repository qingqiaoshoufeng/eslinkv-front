export default {
	path: '/editor/new',
	name: 'editorNew',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
