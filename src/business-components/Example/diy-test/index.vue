<template>
	<div class="widget-part" :style="styles">
		hello world
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
		mounted() {
		},
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue()
		}
	}
</script>
