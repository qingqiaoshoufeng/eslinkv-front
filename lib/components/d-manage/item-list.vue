<template lang="pug">
	div
		template(v-for="child in list")
			component(:key="child" :is="currentComponent[child]" v-if="item.changeList.indexOf(child)!==-1")
		//input(v-model="store.kanboard.widgetAdded[store.kanboard.chooseId]&&store.kanboard.widgetAdded[store.kanboard.chooseId].config.api.data")
</template>
<script lang="ts">
	import {Component, Vue, Prop} from 'vue-property-decorator'

	@Component
	export default class extends Vue {
		@Prop(Array) list: array[]

		store: any = window.GoldChart.store
		currentComponent: any = {}

		get item(){
			if (this.store.kanboard.widgetAdded[this.store.kanboard.chooseId]) {
				return this.store.kanboard.widgetAdded[this.store.kanboard.chooseId]
			} else {
				return {changeList: []}
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
