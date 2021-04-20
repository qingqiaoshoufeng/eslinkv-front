export default {
	path: '/editor/Manger',
	name: 'editorManger',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
