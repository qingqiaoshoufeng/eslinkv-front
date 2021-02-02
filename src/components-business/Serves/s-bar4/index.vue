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
	import {config, value} from './index.component'
	import scene from '../../../../lib/store/scene.store'

	export default {
		mixins: [mixins],
		methods: {
			clickHandle() {
				scene.actions.createSceneInstance('qdj532f41re')
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

