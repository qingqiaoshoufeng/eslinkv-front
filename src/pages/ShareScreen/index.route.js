export default {
	path: '/shareScreen/:shareScreenId',
	name: 'shareScreen',
	mode: ['SIMPLE_PLATFORM'],
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
