<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="tab">
      <div class="swiper" @click="back" :class="{active: offset > 0}"><span class="left"></span></div>
      <div class="scroll-wrapper">
        <ul class="scroll" :style="{transform: `translateX(-${offsetX}px)`}" ref="scroll">
          <li v-for="(k, i) in data" :class="{active: i === currIndex}" :key="i" @click="drawLine(k, i)">{{k.name}}</li>
        </ul>
      </div>
      <div class="swiper" @click="next" :class="{active: offset < data.length}"><span class="right"></span></div>
    </div>
		<div class="chart" :id="id" />
	</div>
</template>
<script>
import mixins from '../../mixins';
import getOption from './options';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const test = [{"x":"1月","y1":10,"y2":23},{"x":"2月","y1":18,"y2":60},{"x":"3月","y1":5,"y2":20},{"x":"4月","y1":23,"y2":36},{"x":"5月","y1":14,"y2":23},{"x":"6月","y1":40,"y2":58},{"x":"7月","y1":58,"y2":44},{"x":"8月","y1":50,"y2":76},{"x":"9月","y1":45,"y2":68},{"x":"10月","y1":56,"y2":76},{"x":"11月","y1":53,"y2":73},{"x":"12月","y1":47,"y2":68}]
const config = {
  animation: true,
  config: {
    color1: true,
    color2: true,
    lineName1: true,
    lineName2: true,
    unit: true
  },
};
const value = {
	api: {
		data: JSON.stringify([{
		  name: '全部',
		  data: test
    }, {
		  name: '工业',
		  data: test
		}, {
		  name: '餐饮',
		  data: test
		}, {
		  name: '酒店式公寓',
		  data: test
		}, {
		  name: '汽车加气',
		  data: test
		}, {
		  name: '民政(社会团体)',
		  data: test
		}, {
		  name: '政府机关',
		  data: test
		}, {
		  name: '工业',
		  data: test
		}, {
		  name: '写字楼',
		  data: test
		}, {
		  name: '医院',
		  data: test
		}, {
		  name: '商场',
		  data: test
		}, {
		  name: '娱乐',
		  data: test
		}, {
		  name: '学校',
		  data: test
		}, {
		  name: '宾馆',
		  data: test
		}])
	},
  config: {
	  color1: '#2C99FF',
	  color2: '#E5615B',
    lineName1: '今年',
    lineName2: '去年',
    unit: '单'
  }
}
const configSource = {
  config: {
    fields: {
      color1: getInput('color1', '折线1颜色'),
      color2: getInput('color2', '折线2颜色'),
      lineName1: getInput('lineName1', '折线1名称'),
      lineName2: getInput('lineName2', '折线2名称'),
      unit: getInput('unit', '单位')
    }
  },
}
export default {
	mixins: [mixins],
  data () {
	  return {
      offset: 0,
      offsetX: 0,
      currIndex: 0
    }
  },
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(data, this.config.config))
		},
    back () {
		  if (this.offset === 0) return
      this.offset--
      this.getOffset()
    },
    next () {
      if (this.offset === this.data.length) return
      this.offset++
      this.getOffset()
    },
    drawLine (row, index) {
		  this.currIndex = index
      this.setOption(row.data)
    },
    getOffset () {
      if (!this.$refs.scroll) return 0
      const n = (this.$refs.scroll.scrollWidth - this.$refs.scroll.offsetWidth) / this.$refs.scroll.offsetWidth
      const extra = (this.$refs.scroll.scrollWidth - this.$refs.scroll.offsetWidth) % this.$refs.scroll.offsetWidth
      if (n <= this.offset) {
        this.offsetX = extra
      } else {
        this.offsetX = this.$refs.scroll.offsetWidth * this.offset
      }
    }
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = echarts.init(document.getElementById(this.id))
						this.setOption(val[this.currIndex].data)
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	}
};
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
	height: 100%;
}
.tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .swiper {
    flex: none;
    width: 12px;
    height: 20px;
    background: #0057A9;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active{
      border: 1px solid #00DDFF;
    }
    >.left{
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-right: 6px solid rgba(255, 255, 255, 0.75);
      border-bottom: 6px solid transparent;
    }
    >.right{
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-left: 6px solid rgba(255, 255, 255, 0.75);
      border-bottom: 6px solid transparent;
    }
  }
  .scroll-wrapper {
    overflow: hidden;
    margin: 0 8px;
  }
  .scroll {
    transition: all 0.4s;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    >li {
      flex: none;
      position: relative;
      height: 32px;
      padding: 0 8px;
      background: #0057A9;
      font-size: 16px;
      line-height: 32px;
      color: #00DDFF;
      margin-right: 8px;
      &.active {
        color: #FFFFFF;
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #00DDFF;
        }
      }
    }
  }
}

</style>

