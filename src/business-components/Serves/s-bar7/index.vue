<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="main">
      <div class="chart" :id="id"/>
      <div class="percent">
        <div class="percent-item" v-for="k in 24" :key="k"></div>
      </div>
      <div class="legend">
        <div class="legend-item">
          <div class="color"></div>
          <div class="label">计划销气</div>
          <div class="num">679</div>
        </div>
        <div class="legend-item">
          <div class="color"></div>
          <div class="label">实际销气</div>
          <div class="num">421</div>
        </div>
        <div class="legend-item">
          <div class="color"></div>
          <div class="label">计划完成率</div>
          <div class="num">76%</div>
        </div>
      </div>
      <div class="rates"></div>
    </div>
    <p class="date"></p>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';
	import {getInput} from "@lib";

	const config = {
		animation: true
	};
	const value = {
		api: {
			data: JSON.stringify({
        list: [
          {
            name: '2020.06',
            plan: 100,
            actual: 66,
            percent: 66,
            rate1: 5,
            rate2: 6,
          },
          {
            name: '2020.07',
            plan: 110,
            actual: 88,
            percent: 88,
            rate1: 5,
            rate2: 6,
          },
          {
            name: '2020.08',
            plan: 156,
            actual: 69,
            percent: 69,
            rate1: 5,
            rate2: 6,
          },
          {
            name: '2020.09',
            plan: 123,
            actual: 55,
            percent: 55,
            rate1: 5,
            rate2: 6,
          },
          {
            name: '2020.10',
            plan: 88,
            actual: 36,
            percent: 36,
            rate1: 5,
            rate2: 6,
          },
          {
            name: '2020.11',
            plan: 99,
            actual: 28,
            percent: 28,
            rate1: 5,
            rate2: 6,
          },
        ]
      })
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data.list))
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
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
  .main {
  display: flex;
  align-items: center;
}
	.chart {
		width: 90px;
		height: 142px;
		position: relative;
	}
  .percent {
    width: 24px;
    height: 142px;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 16px 0 12px;
    .percent-item {
      width: 16px;
      height: 4px;
      background: #00FFCF;
      &+.percent-item {
        margin-top: 2px;
      }
    }
  }
  .legend {
    .legend-item{
      .color {
        width: 16px;
        height: 16px;
        background: #0057A9;
      }
    }
  }
</style>

