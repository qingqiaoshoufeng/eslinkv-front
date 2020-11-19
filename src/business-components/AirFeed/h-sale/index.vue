<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="title">
			<div class="title-txt">LNG宁波挂牌价(元/吨)</div>
			<div class="num">{{data.lngPrice}}</div>
		</div>
		<div class="ul-wrap">
      <ul class="jars" :style="{transform: `translateX(${-992*groupIndex}px)`}">
        <li
            v-for="(k, i) in data.station"
            :key="i"
            :class="{active: currentIndex === i}"
            @click="changeStation(i)"
        >
          <div class="jar">
            <div class="jar-heart">
              <div class="water" :style="{top: (100-k.percent) + '%'}"></div>
              <div class="jar-num font-num">{{k.percent}}%</div>
            </div>
          </div>
          <div class="li-num">{{k.value}}</div>
          <div class="li-name">{{k.name}}</div>
          <div class="li-unit">储气量(m3)</div>
          <div class="active-dot" v-show="currentIndex === i">
            <div class="dot"></div>
          </div>
        </li>
      </ul>
      <div class="split-line" style="transform: translateY(-2px)"></div>
    </div>
		<div class="view">
			<div class="titles">
				<div>进出液</div>
				<div>气化量</div>
			</div>
			<div class="chart-wrap">
				<div class="legend">
					<div class="legend-item">
						<div class="legend-color"></div>
						<div class="legend-txt">进液量</div>
					</div>
					<div class="legend-item">
						<div class="legend-color red"></div>
						<div class="legend-txt">出液量</div>
					</div>
					<div class="legend-item">
						<div class="legend-color green"></div>
						<div class="legend-txt">气化量</div>
					</div>
				</div>
				<div class="chart" :id="id"></div>
				<div class="x-axis">
					<div class="month" v-for="k in month" :key="k">{{k}}</div>
				</div>
			</div>
		</div>
		<div class="split-line"></div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import getOptions, {test} from './options'

