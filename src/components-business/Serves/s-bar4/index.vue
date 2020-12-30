<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="legend">
			<div class="legend-item">
				<div class="legend-color color1"></div>
				<div class="legend-txt">今日</div>
			</div>
			<div class="legend-item">
				<div class="legend-color color2"></div>
				<div class="legend-txt">昨日</div>
			</div>
			<div class="legend-item">
				<div class="legend-color color3"></div>
				<div class="legend-txt">前日</div>
			</div>
		</div>
		<div class="chart" :id="id" @click="clickHandle"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';

	const config = {
		animation: true
	};
	const value = {
		api: {
			data: JSON.stringify([
        {
          x: '采暖锅炉',
          y1: 66,
          y2: 100,
          y3: 888
        },
        {
          x: '集中供热',
          y1: 150,
          y2: 150,
          y3: 34
        },
        {
          x: '工业(生产)',
          y1: 356,
          y2: 3,
          y3: 580
        },
        {
          x: '工业(辐射采暖)',
          y1: 850,
          y2: 85,
          y3: 656
        },
        {
          x: '商业',
          y1: 456,
          y2: 100,
          y3: 777
        },
        {
          x: '福利(学校)',
          y1: 145,
          y2: 655,
          y3: 651
        },
        {
          x: '福利(医院)',
          y1: 222,
          y2: 362,
          y3: 741
        },
        {
          x: '福利(幼儿园)',
          y1: 33,
          y2: 522,
          y3: 333
        },
        {
          x: '福利(养老福利机构)',
          y1: 156,
          y2: 100,
          y3: 566
        },
        {
          x: '福利(其他)',
          y1: 166,
          y2: 266,
          y3: 366
        },
        {
          x: '煤改气',
          y1: 258,
          y2: 369,
          y3: 147
        },
      ])
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			clickHandle() {
				window.GoldChart.scene.createSceneInstance('qdj532f41re')
			},
			setOption(data) {
				if (this.instance) {
					this.instance.setOption(getOption(this.data))
					this.instance.off('click', this.barClick)
					this.instance.on('click', this.barClick)
				}
			},
			barClick(param) {
				console.log(param)
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id));
							this.setOption();
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}

	.legend {
		display: flex;
		align-items: center;
		padding-left: 174px;

		.legend-item {
			display: flex;
			align-items: center;
			margin-right: 16px;

			.legend-color {
				width: 16px;
				height: 8px;
				margin-right: 4px;

				&.color1 {
					background: #FB5325;
				}

				&.color2 {
					background: #017CEF;
				}

				&.color3 {
					background: #01FDD2;
				}
			}

			.legend-txt {
				font-size: 16px;
				line-height: 16px;
				color: #FFFFFF;
			}
		}
	}

</style>

