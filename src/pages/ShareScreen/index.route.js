export default {
	path: '/shareScreen/:shareScreenId',
	name: 'shareScreen',
	mode: ['SIMPLE_PLATFORM'],
	component: () => import('./index.vue'),
}
