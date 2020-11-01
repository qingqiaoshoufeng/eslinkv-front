<template>
	<div class="widget-part" :style="styles">
		{{data&&data.title}}
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {}
	const value = {
		api: {
			data: JSON.stringify({title: 'hello world'})
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
