export default {
	path: '/collection/componentList',
	name: 'collectionComponentList',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
