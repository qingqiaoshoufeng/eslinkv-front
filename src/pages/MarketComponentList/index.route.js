export default {
	path: '/market/componentList',
	name: 'marketComponentList',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
