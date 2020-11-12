<template>
	<div class="widget-part" :style="styles" >
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
.widget-part {
	display: flex;
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

