export default {
	path: '/secretKey',
	name: 'secretKey',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
