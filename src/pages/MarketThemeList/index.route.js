export default {
	path: '/market/themeList',
	name: 'markeTthemeList',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
