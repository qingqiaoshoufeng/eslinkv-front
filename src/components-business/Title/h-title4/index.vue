<template lang="pug">
	.widget-part(:style="styles")
		.h-title-4.text-center
			h2.font-num {{data&&data.value.toLocaleString()}}
			p {{config.config&&config.config.title}}
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { Component } from 'vue-property-decorator'
	import { mixins } from 'vue-class-component'
	import { customConfig, value } from './index.component'

	@Component
	class HTitle4 extends mixins(widgetMixin) {
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
	export default HTitle4
</script>
<style lang="scss">
	.h-title-4 {
		h2 {
			font-size: 40px;
			line-height: 48px;
			color: #fff;
		}

		p {
			font-size: 18px;
			line-height: 24px;
			color: #0df;
		}
	}

</style>

