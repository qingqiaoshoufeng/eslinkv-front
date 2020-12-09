<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div v-for="(k, i) in data" class="item" :key="i">
			<img :src="k.icon">
			<div class="gas-main">
				<div class="gas-info">
					<div class="gas-title">{{ k.name }}</div>
          <div class="gas-percent font-num">{{ (k.percent * 100).toFixed(2) }}%</div>
					<div class="gas-num font-num"><em>{{ k.value / 10000 | toThousand }}</em> {{ config.config.unit }}
					</div>
				</div>
				<div class="gas-progress">
					<div class="progress" :style="{width: k.percent*100 + '%'}"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				unit: getInput('unit', '单位'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			unit: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					value: 1233556,
					percent: 60,
					name: '居民户',
					icon: '/static/images/home/gas-use1.svg',
				},
				{
					value: 69999,
					percent: 30,
					name: '公建户',
					icon: '/static/images/home/gas-use2.svg',
				},
				{
					value: 45332,
					percent: 20,
					name: '工业户',
					icon: '/static/images/home/gas-use3.svg',
				}
			])
		},
		config: {
			unit: '万m³',
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
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
			justify-content: space-between;
			align-items: center;

			.gas-title {
				font-size: 24px;
				line-height: 24px;
				color: #fff;
			}

      .gas-percent {
        font-weight: bold;
        font-size: 32px;
        line-height: 32px;
        color: #FFFFFF;
        margin-left: 16px;
        flex: 1;
        text-align: left;
      }

			.gas-num {
				font-size: 18px;
				line-height: 24px;
				color: #FFFFFF;

				em {
					font-weight: bold;
					font-size: 32px;
					line-height: 32px;
					font-style: normal;
				}
			}
		}
	}

	.gas-progress {
		height: 16px;
		background: #0057A9;
		padding: 4px 4px;
		margin-top: 10px;

		.progress {
			width: 260px;
			height: 8px;
			background: #00FFCF;
		}
	}
</style>

