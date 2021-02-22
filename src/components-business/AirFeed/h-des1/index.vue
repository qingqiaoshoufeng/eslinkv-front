<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="h-des-1 fn-flex flex-row">
			<div class="fn-flex">
				<img :src="config.config.img" alt=""/>
			</div>
			<p class="pos-r text-left">{{config.config.title}}</p>
			<h2 class="font-num">{{data.value |toThousand}}</h2>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import { config, configSource, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-des-1 {
		background: linear-gradient(90deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0) 100%);
		height: 100%;
		align-items: center;

		> div {
			width: 56px;
			height: 56px;
			justify-content: center;
			align-items: center;
			margin-right: 16px;
      background: rgba(0, 87, 169, 0.5);
		}

		p {
			font-size: 20px;
			line-height: 24px;
			color: #fff;
		}

		h2 {
			font-size: 24px;
			line-height: 24px;
			text-align: right;
			color: #FFFFFF;
			margin-left: auto;
			margin-right: 8px;
		}
	}

</style>

