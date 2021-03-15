export default {
	path: '/full/:id',
	name: 'editorFull',
	mode: ['SIMPLE_PLATFORM'],
	component: () => import('./index.vue')
}
