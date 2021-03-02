export default {
	path: '/detail/:id',
	name: 'detail',
	mode: ['SIMPLE_PLATFORM'],
	component: () => import('./index.vue'),
}
