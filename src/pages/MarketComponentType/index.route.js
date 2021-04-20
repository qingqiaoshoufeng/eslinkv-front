export default {
	path: '/market/componentType',
	name: 'marketComponentType',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
