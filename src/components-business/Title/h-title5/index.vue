<template lang="pug">
	.widget-part(:style="styles")
		.h-title-5
			p.pos-r.text-left {{data&&data.title}}
</template>
<script>
	import mx from 'eslinkv-npm/mixins'
	import { Component } from 'vue-property-decorator'
	import { mixins } from 'vue-class-component'
	import { value } from './index.component'

	@Component
	class HTitle5 extends mixins(mx) {
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
	export default HTitle5
</script>
<style lang="scss">
	.h-title-5 {
		p {
			padding-bottom: 16px;
			font-size: 32px;
			font-weight: 600;
			line-height: 32px;
			color: #fff;
			border-bottom: 2px solid rgba(255, 255, 255, 0.4);

			&::before,
			&::after {
				position: absolute;
				bottom: 0;
				width: 48px;
				height: 2px;
				content: '';
				background: #0df;
			}

			&::before {
				left: 0;
			}

			&::after {
				right: 0;
			}
		}
	}

</style>

