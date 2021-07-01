export default {
	path: '/collection/componentType',
	name: 'collectionComponentType',
	mode: [],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
