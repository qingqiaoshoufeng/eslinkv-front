<template lang="pug">
.widget-part(:style="styles")
	.fn-flex.flex-column.h-title-2
		h2 {{ data && data.value }}
		p {{ config.config && config.config.title }}
</template>
<script lang="ts">
import { widgetMixin } from 'eslinkv-sdk'
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { value, customConfig } from './index.component'

@Component
class HTitle2 extends mixins(widgetMixin) {
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	}
}

export default HTitle2
</script>
<style lang="scss">
.h-title-2 {
	align-items: center;
	justify-content: center;
	height: 100%;
	background-image: url('/static/icons/h-title2-1.svg');
	background-repeat: no-repeat;
	background-size: 100%;

	h2 {
		font-size: 40px;
		font-weight: bold;
		line-height: 40px;
		color: #fff;
		text-shadow: 0 0 6px #0df;
	}

	p {
		margin-top: 12.4px;
		font-size: 16px;
		line-height: 16px;
		color: #fff;
	}
}
</style>
