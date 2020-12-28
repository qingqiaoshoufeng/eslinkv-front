<template>
	<div class="widget-part h-tabs-circle" :style="styles" v-if="data">
		<h-vertical-tabs
			class="h-tabs-circle__tabs"
			:source="tabSource"
			:defaultActived="tabActived"
			@actived-change="tabActivedChange"
		/>
    <pie class="chart-circle" v-if="tabActived === 2" :data="data.circle[tabActived]"></pie>
    <div class="chart-circle" ref="circle" v-else></div>
    <ul class="circle-legend">
      <li v-for="(k, i) in curr" :key="i">
        <div class="circle-legend-color"></div>
        <div class="circle-legend-name">{{ k.name }}</div>
        <div class="circle-legend-num"><span class="font-num">{{ k.count | toThousand }}</span>{{ k.unit }}</div>
        <div class="circle-legend-percent font-num">{{ k.percent }}%</div>
      </li>
    </ul>
	</div>
</template>

<script>
import mixins from '../../mixins';
import HCvs from './HCvs';
import HVerticalTabs from './HVerticalTabs';
import pie from './pie';
import { getCircleOption, getLineOption } from './options'

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
      circle: [
        [
          {
            name: '高压管道',
            percent: 20,
            count: 1231,
            circleStyle: '#FB592C',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '中压管道',
            percent: 30,
            count: 53453,
            circleStyle: '#18CEB9',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '低压管道',
            percent: 50,
            count: 321,
            circleStyle: '#2C99FF',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
        ],
        [
          {
            name: 'PE管',
            percent: 50,
            count: 321,
            circleStyle: '#FB592C',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '钢管',
            percent: 80,
            count: 321,
            circleStyle: '#18CEB9',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '镀锌管',
            percent: 40,
            count: 321,
            circleStyle: '#2C99FF',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          }
        ],
        [
          {
            name: 'DN700',
            percent: 20,
            count: 321,
            circleStyle: '#FB592C',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: 'DN500',
            percent: 60,
            count: 321,
            circleStyle: '#18CEB9',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: 'DN300',
            percent: 10,
            count: 321,
            circleStyle: '#2C99FF',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: 'DN250',
            percent: 10,
            count: 321,
            circleStyle: '#2C99FF',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: 'DN200',
            percent: 10,
            count: 321,
            circleStyle: '#2C99FF',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: 'DN100',
            percent: 10,
            count: 321,
            circleStyle: '#2C99FF',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
        ],
      ]
    }),
	},
};
export default {
	name: 'h-tabs-circle',
	components: {
		HVerticalTabs,
		pie,
	},
	data() {
		return {
			tabSource: [
				{
					name: '管网压力等级',
				},
				{
					name: '管网材质',
				},
				{
					name: '管网口径',
				},
			],
			tabActived: 2,
		};
	},
  computed: {
	  curr () {
	    return this.data ? this.data.circle[this.tabActived] : []
    }
  },
  watch: {
    data: {
      handler(val) {
        if (this.id) {
          this.$nextTick(() => {
            this.$refs.circle && echarts.init(this.$refs.circle).setOption(getCircleOption(this.curr))
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted() {

  },
	methods: {
		tabActivedChange(tabActived) {
			this.tabActived = tabActived
      this.$nextTick(() => {
        this.$refs.circle && echarts.init(this.$refs.circle).setOption(getCircleOption(this.curr))
      })
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.h-tabs-circle {
  display: flex;
  align-items: center;

  .chart-circle {
    width: 280px;
    height: 163px;
    margin: 0 30px;
  }
  .circle-legend {
    li {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #FFFFFF;
      margin-bottom: 16px;
      .circle-legend-color {
        box-sizing: content-box;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: transparent;
        border: 4px solid #2c99ff;
        margin-right: 10px;
      }
      &:nth-child(2) .circle-legend-color {border-color: #18CEB9;}
      &:nth-child(3) .circle-legend-color {border-color: #FB592C;}
      &:nth-child(4) .circle-legend-color {border-color: #367cf6;}
      &:nth-child(5) .circle-legend-color {border-color: #84e4fc;}
      &:nth-child(6) .circle-legend-color {border-color: #f8cd47;}
      &:nth-child(7) .circle-legend-color {border-color: #fceb50;}
      &:nth-child(8) .circle-legend-color {border-color: #ed9144;}
      &:nth-child(9) .circle-legend-color {border-color: #5fcbb9;}
      .circle-legend-name {
        width: 238px;
        text-align: left;
      }
      .circle-legend-num {
        text-align: right;
        width: 100px;
        >span {
          font-weight: bold;
          font-size: 24px;
          margin-right: 8px;
        }
      }
      .circle-legend-percent {
        width: 80px;
        text-align: right;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        color: #FFFFFF;
      }
    }
  }
	&__cvs {
		position: relative;
	}
	&__tabs {
    position: relative;
	}
}
</style>
