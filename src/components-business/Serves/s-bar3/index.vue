<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="legend-box">
			<div class="unit">{{config.config.unit}}</div>
			<div class="legend">
				<div class="legend1">
					<div class="bgc1" :style="`backgroundColor:${config.config.color1};}`"></div>
					<div class="desc1">{{config.config.desc1}}</div>
				</div>
				<div class="legend2">
					<div class="bgc2" :style="`backgroundColor:${config.config.color2};}`"></div>
					<div class="desc2">{{config.config.desc2}}</div>
				</div>
				<div class="legend2">
					<div class="bgc3" :style="`backgroundColor:${config.config.color3};}`"></div>
					<div class="desc3">{{config.config.desc3}}</div>
				</div>
			</div>
		</div>
		<div class="h-line-1" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data, this.config.config))
			},
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val};
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							);
							this.setOption(data);
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.h-line-1 {
		height: 100%;
	}

	.legend-box {
		width: 100%;
		height: 20px;
		display: flex;
		align-items: center;
		position: absolute;
		top: 10px;
		left: 0;

		.unit {
			width: 30px;
			text-align: right;
			color: #fff;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0;
		}

		.legend {
			display: flex;
			position: absolute;
			left: 0;
			width: 100%;
			align-items: center;
			justify-content: center;

			.legend1, .legend2 {
				display: flex;
				align-items: center;
				margin-left: 20px;
			}

			.bgc1, .bgc2, .bgc3 {
				width: 16px;
				height: 8px;
			}

			.desc1, .desc2, .desc3 {
				margin-left: 5px;
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: 16px;
				letter-spacing: 0;
				color: #fff;
			}
		}

	}
</style>

