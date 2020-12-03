<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="item" v-for="(k, i) in data.list" :key="i">
      <div class="num font-num">{{ k.percent }}%</div>
      <div class="bar-wrap">
        <div class="bar" :style="{top: `${100 - k.percent}%`}"></div>
      </div>
      <p class="txt">{{ k.txt }}</p>
    </div>
	</div>
</template>
<script>
import mixins from '../../mixins'

const config = {
  animation: true
};
const value = {
	api: {
		data: JSON.stringify({
      list: [
        {
          percent: 79,
          txt: '看图文'
        },
        {
          percent: 2,
          txt: '19服务厅'
        },
        {
          percent: 3,
          txt: '集团概况'
        },
        {
          percent: 12,
          txt: '温度管家'
        },
        {
          percent: 1,
          txt: '品质杭燃'
        },
        {
          percent: 3,
          txt: '微友互动'
        }
      ]
    })
	}
}
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.widget-part {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item {
    .num {
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .bar-wrap {
      position: relative;
      width: 16px;
      height: 136px;
      margin: 0 auto;
      background: #0057A9;
      .bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: #00ddff;
      }
    }
    .txt {
      font-size: 16px;
      line-height: 16px;
      color: #00DDFF;
      margin-top: 8px;
    }
  }
}
</style>

