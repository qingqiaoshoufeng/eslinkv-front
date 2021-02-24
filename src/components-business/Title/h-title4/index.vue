<template lang="pug">
	.widget-part(:style="styles")
		.h-title-4.text-center
			h2.font-num {{data&&data.value.toLocaleString()}}
			p {{config.config&&config.config.title}}
</template>
<script>
	import mx from '../../../../lib/mixins'
	import {Component} from 'vue-property-decorator'
	import {mixins} from 'vue-class-component'
    import {config, configSource, value} from './index.component'

	@Component
	class HTitle4 extends mixins(mx) {
		created() {
			this.configValue = this.parseConfigValue(value)
		}
	}
	export default HTitle4
</script>
<style lang="scss">
	.h-title-4 {
		h2 {
			font-size: 40px;
			line-height: 48px;
			color: #FFFFFF;
		}

		p {
			font-size: 18px;
			line-height: 24px;
			color: #00DDFF;
		}
	}

</style>

