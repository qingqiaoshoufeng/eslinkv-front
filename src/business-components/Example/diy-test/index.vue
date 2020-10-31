<template>
	<div class="widget-part" :style="styles">
		{{data&&data.title}}
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const localConfigValue = {
		api: {
			data: JSON.stringify({title: 'hello world'})
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource({api: true})
			this.configValue = this.parseConfigValue({api: true},localConfigValue)
		}
	}
</script>
