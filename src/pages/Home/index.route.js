export default {
	path: '/',
	name: 'home',
	mode: [],
	meta: {
		requireAuth: false,
	},
	redirect: '/editor/Manger',
	component: () => import('./index.vue'),
}
