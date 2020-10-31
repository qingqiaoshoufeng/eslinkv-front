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
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValueCustom(localConfigValue)
		}
	}
</script>
