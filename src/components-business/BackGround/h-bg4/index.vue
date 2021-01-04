<template>
	<div class="widget-part" :style="`${styles};top:0;}`"></div>
</template>
<script>
	import mixins from '../../mixins'
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
    background: url("./img/activity-service-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }

</style>

