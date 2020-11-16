<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="legend-box">
      <div class="unit">{{config.config.unit}}</div>
      <div class="legend">
        <div class="legend1">
          <div class="bgc1" :style="`backgroundColor:${config.config.color1};}`"></div>
          <div class="desc1">{{config.config.desc1}}</div>
        </div>
        <div class="legend2">
          <div class="bgc2" :style="`backgroundColor:${config.config.color2};}`"></div>
          <div class="desc2">{{config.config.desc2}}</div>
        </div>
        <div class="legend2">
          <div class="bgc3" :style="`backgroundColor:${config.config.color3};}`"></div>
          <div class="desc3">{{config.config.desc3}}</div>
        </div>
      </div>
    </div>
		<div class="h-line-1" :id="id" />
	</div>
</template>
<script>
import mixins from '../../mixins';
import getOption from './options';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const config = {
  animation: true,
  config: {
    color1: true,
    color2: true,
    color3: true,
    desc1: true,
    desc2: true,
    desc3: true,
    unit: true,
  },
};
const value = {
	api: {
		data: JSON.stringify({
			yValue: [120, 200, 150, 80, 70, 110, 130],
			yValue1: [130, 400, 170, 100, 100, 110, 130],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
		})
	},
  config: {
    color1: '#0057A9',
    color2: '#00DDFF',
    color3: '#01FDD2',
    desc1: '已受理',
    desc2: '已办结',
    desc3: '办结率',
    unit: '单',
  }
}
const configSource = {
  config: {
    fields: {
      color1: getInput('color1', '外圈柱形图颜色'),
      color2: getInput('color2', '内圈柱形图颜色'),
      color3: getInput('color3', '折线图颜色'),
      desc1: getInput('desc1', '外圈柱形图名称'),
      desc2: getInput('desc2', '内圈柱形图名称'),
      desc3: getInput('desc3', '折线图名称'),
      unit: getInput('unit', '单位'),
    },
  },
}
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data, this.config.config))
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
<style lang="scss" scoped>
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
        left: 60%;
        width: 400px;
        transform: translate(-50%,0);
        .legend1,.legend2{
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
        .bgc1,.bgc2,.bgc3{
            width: 16px;
            height: 8px;
        }
        .desc1,.desc2,.desc3{
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

