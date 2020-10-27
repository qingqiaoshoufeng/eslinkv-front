<template>
	<div class="widget-part" :style="styles">
		{{data}}
	</div>
</template>
<script>
	import {styleParser, widgetMixin} from '../../../../lib'

	export default {
		mixins: [widgetMixin],
		data() {
			return {
				barName: Date.now().toString(36)
			}
		},
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout, this.time)
			},
			mergedConfig() {
				if (!this.config.config) return false
				return {...this.config.config}
			}
		},
		created() {
			this.configSource = this.parseConfigSource({api: true})
			this.configValue = this.parseConfigValue({api: true}, {api: {params: {test: 111}}})
		}
	}
</script>
