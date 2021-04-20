export default {
	path: '/template',
	name: 'template',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
