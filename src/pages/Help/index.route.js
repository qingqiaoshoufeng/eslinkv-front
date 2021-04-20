export default {
	path: '/help/:name',
	name: 'help',
	mode: [],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
