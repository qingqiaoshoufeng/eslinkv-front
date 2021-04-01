<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="item" v-for="(k, i) in data.list" :key="i">
			<div class="num font-num">{{ k.percent }}%</div>
			<div class="bar-wrap">
				<div class="bar" :style="{top: `${100 - k.percent}%`}"></div>
			</div>
			<p class="txt">{{ k.txt }}</p>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item {
			.num {
				margin-bottom: 8px;
				font-size: 24px;
				font-weight: bold;
				line-height: 24px;
				color: #fff;
			}

			.bar-wrap {
				position: relative;
				width: 16px;
				height: 136px;
				margin: 0 auto;
				background: #0057a9;

				.bar {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					background: #0df;
				}
			}

			.txt {
				margin-top: 8px;
				font-size: 16px;
				line-height: 16px;
				color: #0df;
			}
		}
	}
</style>

