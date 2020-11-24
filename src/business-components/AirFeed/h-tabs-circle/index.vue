<template>
	<div class="widget-part h-tabs-circle" :style="styles" v-if="data">
    <div class="develop">
      <div class="develop-chart" ref="develop"></div>
    </div>
    <div class="dash"></div>
		<h-vertical-tabs
			class="h-tabs-circle__tabs"
			:source="tabSource"
			:defaultActived="tabActived"
			@actived-change="tabActivedChange"
		/>
    <div class="chart-circle" ref="circle"></div>
    <ul class="circle-legend">
      <li v-for="(k, i) in curr" :key="i">
        <div class="circle-legend-color"></div>
        <div class="circle-legend-name">{{ k.name }}</div>
        <div class="circle-legend-num"><span class="font-num">{{ k.count | toThousand }}</span>{{ k.unit }}</div>
      </li>
    </ul>
	</div>
</template>

<script>
import mixins from '../../mixins';
import HCvs from './HCvs';
import HVerticalTabs from './HVerticalTabs';
import { getCircleOption } from './options'

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
            name: '这个',
            percent: 50,
            count: 321,
            circleStyle: '#FB592C',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '哈哈哈',
            percent: 80,
            count: 321,
            circleStyle: '#18CEB9',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '嘻嘻嘻',
            percent: 40,
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
            name: '为为额',
            percent: 20,
            count: 321,
            circleStyle: '#FB592C',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '为人很好',
            percent: 60,
            count: 321,
            circleStyle: '#18CEB9',
            unit: 'km',
            countStyle: '',
            unitStyle: '',
            percentStyle: '',
          },
          {
            name: '水电费是谁的',
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
		HCvs,
		HVerticalTabs,
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
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted() {},
	methods: {
		tabActivedChange(tabActived) {
			this.tabActived = tabActived
      this.instance = echarts.init(this.$refs.circle)
      this.instance.setOption(getCircleOption(this.curr))
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.h-tabs-circle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .develop {
    .develop-chart {
      width: 317px;
      height: 165px;
    }
  }
  .dash {
    width: 0;
    height: 192px;
    border-right: 1px dashed rgba(255, 255, 255, 0.4);
  }
  .chart-circle {
    width: 200px;
    height: 163px;
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
      &:nth-child(2) .circle-legend-color {
        border-color: #18CEB9;
      }
      &:nth-child(3) .circle-legend-color {
        border-color: #FB592C;
      }
      .circle-legend-name {
        width: 84px;
        text-align: left;
      }
      .circle-legend-num {
        text-align: right;
        width: 80px;
        >span {
          font-weight: bold;
          font-size: 24px;
          margin-right: 8px;
        }
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
