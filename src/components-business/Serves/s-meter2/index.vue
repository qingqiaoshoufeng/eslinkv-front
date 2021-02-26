<template>
  <div class="widget-part" :style="styles" v-if="data">
    <ul class="list">
      <li
          v-for="(k, i) in data"
          :key="i"
          :class="{active: i === index}"
      >{{ k.date }}
      </li>
    </ul>
    <div class="rows">
      <div class="row">
        <div class="info">
          <img :src="config.config&&config.config.img1" alt="">
          <span class="info-txt">{{config.config&&config.config.desc1}}</span>
          <span class="info-num font-num">{{ activeItem.num1 }}</span>
        </div>
        <div class="progress">
          <div class="progress-line" :style="{width: 468 * activeItem.rate1 + 'px' }">
            <span class="dot"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="info">
          <img :src="config.config&&config.config.img2" alt="">
          <span class="info-txt">{{config.config&&config.config.desc2}}</span>
          <span class="info-num font-num">{{ activeItem.num2 }}</span>
        </div>
        <div class="progress">
          <div class="progress-line" :style="{width: 468 * activeItem.rate2 + 'px' }">
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrap">
      <div class="chart" :id="id"/>
      <div class="chart-info">
        <div class="chart-info-num font-num">{{ activeItem.percent }}%</div>
        <div class="chart-info-txt">抄表率</div>
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
      this.instance && this.instance.setOption(getOption(this.activeItem.percent))
    }
  },
  data() {
    return {
      index: 0,
      timer: null
    }
  },
  computed: {
    activeItem() {
      return this.data ? this.data[this.index] : {}
    }
  },
  watch: {
    data: {
      handler(val) {
        if (this.id) {
          this.$nextTick(() => {
            this.instance = echarts.init(
                document.getElementById(this.id)
            );
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
  mounted() {
    this.timer = setInterval(() => {
      if (this.index === this.data.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
      this.setOption();
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
};
</script>
<style lang="scss" scoped>
.widget-part {
  display: flex;
  align-items: center;

  .list {
    height: 188px;
    padding-right: 12px;
    border-right: 4px solid rgba(0, 87, 169, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    li {
      position: relative;
      text-align: center;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.75);

      &.active {
        width: 88px;
        height: 32px;
        line-height: 32px;
        background: linear-gradient(270deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0) 100%);
        color: #00DDFF;

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 9px;
          right: -20px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00DDFF;
          border: 2px solid #0057A9;
        }
      }
    }
  }

  .rows {
    width: 480px;
    margin-left: 20px;

    .row {
      &:first-child {
        margin-bottom: 26px;
      }

      .info {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        img {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }

        .info-txt {
          text-align: left;
          font-size: 24px;
          line-height: 24px;
          color: #FEFFFF;
          flex: 1;
        }

        .info-num {
          font-size: 24px;
          line-height: 24px;
          color: #FEFFFF;
        }
      }

      .progress {
        width: 480px;
        height: 16px;
        background: rgba(255, 255, 255, 0.1);
        padding-left: 6px;
        padding-top: 6px;

        .progress-line {
          position: relative;
          width: 200px;
          height: 4px;
          background: linear-gradient(90deg, rgba(1, 229, 255, 0.0001) 0%, #00DDFF 100%);
          transition: all .3s;

          .dot {
            width: 20px;
            height: 20px;
            position: absolute;
            right: -10px;
            top: -8px;
            border-radius: 50%;
            border: 2px solid rgba(0, 254, 207, 0.4);

            &:after {
              content: '';
              display: block;
              position: absolute;
              right: 0;
              top: 0;
              left: 0;
              bottom: 0;
              margin: auto;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #00FFCF;
              box-shadow: 0px 0px 4px #00FECF;
            }
          }
        }
      }
    }
  }

  .chart-wrap {
    margin-left: 48px;
    position: relative;
    width: 156px;
    height: 156px;

    .chart {
      width: 156px;
      height: 156px;
    }

    .chart-info {
      position: absolute;
      top: 48px;
      left: 0;
      right: 0;

      .chart-info-num {
        font-weight: bold;
        font-size: 32px;
        line-height: 32px;
        color: #FFFFFF;
      }

      .chart-info-txt {
        font-size: 18px;
        line-height: 25px;
        text-align: center;
        color: rgba(255, 255, 255, 0.75);
        margin-top: 8px;
      }
    }
  }
}

</style>
