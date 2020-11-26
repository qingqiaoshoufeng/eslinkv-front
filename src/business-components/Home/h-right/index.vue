<template>
	<div class="widget-part" :style="styles" v-if="data" ref="img">
		<section class="title">
      <img src="/static/icons/left-icon.svg">
			<div class="title-txt">年度用户结构气量分析</div>
      <img src="/static/icons/right-icon.svg">
    </section>
		<section class="container">
      <h3>用气类型用气量分析</h3>
      <ul class="gas">
        <li>
          <img src="./img/gas-use1.svg">
          <div class="gas-main">
            <div class="gas-info">
              <div class="gas-title">居民户</div>
              <div class="gas-num"><em>{{ data.data1.value1 | toThousand }}</em> 万m³</div>
            </div>
            <div class="gas-progress">
              <div class="progress" :style="{width: data.data1.percent1 + '%'}"></div>
            </div>
          </div>
        </li>
        <li>
          <img src="./img/gas-use2.svg">
          <div class="gas-main">
            <div class="gas-info">
              <div class="gas-title">公建户</div>
              <div class="gas-num"><em>{{ data.data1.value2 | toThousand }}</em> 万m³</div>
            </div>
            <div class="gas-progress">
              <div class="progress" :style="{width: data.data1.percent2 + '%'}"></div>
            </div>
          </div>
        </li>
        <li>
          <img src="./img/gas-use3.svg">
          <div class="gas-main">
            <div class="gas-info">
              <div class="gas-title">工业户</div>
              <div class="gas-num"><em>{{ data.data1.value3 | toThousand }}</em> 万m³</div>
            </div>
            <div class="gas-progress">
              <div class="progress" :style="{width: data.data1.percent3 + '%'}"></div>
            </div>
          </div>
        </li>
      </ul>
      <h3>非居民用气性质用气量占比</h3>
      <pie class="pie" :data="data.data2" text="区域" subtext="销售气量"></pie>
    </section>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "../../../../lib";
	import pie from '../h-left/pie'

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
        data1: {
          value1: 1335566,
          percent1: 60,
          value2: 126655,
          percent2: 70,
          value3: 1326886,
          percent3: 90,
        },
			  data2: [
          {
            name: '城区1',
            value: 72
          },
          {
            name: '城区2',
            value: 32
          },
          {
            name: '城区3',
            value: 12
          },
        ]
      }
		},
		config: {
			transform: -15,
			left: 100,
		}
	}
	export default {
		mixins: [mixins],
    components: { pie },
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		},
		mounted() {
			setTimeout(() => {
				this.$refs.img.style.transform = `perspective(763px) rotateY(${this.config.config.transform}deg) translateZ(-120px)`
				this.$refs.img.style.right = `${this.config.config.left}px`
			}, 1500)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		transition: all .5s;
		padding-top: 40px;
	}

	.title {
		display: flex;
		align-items: center;
    justify-content: center;
    height: 48px;
    background: rgba(0, 87, 169, 0.5);
    border: 1px solid #00DDFF;
		.title-txt {
			font-weight: 600;
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
      margin: 0 8px;
		}
	}

  .container {
    border: 1px solid #00DDFF;
    border-top-width: 0;
    padding-top: 40px;
    height: 906px;
    h3 {
      text-align: left;
      position: relative;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: #FFFFFF;
      margin-left: 32px;
      padding-left: 14px;
      &:before {
        position: absolute;
        left: 0;
        top: 3px;
        content: '';
        display: block;
        width: 6px;
        height: 28px;
        background: #00DDFF;
        transform: skewY(30deg);
      }
    }
    .gas {
      margin: 24px 32px 68px;
      li {
        display: flex;
        align-items: center;
        &+li{margin-top: 32px;}
        >img {
          width: 72px;
          height: 72px;
          margin-right: 16px;
        }
        .gas-main {flex: 1;}
        .gas-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .gas-title {
            font-size: 20px;
            line-height: 24px;
            color: #00DDFF;
          }
          .gas-num {
            font-size: 18px;
            line-height: 24px;
            color: #FFFFFF;
            em {
              font-weight: bold;
              font-size: 32px;
              line-height: 32px;
              font-style: normal;
            }
          }
        }
        .gas-progress {
          height: 32px;
          background: #0057A9;
          padding: 8px 4px;
          margin-top: 8px;
          .progress {
            width: 260px;
            height: 16px;
            background: linear-gradient(270deg, #00DDFF 0%, rgba(0, 221, 255, 0.2) 100%);
          }
        }
      }
    }
  }

  .pie {
    width: 100%;
    margin-top: 20px;
  }
</style>

