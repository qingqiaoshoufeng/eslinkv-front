<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="container">
      <div class="main">
        <ul>
          <li class="item" v-for="(k, i) in data" :class="{active: i === index}">
            <div class="title">{{ k.name }} {{ k.value | toThousand }}</div>
            <div class="bar" :style="{width: getBarWidth(k.value)}"></div>
          </li>
        </ul>
        <div class="unit">单位：万m³</div>
      </div>
      <div class="outside">
        <h5>{{curr.name}}外供量</h5>
        <div class="sub">
          <div class="sub-item" v-for="(k, i) in curr.children">
            <div class="sub-item-rank font-num">{{ i + 1 }}</div>
            <div class="sub-detail">
              <div class="sub-title">{{ k.name }}</div>
              <div class="sub-num">{{ k.value | toThousand }}</div>
              <div class="sub-bar" :style="{width: getSubBarWidth(k.value)}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { getInput, getSelect } from '../../../../lib';
const config = {
	animation: true
}
const testChildren = [
  {
    name: '星桥站',
    value: 6531
  },
  {
    name: '西郊站',
    value: 5234
  },
  {
    name: '北门站',
    value: 4922
  },
  {
    name: '狮子口阀室',
    value: 4422
  },
  {
    name: '乔司站',
    value: 4322
  },
  {
    name: '江北阀室',
    value: 3333
  },
  {
    name: '西部站',
    value: 3231
  },
  {
    name: '滨江站',
    value: 2232
  },
  {
    name: '东部站',
    value: 1125
  },
  {
    name: '之江站',
    value: 888
  },
  {
    name: '留祥站',
    value: 534
  },
  {
    name: '三墩站',
    value: 123
  },
]
const value = {
	api: {
		data: JSON.stringify([
      {
        name: '主城区',
        value: 37428,
        children: testChildren
      },
      {
        name: '余杭港华',
        value: 16062,
        children: testChildren
      },
      {
        name: '下沙热电',
        value: 7452,
        children: testChildren
      },
      {
        name: '钱江燃气',
        value: 3426,
        children: testChildren
      },
      {
        name: '富阳华润',
        value: 3156,
        children: testChildren
      },
      {
        name: '中燃',
        value: 2175,
        children: testChildren
      },
      {
        name: '萧山中奥',
        value: 957,
        children: testChildren
      },
      {
        name: '临安',
        value: 754,
        children: testChildren
      },
      {
        name: '桐庐',
        value: 256,
        children: testChildren
      }
    ])
	}
}
export default {
	mixins: [mixins],
  data () {
	  return {
	    index: 0,
      timer: null
    }
  },
  computed: {
	  curr () {
	    return this.data ? this.data[this.index] : {}
    }
  },
  methods: {
	  getBarWidth (value) {
      return ~~(value / this.data[0].value * 192) + 'px'
    },
	  getSubBarWidth (value) {
      return ~~(value / this.curr.children[0].value * 92) + 'px'
    }
  },
	created() {
		this.configSource = this.parseConfigSource(config)
		this.configValue = this.parseConfigValue(config, value)
	},
  mounted() {
	  this.timer = setInterval(() => {
	    if (this.index === 11) {
	      this.index = 0
      } else {
	      this.index++
      }
    }, 2000)
  },
  beforeDestroy() {
	  clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  .main {
    flex: none;
    width: 215px;
    border-right: 1px dashed rgba(255, 255, 255, 0.4);
    .item {
      width: 200px;
      height: 45px;
      padding: 4px;
      margin-bottom: 8px;
      text-align: left;
      &:last-child{margin-bottom: 4px;}
      &.active {
        background: #0057A9;
        .bar {
          background: #00FFCF;
        }
      }

      .title {
        font-size: 18px;
        line-height: 24px;
        color: #FFFFFF;
        margin-bottom: 4px;
      }
      .bar {
        width: 0;
        height: 8px;
        background: #2194FF;
      }
    }
    .unit {
      font-size: 18px;
      line-height: 24px;
      color: #00DDFF;
      text-align: left;
    }
  }
  .outside {
    padding-left: 15px;
    h5 {
      text-align: left;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #00DDFF;
      padding-top: 8px;
      margin-bottom: 16px;
    }
    .sub {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      flex: 1;
      height: 432px;
      .sub-item {
        display: flex;
        width: 120px;
        height: 64px;
        background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.3) 100%);
        margin-bottom: 8px;
        &:nth-child(2n+1) {
          margin-right: 8px;
        }
        &:nth-child(6) {
          margin-bottom: 0;
        }
        .sub-item-rank {
          background: #2194FF;
          width: 24px;
          height: 24px;
          font-weight: bold;
          font-size: 24px;
          line-height: 24px;
          color: #FFFFFF;
          margin-right: 4px;
        }
        .sub-detail {
          text-align: left;
          font-size: 18px;
          line-height: 24px;
          color: #F9F9F9;
          .sub-title {
            margin-bottom: 8px;
          }
          .sub-bar {
            width: 0;
            height: 2px;
            background: #00DDFF;
          }
        }
        &:nth-child(1) .sub-item-rank {
          background: #FFD200;
          color: #001A77;
        }
        &:nth-child(2) .sub-item-rank {
          background: #00DDFF;
          color: #001A77;
        }
        &:nth-child(3) .sub-item-rank {
          background: #00FFCF;
          color: #001A77;
        }
      }
    }
  }
}
</style>

