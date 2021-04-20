export default {
	path: '/changeLog',
	name: 'changeLog',
	mode: [],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