const config = {animation: true}
const value = {
	api: {
		data: JSON.stringify({
			lngPrice: 298,
			station: [
				{
					name: '东部站',
					percent: 24,
					value: '324,324',
					chart: test
				},
				{
					name: '西部站',
					percent: 66,
					value: '324,324',
					chart: test
				},
				{
					name: '门下站',
					percent: 11,
					value: '324,324',
					chart: test
				},
				{
					name: '西林站',
					percent: 5,
					value: '324,324',
					chart: test
				},
				{
					name: '望元站',
					percent: 52,
					value: '324,324',
					chart: test
				},
				{
					name: '西部站',
					percent: 66,
					value: '324,324',
					chart: test
				},
				{
					name: '门下站',
					percent: 11,
					value: '324,324',
					chart: test
				},
				{
					name: '西林站',
					percent: 5,
					value: '324,324',
					chart: test
				},
				{
					name: '望元站',
					percent: 52,
					value: '324,324',
					chart: test
				}
			]
		})
	}
}
export default {
	mixins: [mixins],
	data () {
		return {
			currentIndex: 0,
			groupIndex: 0,
			timer: null,
			clickTimer: null,
			isClick: false
		}
	},
	computed: {
		month () {
			if (this.data) {
				return this.data.station[this.currentIndex].chart.map(v => v.name)
			}
			return []
		}
	},
	methods: {
		setOption() {
			this.instance && this.instance.setOption(getOptions(this.data.station[this.currentIndex].chart))
		},
		changeStation (i) {
			clearTimeout(this.clickTimer)
			this.currentIndex = i
			this.isClick = true
			this.clickTimer = setTimeout(() => {
				this.isClick = false
			}, 4000)
		}
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = echarts.init(document.getElementById(this.id))
						this.setOption(val)
					})
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted() {
		this.timer = setInterval(() => {
			if (this.isClick) return
      if (this.currentIndex === this.data.station.length - 1) {
        this.currentIndex = 0
        this.groupIndex = 0
      } else if (this.currentIndex === (this.groupIndex * 5 + 4)) {
        this.groupIndex++
        this.currentIndex++
			} else {
				this.currentIndex++
			}
			this.setOption()
		}, 2000)
	},
	beforeDestroy () {
		this.timer && clearInterval(this.timer)
		this.clickTimer && clearTimeout(this.clickTimer)
	}
}
</script>
<style lang="scss" scoped>
.view {
	width: 100%;
	display: flex;
}
.title {
	width: 400px;
	height: 64px;
	background: url("/static/icons/long-bg.svg");
	background-size: 100% 100%;
	display: flex;
	align-items: center;
	padding-left: 22px;
	margin-bottom: 22px;
	.title-txt {
		font-size: 20px;
		line-height: 24px;
		color: #00DDFF;
		margin-right: 33px;
	}
	.num {
		font-weight: bold;
		font-size: 48px;
		line-height: 48px;
		color: #FEFFFF;
	}
}
.ul-wrap {
  overflow: hidden;
}
.jars {
	display: flex;
	justify-content: space-between;
  flex-wrap: nowrap;
  transition: all 0.4s;
  padding-bottom: 24px;
  li {
    flex: none;
		position: relative;
		height: 230px;
		width: 160px;
		text-align: center;
		background: linear-gradient(0deg, #001F6D 0%, rgba(0, 31, 109, 0) 100%);
		box-sizing: border-box;
		padding-top: 16px;
    margin-right: 48px;
    &:nth-child(5n){margin-right: 0;}
		.jar {
			position: relative;
			width: 48px;
			height: 104px;
			background: url("/static/icons/jar.svg") no-repeat;
			background-size: 100% 100%;
			margin: 0 auto 16px;
			.jar-heart {
				position: absolute;
        top: 3px;
        left: 4px;
        width: 40px;
        height: 92px;
        border-radius: 16px;
				background: #001F6D;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.water {
				position: absolute;
				top: 100%;
				left: 0;
				bottom: 0;
				width: 40px;
				background: linear-gradient(to top, rgba(0,221,255,0), rgba(0,221,255,1));
			}
			.jar-num {
				z-index: 1;
				font-weight: bold;
				font-size: 24px;
				line-height: 24px;
				color: #FFFFFF;
				text-align: center;
			}
		}
		.li-num {
			font-weight: bold;
			font-size: 32px;
			line-height: 32px;
			text-align: center;
			color: #FFFFFF;
			margin-bottom: 4px;
		}
    .li-name {
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #00DDFF;
      margin-bottom: 4px;
    }
		.li-unit {
      font-size: 18px;
      line-height: 24px;
      text-align: center;
      color: rgba(255, 255, 255, 0.75);
		}

		&.active {
			border: 1px solid #0057A9;
			&:after {
				content: '';
				display: block;
				background: #00DDFF;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 4px;
			}
		}

		.active-dot {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: -20px;
			background: #00FFCF;
			width: 2px;
			height: 20px;
			.dot {
				position: absolute;
				left: -3px;
				bottom: -8px;
				background: #00FFCF;
				width: 8px;
				height: 8px;
			}
		}
	}
}
.split-line {
	position: relative;
	width: 100%;
	height: 2px;
	background: rgba(0, 221, 255, 0.5);
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 2px;
		width: 40px;
		background: #00DDFF;
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		height: 2px;
		width: 40px;
		background: #00DDFF;
	}
}
.chart-wrap {
	width: 100%;
	height: 435px;
	position: relative;
	margin-top: 24px;
	.legend {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 0;
		display: flex;
		justify-content: space-between;
		width: 320px;
		.legend-item {
			display: flex;
			align-items: center;
			.legend-color {
				width: 16px;
				height: 8px;
				background: #2194FF;
				&.red{background: #E5615B;}
				&.green{background: #00FFCF;}
			}
			.line-legend {
				background: #00DDFF;
				width: 16px;
				height: 2px;
			}
			.legend-txt {
				font-size: 16px;
				line-height: 16px;
				color: #FFFFFF;
				margin-left: 4px;
			}
		}
	}
}
.chart {
	width: 100%;
	height: 100%;
	position: relative;
}
.x-axis {
	position: absolute;
	z-index: 999;
  bottom: 0;
	left: 50px;
	right: 50px;
	background: rgba(0, 87, 169, 0.2);
	border-radius: 12px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 18px;
	.month {
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 16px;
		text-align: center;
		color: #FFFFFF;
	}
}
.titles {
	width: 82px;
	flex: none;
	>div {
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
		line-height: 24px;
		color: #FFFFFF;
		padding-top: 98px;
		&:last-child{
			padding-top: 192px;
		}
	}
}
</style>
