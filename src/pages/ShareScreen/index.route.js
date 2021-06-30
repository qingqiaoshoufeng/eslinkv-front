export default {
	path: '/shareScreen/:shareScreenId',
	name: 'shareScreen',
	mode: ['SIMPLE_PLATFORM'],
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
