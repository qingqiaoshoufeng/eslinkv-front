<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul>
			<li class="item" v-for="(k, i) in data">
				<div class="flex">
					<div class="rank font-num">{{ i + 1 }}</div>
					<div class="title">{{ k.name }}</div>
				</div>
				<div class="flex">
					<div class="num font-num">{{ k.value }}</div>
					<div class="unit">{{ config.config.unit }}</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
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
	justify-content: space-between;
	margin-bottom: 10px;
	font-size: 18px;
	line-height: 24px;
	color: #fff;

	.flex {
		display: flex;

		.rank {
			width: 24px;
			height: 24px;
			margin-right: 8px;
			font-weight: bold;
			color: #fff;
			background: rgba(255, 255, 255, 0.2);
		}

		.num {
			margin-right: 8px;
			font-size: 24px;
			font-weight: bold;
			color: #0df;
		}
	}

	&:nth-child(1) .rank {
		background: #ff7217 !important;
	}

	&:nth-child(2) .rank {
		background: #0057a9 !important;
	}

	&:nth-child(3) .rank {
		background: #0057a9 !important;
	}
}
</style>
