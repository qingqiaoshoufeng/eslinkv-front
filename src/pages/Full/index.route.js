export default {
	path: '/full/:id',
	name: 'full',
	mode: ['SIMPLE_PLATFORM'],
	component: () => import('./index.vue'),
}
