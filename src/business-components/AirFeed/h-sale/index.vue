<template>
	<div class="widget-part" :style="styles">
		<div class="title">
			<div class="title-txt">LNG宁波挂牌价(元/吨)</div>
			<div class="num">298</div>
		</div>
		<ul class="jars">
			<li class="active">
				<div class="jar">
					<div class="jar-heart">
						<div class="water"></div>
						<div class="jar-num font-num">24%</div>
					</div>
				</div>
				<div class="li-num">324,324</div>
				<div class="li-name">东部站<br>储气量(m3)</div>
			</li>
		</ul>
		<div class="view">
			<div class="titles">
				<div>销售量</div>
				<div>进销存</div>
			</div>
			<div class="chart-wrap">
				<div class="chart" :id="id"></div>
				<div class="x-axis">
					<div class="month" v-for="k in month" :key="k">{{k}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import getOptions, {test} from './options'

const config = {animation: true}
const value = {
	api: {
		data: JSON.stringify({
			data: test
		})
	}
}
export default {
	mixins: [mixins],
	computed: {
		month () {
			if (this.data && this.data.data) {
				return this.data.data.map(v => v.name)
			}
			return []
		}
	},
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOptions(this.data.data))
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
	}
}
</script>
<style lang="scss" scoped>
.view {
	width: 100%;
	height: 100%;
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
.jars {
	display: flex;
	justify-content: space-between;
	li {
		position: relative;
		height: 230px;
		width: 160px;
		text-align: center;
		background: linear-gradient(0deg, #001F6D 0%, rgba(0, 31, 109, 0) 100%);
		box-sizing: border-box;
		padding-top: 16px;
		.jar {
			position: relative;
			width: 88px;
			height: 98px;
			background: url("/static/icons/jar.svg") no-repeat;
			background-size: 100% 100%;
			margin: 0 auto 16px;
			.jar-heart {
				position: absolute;
				top: 11px;
				left: 5px;
				width: 78px;
				height: 78px;
				border-radius: 50%;
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
				width: 78px;
				height: 78px;
				background: linear-gradient(to top, rgba(0,221,255,0), rgba(0,221,255,1));
			}
			.jar-num {
				z-index: 1;
				font-weight: bold;
				font-size: 32px;
				line-height: 32px;
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
	}
}
.chart-wrap {
	width: 100%;
	height: 100%;
	position: relative;
}
.chart {
	width: 100%;
	height: 100%;
	position: relative;
}
.x-axis {
	position: absolute;
	z-index: 999;
	top: 46.5%;
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
