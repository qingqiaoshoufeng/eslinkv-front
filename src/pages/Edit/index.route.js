export default {
	path: '/edit/:id',
	name: 'edit',
	mode: [],
	component: () => import('./index.vue'),
	children: [
		{
			path: '/edit/:kanboardId/preview',
			name: 'big-data-edit-preview',
			component: () => import('../Preview'),
		}
	]
}
