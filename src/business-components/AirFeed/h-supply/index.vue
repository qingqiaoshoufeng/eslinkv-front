<template>
	<div class="widget-part" :style="styles">
		<div class="container">
      <div class="main">
        <div class="item" v-for="(k, i) in 9">
          <div class="title">主城区 37,428</div>
          <div class="bar"></div>
        </div>
        <div class="unit">单位：万m³</div>
      </div>
      <div class="outside">
        <h5>主城区外供量</h5>
        <div class="sub">
          <div class="sub-item" v-for="k in 12">
            <div class="sub-item-rank font-num"></div>
            <div class="sub-detail">
              <div class="sub-title">星桥站</div>
              <div class="sub-num">4654</div>
              <div class="sub-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { getInput, getSelect } from '../../../../lib';
const config = {
	animation: true,
	config: {
		icon: true,
		desc: true,
	},
};
const configSource = {
	config: {
		fields: {
			icon: getSelect('icon', 'icon', [
				'/static/icons/phone-border.svg',
				'/static/icons/h-icon-info-desc-1.svg',
			]),
			desc: getInput('desc', '描述'),
		},
	},
};
const value = {
	// api: {
	// 	data: JSON.stringify({}),
	// },
	config: {
		icon: '/static/icons/h-icon-info-desc-1.svg',
		desc: '热线服务业务受理分析(次)',
	},
};
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  .main {
    width: 215px;
    border-right: 1px dashed rgba(255, 255, 255, 0.4);
    .item {
      width: 200px;
      height: 45px;
      background: #0057A9;
      padding: 4px;
      margin-bottom: 8px;
      .title {
        font-size: 18px;
        line-height: 24px;
        color: #FFFFFF;
        margin-bottom: 4px;
      }
      .bar {
        width: 192px;
        height: 8px;
        background: #00FFCF;
      }
    }
    .unit {
      font-size: 18px;
      line-height: 24px;
      color: #00DDFF;
      text-align: left;
    }
  }
  .outside {
    h5 {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #00DDFF;
      padding-top: 8px;
      margin-bottom: 16px;
    }
    .sub {
      display: flex;
      flex-wrap: wrap;
      .sub-item {
        display: flex;
        width: 120px;
        height: 64px;
        background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.3) 100%);
        margin-bottom: 8px;
        &:nth-child(2n+1) {
          margin-right: 8px;
        }
        .sub-item-rank {
          background: #2194FF;
          width: 24px;
          height: 24px;
          font-weight: bold;
          font-size: 24px;
          line-height: 24px;
          color: #FFFFFF;
          margin-right: 4px;
        }
        .sub-detail {
          font-size: 18px;
          line-height: 24px;
          color: #F9F9F9;
          .sub-title {
            margin-bottom: 8px;
          }
          .sub-bar {
            width: 92px;
            height: 2px;
            background: #00DDFF;
          }
        }
      }
    }
  }
}
</style>

