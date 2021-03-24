<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="h-des-1 fn-flex flex-row">
			<div class="fn-flex">
				<img :src="config.config.img" alt=""/>
			</div>
			<p class="pos-r text-left">{{ config.config.title }}</p>
			<h2 class="font-num">{{ data.value |toThousand }}</h2>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.h-des-1 {
		align-items: center;
		height: 100%;
		background: linear-gradient(90deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0) 100%);

		> div {
			align-items: center;
			justify-content: center;
			width: 56px;
			height: 56px;
			margin-right: 16px;
			background: rgba(0, 87, 169, 0.5);
		}

		p {
			font-size: 20px;
			line-height: 24px;
			color: #fff;
		}

		h2 {
			margin-right: 8px;
			margin-left: auto;
			font-size: 24px;
			line-height: 24px;
			color: #fff;
			text-align: right;
		}
	}
</style>
