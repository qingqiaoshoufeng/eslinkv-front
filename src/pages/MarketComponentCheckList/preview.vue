<template lang="pug">
	d-view
</template>
<script lang="ts">
	import {Component, Vue, Prop} from 'vue-property-decorator'
	import dView from 'eslinkv-npm/src/components/d-view/index.vue'
	import platform from 'eslinkv-npm/src/store/platform.store.js'
	import commonConfigValue from 'eslinkv-npm/common-config-value.js'
	import {configMerge} from 'eslinkv-npm/mixins'

	@Component({
		components: {
			dView
		}
	})
	export default class MarketPreview extends Vue {
		@Prop(Object) detail: object

		mounted() {
			if (Vue.options.components[`${this.detail.componentEnTitle}-${this.detail.componentVersion}`]) {
			} else {
				this.$api.bussiness.detailMarket({
					componentEnTitle: this.detail.componentEnTitle,
					componentVersion: this.detail.componentVersion
				}).then(res => {
					let script = document.createElement('script')
					script.onload = () => {
						const id = +new Date()
						const value = JSON.parse(this.detail.componentConfig)
						const config = configMerge(value, commonConfigValue())
						platform.state.widgetAdded = {
							[id]: {
								id,
								type: this.detail.componentEnTitle,
								config,
								scene: 0,
								market: true
							}
						}
					}
					script.src = res.componentJsUrl
					document.head.appendChild(script)
				})
			}
		}
	}
</script>
