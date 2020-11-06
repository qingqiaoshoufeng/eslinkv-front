<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="legend-box">
			<div class="unit">台</div>
			<div class="legend">
				<div class="legend1">
                    <div class="bgc1" :style="`backgroundColor:${data&&data.color1};}`"></div>
                    <div class="desc1">{{data.desc1}}</div>
                </div>
				<div class="legend2">
                     <div class="bgc2" :style="`backgroundColor:${data&&data.color2};}`"></div>
                    <div class="desc2">{{data.desc2}}</div>
                </div>
			</div>
		</div>
		<div class="h-line-1" :id="id" />
	</div>
</template>
<script>
import mixins from '../../mixins';
import options from './options';

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
            color1:'#2C99FF',
            color2:'#01FDD2',
            desc1:'工商户',
            desc2:'居民户',
			title: '数量',
			yValue: [120, 200, 150, 80, 70, 110, 130],
			yValue1: [120, 200, 150, 80, 70, 110, 130],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
		}),
	},
};
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			options.xAxis.data = data.xValue;
			options.series[0].data = data.yValue;
			options.series[1].data = data.yValue1;
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
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.h-line-1 {
	height: 100%;
}
.legend-box {
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
        font-family: PingFang SC;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0px;
	}
	.legend {
        display: flex;
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
        .legend1,.legend2{
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
        .bgc1,.bgc2{
            width: 16px;
            height: 8px;
        }
        .desc1,.desc2{
            margin-left: 5px;
            font-family: PingFang SC;
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

