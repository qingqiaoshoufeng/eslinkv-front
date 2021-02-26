<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="num font-num">{{ data&&data.value |toThousand }}</div>
		<div class="txt">{{ config.config&&config.config.desc }}</div>
		<div class="flex">
			<div>
				<div class="percent font-num">{{ data.percent }}%</div>
				<div class="percent-txt">{{ config.config&&config.config.desc2 }}</div>
			</div>
			<div class="chart" :id="id" :style="{ backgroundImage: `url(${config.config&&config.config.logo})` }"></div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins';
	import getOption from "./options";
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption()
						})
					}
				},
				deep: true,
				immediate: true,
			}
		},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data.percent))
			}
		},
		created() {
			this.configValue = this.parseConfigValue(value, customConfig);
		},
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		background: linear-gradient(360deg, rgba(255, 255, 255, 0.1) -2.01%, rgba(255, 255, 255, 0) 100%);
		padding: 16px;

		.num {
			text-align: left;
			font-weight: bold;
			font-size: 32px;
			line-height: 32px;
			margin-bottom: 8px;
			color: #FEFFFF;
		}

		.txt {
			text-align: left;
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
			margin-bottom: 12px;
		}

		.flex {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.percent {
				font-weight: bold;
				font-size: 24px;
				line-height: 24px;
				color: #00FFCF;
				margin-bottom: 8px;
			}

			.percent-txt {
				font-size: 18px;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.75);
			}

			.chart {
				width: 64px;
				height: 64px;
				background: no-repeat center;
			}
		}
	}
</style>

