<template lang="pug">
	div
		template(v-for="(child, i) in list")
			component(:key="i" :is="currentComponent[child.type]" :config="child" v-if="filterComponent(child)")
		//input(v-model="store.kanboard.widgetAdded[store.kanboard.chooseId]&&store.kanboard.widgetAdded[store.kanboard.chooseId].config.api.data")
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
				return {changeList: []}
			}
		}
		
		filterComponent (obj) {
			return this.item.changeList.includes(obj.prop)
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
