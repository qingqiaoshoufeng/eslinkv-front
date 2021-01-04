<template lang="pug">
	.widget-part(:style="styles")
		.h-title-5
			p.pos-r.text-left {{data&&data.title}}
</template>
<script>
	import mx from '../../mixins'
	import {Component} from 'vue-property-decorator'
	import {mixins} from 'vue-class-component'
    import {config, value} from './index.component'

	@Component
	class HTitle5 extends mixins(mx) {
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
	export default HTitle5
</script>
<style lang="scss">
	.h-title-5 {

		p {
			font-weight: 600;
			font-size: 32px;
			line-height: 32px;
			color: #fff;
			padding-bottom: 16px;
			border-bottom: 2px solid rgba(255, 255, 255, 0.4);

			&:before, &:after {
				position: absolute;
				content: '';
				width: 48px;
				height: 2px;
				background: #00DDFF;
				bottom: 0;
			}

			&:before {
				left: 0;
			}

			&:after {
				right: 0;
			}
		}
	}

</style>

