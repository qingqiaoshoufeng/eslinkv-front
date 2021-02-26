<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
    <div class="legend">
      <div class="legend-item">
        <div class="color border" :style="{borderColor: config.config.color1}"></div>
        <div class="label">{{ config.config.desc1 }}</div>
      </div>
      <div class="legend-item">
        <div class="color" :style="{backgroundColor: config.config.color2}"></div>
        <div class="label">{{ config.config.desc2 }}</div>
      </div>
      <div class="legend-item">
        <div class="color" :style="{backgroundColor: config.config.color3}"></div>
        <div class="label">{{ config.config.desc3 }}</div>
      </div>
    </div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins';
	import getOption from './options';
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data, this.config.config))
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption()
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configValue = this.parseConfigValue(value, customConfig);
		},
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
		position: relative;
	}
  .legend {
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .legend-item {
      display: flex;
      align-items: center;
      margin-left: 16px;
      .color {
        width: 16px;
        height: 8px;
        &.border {
          border: 1px solid #ccc;
        }
      }
      .label {
        font-size: 16px;
        margin-left: 4px;
        color: #FFFFFF;
      }
    }
  }
</style>

