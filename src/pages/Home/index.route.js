export default {
	path: '/',
	component: () => import('./index.vue'),
	children: [
		{
			path: '/new/preview',
			name: 'big-data-new-preview',
			component: () => import('../Preview'),
			props: true,
		}
	]
}
