<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div v-for="(k, i) in data" class="item" :key="i">
			<img :src="k.icon" />
			<div class="gas-main">
				<div class="gas-info">
					<div class="gas-title">{{ k.name }}</div>
					<div class="gas-percent font-num">
						{{ k.percent.toFixed(2) }}%
					</div>
					<div class="gas-num font-num">
						<em>{{ k.value | toThousand }}</em>
						{{ config.config.unit }}
					</div>
				</div>
				<div class="gas-progress">
					<div
						class="progress"
						:style="{ width: k.percent + '%' }"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss" scoped>
.item {
	display: flex;
	align-items: center;
	margin-bottom: 32px;

	> img {
		width: 56px;
		height: 56px;
		margin-right: 16px;
	}

	.gas-main {
		flex: 1;
	}

	.gas-info {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.gas-title {
			font-size: 24px;
			line-height: 24px;
			color: #fff;
		}

		.gas-percent {
			flex: 1;
			margin-left: 16px;
			font-size: 32px;
			font-weight: bold;
			line-height: 32px;
			color: #fff;
			text-align: left;
		}

		.gas-num {
			font-size: 18px;
			line-height: 24px;
			color: #fff;

			em {
				font-size: 32px;
				font-style: normal;
				font-weight: bold;
				line-height: 32px;
			}
		}
	}
}

.gas-progress {
	height: 16px;
	padding: 4px 4px;
	margin-top: 10px;
	background: #0057a9;

	.progress {
		width: 260px;
		height: 8px;
		background: #00ffcf;
	}
}
</style>
