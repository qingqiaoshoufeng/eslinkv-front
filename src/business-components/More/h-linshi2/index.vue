<template>
	<div class="widget-part" :style="styles" ref="img" v-if="data">
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">杭燃优家</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<div class="container">
			<section class="detail">
				<div class="detail-item">
					<div class="detail-item-icon" :style="`background-image: url(${currBuilding.icon1})`"></div>
					<div>
						<div class="detail-item-title">{{ currBuilding.desc1 }}</div>
						<div class="detail-item-num font-num">{{ currBuilding.value1| toThousand }} <span>{{ currBuilding.unit1 }}</span>
						</div>
					</div>
				</div>
				<div class="detail-item">
					<div class="detail-item-icon money"></div>
					<div>
						<div class="detail-item-title">{{ currBuilding.desc2 }}</div>
						<div class="detail-item-num font-num">{{ currBuilding.value2/10000 | toThousand }} <span>万元</span></div>
					</div>
				</div>
			</section>
			<section class="building">
				<div class="circle">
					<div
						class="item"
						:class="[getItemIndex(i)]"
						v-for="(k, i) in data.building"
            :key="i"
					>{{k.name}}
					</div>
				</div>
			</section>
      <section class="year">
        <label>年度总产值</label>
        <span class="year-num">{{ data.yearData | toThousand }}</span>
      </section>
		</div>
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">杭燃体验</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<section class="fans pos-r">
			<video class="fans-video pos-a" autoplay="autoplay" loop="loop" src="./img/shouyetiyan.webm"></video>
      <transition name="fade">
        <div class="fans-top" :key="currFan.name">
          <div style="text-align: left">
            <div class="fan-title">{{currFan.name}}</div>
            <div class="fan-num font-num">{{ currFan.fanDailyNum| toThousand }}</div>
          </div>
          <div style="text-align: right">
            <div class="fan-title">{{currFan.name}}</div>
            <div class="fan-num font-num">{{ currFan.fanTotalNum| toThousand }}</div>
          </div>
        </div>
      </transition>
		</section>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "../../../../lib";

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
			transform: -30,
			left: -50,
		},
		api: {
			data: {
				fans: [
          {
            name: '微信本月访问量(次)',
            name2: '微信累计粉丝(人)',
            fanDailyNum: 123,
            fanTotalNum: 425673
          },
          {
            name: '微博本月阅读量(次)',
            name2: '微博累计粉丝(人)',
            fanDailyNum: 666,
            fanTotalNum: 354556
          },
          {
            name: '网站本月访问量(次)',
            name2: '网站累计访问量(次)',
            fanDailyNum: 856,
            fanTotalNum: 153332
          },
          {
            name: '头条本月关注量(次)',
            name2: '头条累计粉丝(人)',
            fanDailyNum: 321,
            fanTotalNum: 77554
          },
          {
            name: '抖音本月访问量(次)',
            name2: '抖音累计粉丝(人)',
            fanDailyNum: 1234,
            fanTotalNum: 965566
          }
        ],
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
				],
        yearData: 53269871
			}
		}
	}
	export default {
		mixins: [mixins],
		data() {
			return {
				buildingTimer: null,
				loopIndex: 1,
        fanIndex: 0
			}
		},
		computed: {
			currBuilding() {
				const map = new Map([[1, 2], [2, 1], [3, 0], [4, 5], [5, 4], [0, 3]])
				return this.data?.building[map.get(this.loopIndex % 6)] || {}
			},
      currFan () {
			  return this.data ? this.data.fans[this.fanIndex] : {}
      }
		},
    watch: {
      data: {
        handler(val) {
          this.buildingTimer = setInterval(() => {
            this.loopIndex++
            if (this.fanIndex === 4) {
              this.fanIndex = 0
            } else {
              this.fanIndex++
            }
          }, 3000)
        },
        deep: true,
        immediate: true,
      },
    },
		methods: {
			getItemIndex(i) {
				const n = (i + this.loopIndex) % 6
				return `index-${n}`
			},
			count(n) {
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
		},
		mounted() {
			// setTimeout(()=>{
			//   this.$refs.img.style.transform=`perspective(763px) rotateY(${this.config.config.transform}deg) translateZ(-120px)`
			//   this.$refs.img.style.left=`auto`
			//   this.$refs.img.style.right=`${this.config.config.left}px`
			// },1500)
		},
		beforeDestroy() {
			clearInterval(this.buildingTimer)
			this.buildingTimer = null
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
		padding: 22px 20px 10px;
		margin-bottom: 32px;
    background: #011B79;
	}

  .year {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 360px;
    height: 48px;
    position: relative;
    background: rgba(0, 221, 255, 0.3);
    margin: 0 auto;
    label {
      font-size: 24px;
      line-height: 24px;
      color: #FFFFFF;
    }
    .year-num {
      font-weight: bold;
      font-size: 40px;
      line-height: 48px;
      color: #FFFFFF;
      font-family: font-num;
      margin-left: 16px;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: -2px;
      width: 2px;
      height: 40px;
      background: #00DDFF;
    }
  }

	.detail {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		.detail-item {
			flex: 1;
			text-align: left;
			display: flex;
			align-items: center;

			.detail-item-icon {
				width: 80px;
				height: 80px;
				margin-right: 8px;
				background: #0049ce;

				&.money {
					background-image: url("/static/images/home/home-u-0.svg");
				}
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

				span {
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
					transform: translate3d(0, 0, -100px);
				}
			}
		}
	}
	.fans-video{
		height: 412px;
		left: 50%;
		transform: translateX(-50%);
	}
	.fans {
    position: relative;
    background: #011B79;
		height: 412px;
		border: 1px solid #00DDFF;
		border-top-width: 0;

		.fans-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
			display: flex;
			justify-content: space-between;
			padding: 20px 16px 0;
		}

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

