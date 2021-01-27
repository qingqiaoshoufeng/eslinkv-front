<template lang="pug">
	div
		template(v-for="(child, i) in list")
			component(:key="i" :is="currentComponent[child.type]" :config="child")
</template>
<script lang="ts">
	import {Component, Vue, Prop} from 'vue-property-decorator'

	@Component
	export default class DManageItemList extends Vue {
		@Prop(Array) list: any[]

		store: any = window.GoldChart.store
		currentComponent: any = {}

		get item(){
			if (this.store.kanboard.widgetAdded[this.store.kanboard.chooseId]) {
				return this.store.kanboard.widgetAdded[this.store.kanboard.chooseId]
			} else {
				return {}
			}
		}
		
		mounted() {
			const components = require.context(`../../components-func`, true, /\.(vue)$/)
			components.keys().forEach(child => {
				const name = child.split('/')[1].replace('.vue', '')
				this.currentComponent[name] = components(child).default
			})
		}
	}
</script>
