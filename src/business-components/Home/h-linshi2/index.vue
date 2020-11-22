<template>
	<div class="widget-part" :style="styles">
    <section class="title">
      <div class="title-txt">杭燃优家</div>
      <div class="color"></div>
    </section>
    <section class="detail">
      <div class="detail-item">
        <div class="detail-item-icon"></div>
        <div>
          <div class="detail-item-title">年度销量</div>
          <div class="detail-item-num">4856 <span>台</span></div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item-icon"></div>
        <div>
          <div class="detail-item-title">年度销售金额</div>
          <div class="detail-item-num">326,084 <span>元</span></div>
        </div>
      </div>
    </section>
    <section class="building">
      <div class="circle">
        <div class="item" :class="[`index-${index1}`]">燃气报警系统</div>
        <div class="item" :class="[`index-${index2}`]">燃气保险</div>
        <div class="item" :class="[`index-${index3}`]">金属管</div>
        <div class="item" :class="[`index-${index4}`]">非居民燃气设施</div>
        <div class="item" :class="[`index-${index5}`]">供暖工程</div>
        <div class="item" :class="[`index-${index6}`]">居民燃气设施</div>
      </div>
    </section>
    <section class="title">
      <div class="title-txt">杭燃体验</div>
      <div class="color"></div>
    </section>
    <section class="fans">
      <div style="text-align: left">
        <div class="fan-title">数媒粉丝日活(人)</div>
        <div class="fan-num font-num">265</div>
      </div>
      <div style="text-align: right">
        <div class="fan-title">数媒粉丝总数(人)</div>
        <div class="fan-num font-num">265,455</div>
      </div>
    </section>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import { getInput } from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				transform: getInput('transform', '旋转角度'),
				left: getInput('left', '位移'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			transform: true,
			left: true,
		}
	}
	const value = {
		config: {
			transform: 149,
			left: -50,
		},
    api: {
		  data: {
		    building: [
          {
            name: '燃气报警系统',
            desc1: '累计销量',
            desc2: '累计销售金额',
            value1: 4856,
            unit1: '台',
            value2: 326084,
            unit2: '元',
            icon1: '/static/images/home/home-u-1.svg'
          },
          {
            name: '燃气保险',
            desc1: '累计销量',
            desc2: '累计销售金额',
            value1: 2342,
            unit1: '笔',
            value2: 567517,
            unit2: '元',
            icon1: '/static/images/home/home-u-2.svg'
          },
          {
            name: '金属管',
            desc1: '年度销量',
            desc2: '累计销售金额',
            value1: 56332,
            unit1: '根',
            value2: 578567,
            unit2: '元',
            icon1: '/static/images/home/home-u-3.svg'
          },
          {
            name: '非居民燃气设施',
            desc1: '累计销量',
            desc2: '累计销售金额',
            value1: 302,
            unit1: '台',
            value2: 785235,
            unit2: '元',
            icon1: '/static/images/home/home-u-4.svg'
          },
          {
            name: '供暖工程',
            desc1: '累计销量',
            desc2: '累计销售金额',
            value1: 4856,
            unit1: '个',
            value2: 326084,
            unit2: '元',
            icon1: '/static/images/home/home-u-5.svg'
          },
          {
            name: '居民燃气设施',
            desc1: '年度销量',
            desc2: '年度销售金额',
            value1: 4856,
            unit1: '台',
            value2: 326084,
            unit2: '元',
            icon1: '/static/images/home/home-u-6.svg'
          },
        ]
      }
    }
	}
	export default {
		mixins: [mixins],
    data () {
		  return {
        buildingTimer: null,
        index1: 1,
        index2: 2,
        index3: 3,
        index4: 4,
        index5: 5,
        index6: 6
      }
    },
    methods: {
		  count (n) {
		    if (n === 6) {
		      n = 1
        } else {
		      n++
        }
		    return n
      }
    },
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
      this.buildingTimer = setInterval(() => {
        this.index1 = this.count(this.index1)
        this.index2 = this.count(this.index2)
        this.index3 = this.count(this.index3)
        this.index4 = this.count(this.index4)
        this.index5 = this.count(this.index5)
        this.index6 = this.count(this.index6)
      }, 3000)
		},
    beforeDestroy() {
		  clearInterval(this.buildingTimer)
      this.buildingTimer = null
    }
  }
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .color {
    width: 6px;
    height: 40px;
    transform: skewY(30deg);
    background: #00DDFF;
  }
  .title-txt {
    position: relative;
    width: 586px;
    text-align: right;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    color: #FFFFFF;
    padding-bottom: 6px;
    margin-right: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    &:after{
      content: '';
      display: block;
      width: 24px;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: -1px;
      background: #fff;
    }
  }
}
.detail {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 24px;
  .detail-item {
    flex: 1;
    text-align: left;
    display: flex;
    align-items: center;
    .detail-item-icon {
      width: 80px;
      height: 80px;
      margin-right: 8px;
      background: #0f3b69;
    }
    .detail-item-title {
      font-size: 24px;
      line-height: 24px;
      color: #5EE2FD;
      margin-bottom: 8px;
    }
    .detail-item-num {
      font-weight: bold;
      font-size: 40px;
      line-height: 48px;
      color: #FFFFFF;
      span{
        font-size: 24px;
        line-height: 24px;
        font-weight: normal;
      }
    }
  }
}
.building {
  height: 250px;
  background: url("./img/building.svg") no-repeat center center;
  margin-bottom: 45px;
  .circle {
    position: relative;
    height: 250px;
    perspective: 800px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg);
    .item {
      position: absolute;
      bottom: 180px;
      font-size: 18px;
      color: #00DDFF;
      left: 0;
      right: 0;
      margin: auto;
      transition: all 2s;
      &.index-1 {
        transform: translate3d(150px, 0, 60px);
      }
      &.index-2 {
        transform: translate3d(170px, 0, 150px);
      }
      &.index-3 {
        font-weight: 600;
        font-size: 24px;
        color: #FFFFFF;
        transform: translate3d(0, 0, 200px);
      }
      &.index-4 {
        transform: translate3d(-170px, 0, 150px);
      }
      &.index-5 {
        transform: translate3d(-150px, 0, 60px);
      }
      &.index-6 {
        transform: translate3d(0,0,-100px);
      }
    }
  }
}
.fans {
  height: 420px;
  background: url("./img/expbg.svg") no-repeat;
  background-size: 100% 100%;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  .fan-title {
    font-size: 24px;
    line-height: 24px;
    color: #5EE2FD;
    margin-bottom: 8px;
  }
  .fan-num {
    font-weight: bold;
    font-size: 40px;
    line-height: 40px;
    color: #FFFFFF;
  }
}
</style>

