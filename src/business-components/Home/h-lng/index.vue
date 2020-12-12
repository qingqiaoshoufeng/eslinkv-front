<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="kuo"></div>
    <div class="list">
      <div class="item">
        <h3>{{ config.config.desc1 }}</h3>
        <p>{{ data.value1 | toThousand }}</p>
      </div>
      <div class="item">
        <h3>{{ config.config.desc2 }}</h3>
        <p>{{ data.value2 | toThousand }}</p>
      </div>
    </div>
	</div>
</template>

<script>
	import mixins from '../../mixins'
  import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

	const config = {
	  animation: true,
		config:{
			desc1: true,
			desc2: true
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
			  value1: 53366,
        value2: 23656
			})
		},
    config: {
      desc1: '今日LNG气化量m³',
      desc2: '今日LNG加气量m³'
    }
	}
  const configSource = {
    config: {
      fields: {
        desc1: getInput('desc1', '描述1'),
        desc2: getInput('desc2', '描述2')
      }
    }
  }
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
.widget-part {
  .kuo {
    width: 185px;
    height: 32px;
    background: url("./img/kuohao.svg") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .list {
    display: flex;
    justify-content: space-between;
    .item {
      width: 178px;
      height: 80px;
      background: rgba(0, 87, 169, 0.3);
      padding-top: 8px;
      border-top: 1px solid #00DDFF;
      >h3 {
        font-weight: normal;
        font-size: 20px;
        line-height: 24px;
        color: #00DDFF;
      }
      >p {
        font-family: font-num;
        font-weight: bold;
        font-size: 28px;
        line-height: 28px;
        color: #FFFFFF;
        margin-top: 11px;
      }
    }
  }
}
</style>

