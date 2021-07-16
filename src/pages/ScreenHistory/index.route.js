export default {
	path: '/screenHistory/:id',
	name: 'ScreenHistory',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
