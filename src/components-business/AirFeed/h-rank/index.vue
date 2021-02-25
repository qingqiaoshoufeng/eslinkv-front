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
	import mixins from '../../../../lib/mixins'
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
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
		font-size: 18px;
		line-height: 24px;
		color: #FFFFFF;
		margin-bottom: 10px;

		.flex {
			display: flex;

			.rank {
				width: 24px;
				height: 24px;
				background: rgba(255, 255, 255, 0.2);
				font-weight: bold;
				color: #FFFFFF;
				margin-right: 8px;
			}

			.num {
				font-weight: bold;
				font-size: 24px;
				color: #00DDFF;
				margin-right: 8px;
			}
		}

		&:nth-child(1) .rank {
			background: #FF7217 !important;
		}

		&:nth-child(2) .rank {
			background: #0057A9 !important;
		}

		&:nth-child(3) .rank {
			background: #0057A9 !important;
		}
	}
</style>

