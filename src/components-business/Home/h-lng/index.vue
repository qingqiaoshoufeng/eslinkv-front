<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="kuo"></div>
		<div class="list">
			<div class="item">
				<h3>{{ config.config.desc1 }}</h3>
				<p class="font-num">{{ data.value1 | toThousand }}</p>
			</div>
			<div class="item">
				<h3>{{ config.config.desc2 }}</h3>
				<p class="font-num">{{ data.value2 | toThousand }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import mixins from 'eslinkv-npm/mixins'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		.kuo {
			width: 185px;
			height: 32px;
			margin: 0 auto;
			background: url("./img/kuohao.svg") no-repeat;
			background-size: 100% 100%;
		}

		.list {
			display: flex;
			justify-content: space-between;

			.item {
				width: 178px;
				height: 80px;
				padding-top: 8px;
				background: rgba(0, 87, 169, 0.3);
				border-top: 1px solid #0df;

				> h3 {
					font-size: 20px;
					font-weight: normal;
					line-height: 24px;
					color: #0df;
				}

				> p {
					margin-top: 11px;
					font-size: 28px;
					font-weight: bold;
					line-height: 28px;
					color: #fff;
				}
			}
		}
	}
</style>

