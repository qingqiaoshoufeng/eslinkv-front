<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="row">
			<div class="title">公司</div>
			<div class="item">服务发展</div>
			<div class="item">管网输配</div>
			<div class="item">杭州滨江</div>
		</div>
		<div class="row">
			<div class="title">出车</div>
			<div class="item chart">
				<ring class="ring" back-color="rgba(229, 97, 91, 0.3)" color="#E5615B" :percent="data.start1"></ring>
				<span>{{ data.start1 }}%</span>
			</div>
			<div class="item chart">
				<ring class="ring" back-color="rgba(229, 97, 91, 0.3)" color="#E5615B" :percent="data.start2"></ring>
				<span>{{ data.start2 }}%</span>
			</div>
			<div class="item chart">
				<ring class="ring" back-color="rgba(229, 97, 91, 0.3)" color="#E5615B" :percent="data.start3"></ring>
				<span>{{ data.start3 }}%</span>
			</div>
		</div>
		<div class="row">
			<div class="title">到达</div>
			<div class="item chart">
				<ring class="ring" back-color="#0057A9" color="#00FFCF" :percent="data.end1"></ring>
				<span>{{ data.end1 }}%</span>
			</div>
			<div class="item chart">
				<ring class="ring" back-color="#0057A9" color="#00FFCF" :percent="data.end2"></ring>
				<span>{{ data.end2 }}%</span>
			</div>
			<div class="item chart">
				<ring class="ring" back-color="#0057A9" color="#00FFCF" :percent="data.end3"></ring>
				<span>{{ data.end3 }}%</span>
			</div>
		</div>
		<div class="legend">
			<div class="legend-item">
				<div class="color"></div>
				<div class="label">近7日3分钟出车率</div>
			</div>
			<div class="legend-item">
				<div class="color green"></div>
				<div class="label">近7日30分钟到达率</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import Ring from '@/components/Ring/ring'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		components: {Ring},
		created() {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		.row {
			display: flex;
			margin-bottom: 8px;

			.title {
				width: 24px;
				height: 48px;
				background: #0057A9;
				font-size: 18px;
				line-height: 20px;
				color: #FFFFFF;
			}

			.item {
				width: 138px;
				height: 48px;
				background: rgba(0, 87, 169, 0.5);
				font-size: 18px;
				color: #FFFFFF;
				margin-right: 8px;
				display: flex;
				align-items: center;
				justify-content: center;

				&.chart {
					background: rgba(255, 255, 255, 0.1);
				}

				.ring {
					width: 30px;
					height: 30px;
					margin-right: 10px;
				}

				> span {
					font-family: font-num;
					font-weight: bold;
					font-size: 24px;
					line-height: 24px;
					color: #FFFFFF;
				}
			}
		}

		.legend {
			display: flex;
			align-items: center;
			margin-top: 8px;
			padding-left: 40px;

			.legend-item {
				display: flex;
				align-items: center;
				margin-right: 32px;

				.color {
					width: 12px;
					height: 12px;
					background: transparent;
					border-radius: 50%;
					border: 3px solid #E5615B;
					margin-right: 10px;

					&.green {
						border-color: #00FFCF;
					}
				}

				.label {
					font-size: 18px;
					color: #FFFFFF;
				}
			}
		}
	}
</style>

