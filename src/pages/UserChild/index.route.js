export default {
	path: '/userChild',
	name: 'userChild',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
