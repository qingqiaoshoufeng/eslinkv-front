<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="a-legend-box">
			<div class="unit">{{ title && title }}</div>
			<div class="legend">
				<div class="legend1">
					<div
						class="bgc1"
						:style="`backgroundColor:${colorList[0]};}`"
					></div>
					<div class="desc1">{{ descList[0] }}</div>
				</div>
				<div class="legend2">
					<div
						class="bgc2"
						:style="`backgroundColor:${colorList[1]};}`"
					></div>
					<div class="desc2">{{ descList[1] }}</div>
				</div>
				<!-- <div class="legend2">
                     <div class="bgc3" :style="`backgroundColor:${data&&data.color3};}`"></div>
                    <div class="desc3">{{data&&data.desc3}}</div>
                </div> -->
			</div>
		</div>
		<div class="h-line-1" :id="id" />
	</div>
</template>
<script>
import mixins from '../../mixins';
import options from './options';
import { config, configSource, value } from './index.component'

export default {
	mixins: [mixins],
	computed: {
		colorList() {
			if (!this.data) return ['#00DDFF', 'rgba(1,253,210,1)'];
			return [this.config.config.color1, this.config.config.color2];
		},
		descList() {
			if (!this.data) return ['第三方破坏', '同比'];
			return [this.config.config.desc1, this.config.config.desc2];
		},
		title() {
			if (!this.data) return '';
			return this.config.config.title;
		},
	},
	methods: {
		setOption(data) {
			let yValue2 = this.data.yValue.map(
				(item, index) =>
					(this.data.yValue[index] / this.data.yValue1[index]) * 100
			);
			options.xAxis[0].data = data.xValue;
			options.series[1].data = data.yValue;
			options.series[0].data = data.yValue1;
			// options.series[2].data = yValue2
			console.log(yValue2);
			// options.series[0].itemStyle.normal.color = data.color1;
			options.series[1].itemStyle.normal.color = data.color2;
			this.instance && this.instance.setOption(options);
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val };
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption(data);
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
	},
};
</script>
<style lang="scss" scope>
.h-line-1 {
	height: 100%;
}
.a-legend-box {
	width: 100%;
	height: 20px;
	display: flex;
	align-items: center;
	position: absolute;
	top: 10px;
	left: 0;
	.unit {
		width: 30px;
		text-align: right;
		color: #fff;
		//styleName: 文字/16;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0px;
	}
	.legend {
		display: flex;
		position: absolute;
		left: 0;
		width: 100%;
		align-items: center;
		justify-content: center;
		.legend1,
		.legend2 {
			display: flex;
			align-items: center;
			margin-left: 20px;
		}
		.bgc1,
		.bgc2,
		.bgc3 {
			width: 16px;
			height: 8px;
		}
		.bgc2 {
			height: 2px;
		}
		.desc1,
		.desc2,
		.desc3 {
			margin-left: 5px;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0px;
			color: #fff;
		}
	}
}
</style>

