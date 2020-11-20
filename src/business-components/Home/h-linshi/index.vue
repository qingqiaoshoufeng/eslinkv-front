<template>
	<div class="widget-part" :style="styles" v-if="data">
    <section class="title">
      <div class="color"></div>
      <div class="title-txt">供气</div>
    </section>
    <section class="total">
      <img src="./img/air-bar.svg" class="total-icon">
      <div class="total-info">
        <div class="total-title">年度累计供气量</div>
        <div class="num font-num">{{ data.total.toLocaleString() }} <span>万m³</span></div>
      </div>
    </section>
    <ul class="air">
      <li v-for="(k, i) in 7" :key="i" class="li">
        <div class="air-name">门站</div>
        <div>
          <span class="air-num font-num">5</span>
          <span class="air-unit">座</span>
        </div>
      </li>
    </ul>
    <section class="title">
      <div class="color"></div>
      <div class="title-txt">服务</div>
    </section>

    <section class="service">
      <ul>
        <li v-for="(k, i) in 5" :key="i" class="li">
          <div class="air-name">居民户</div>
          <div>
            <span class="air-num font-num">15645</span>
            <span class="air-unit">户</span>
          </div>
        </li>
      </ul>
      <img src="./img/standard.svg" class="standard">
    </section>
    <section class="links">
      <div class="link" :class="{active: curr === 0}" @click="getLink(0)">最多跑<br/>一次4.0</div>
      <div class="link" :class="{active: curr === 1}" @click="getLink(1)">三社联动<br/>安心安居</div>
      <div class="link" :class="{active: curr === 2}" @click="getLink(2)">31个<br/>服务网点</div>
      <div class="link" :class="{active: curr === 3}" @click="getLink(3)">网上19<br/>营业厅</div>
      <div class="link" :class="{active: curr === 4}" @click="getLink(4)">杭燃码</div>
    </section>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getSelect, getInput} from "../../../../lib";

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
	  api: {
	    data: {
	      total: 78528,
      }
    },
		config: {
			transform: 149,
			left: -50,
		}
	}
	export default {
		mixins: [mixins],
    data () {
		  return {
        curr: 0
      }
    },
    methods: {
      getLink (n) {
        this.curr = n
      }
    },
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		},
		mounted() {
			setTimeout(()=>{
				this.$refs.img.style.transform=`perspective(763px) rotateY(${this.config.config.transform}deg)`
				this.$refs.img.style.left=`${this.config.config.left}px`
			},1500)
		}
	}
</script>
<style lang="scss" scoped>
	.title {
		display: flex;
    align-items: center;
    .color {
      width: 6px;
      height: 40px;
      transform: skewY(30deg);
      background: #00DDFF;
    }
    .title-txt {
      position: relative;
      width: 586px;
      text-align: left;
      font-weight: 600;
      font-size: 32px;
      line-height: 32px;
      color: #FFFFFF;
      padding-bottom: 6px;
      margin-left: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      &:after{
        content: '';
        display: block;
        width: 24px;
        height: 1px;
        position: absolute;
        right: 0;
        bottom: -1px;
        background: #fff;
      }
    }

		img {
			height: 100%;
			transform: rotateY(0);
			left: 0;
			transition: all .5s;
			top: 40px;
		}
	}
  .total {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    .total-info {
      margin-left: 16px;
      text-align: left;
      .total-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        color: #5EE2FD;
      }
      .num {
        font-weight: bold;
        font-size: 64px;
        line-height: 48px;
        color: #FFFFFF;
        margin-top: 16px;
        span{
          font-weight: normal;
          font-size: 24px;
          line-height: 24px;
          color: #FFFFFF;
          margin-left: 21px;
        }
      }
    }
  }
  .air {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 494px;
    margin-bottom: 30px;
  }
  .li {
    width: 232px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #0057A9;
    padding-bottom: 8px;
    margin-bottom: 20px;
    position: relative;
    &:before {
      content: '';
      display: block;
      width: 3px;
      height: 3px;
      background: #00DDFF;
      position: absolute;
      left: 0;
      bottom: -1.5px;
    }
    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 3px;
      background: #00DDFF;
      position: absolute;
      right: 0;
      bottom: -1.5px;
    }
    .air-name {
      font-size: 24px;
      line-height: 24px;
      color: #5EE2FD;
    }
    .air-num {
      font-weight: bold;
      font-size: 40px;
      line-height: 40px;
      color: #FFFFFF;
    }
    .air-unit {
      font-size: 24px;
      line-height: 24px;
      color: #FFFFFF;
      margin-left: 4px;
    }
  }

  .service {
    display: flex;
    align-items: center;
    margin-top: 16px;
    .li {
      width: 336px;
      margin-right: 80px;
      margin-bottom: 9px;
    }
    .standard {
      width: 144px;
      height: 130px;
    }
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .link {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 24px;
      color: #FFFFFF;
      background: rgba(0, 87, 169, 0.5);
      border-radius: 50%;
      &.active {
        background: url("./img/link-bg.svg") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>

