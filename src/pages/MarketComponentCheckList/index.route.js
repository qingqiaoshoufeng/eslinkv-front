export default {
	path: '/market/componentCheckList',
	name: 'marketComponentCheckList',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
