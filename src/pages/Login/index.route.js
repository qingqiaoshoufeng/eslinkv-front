export default {
	path: '/login',
	name: 'login',
	mode: [],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
