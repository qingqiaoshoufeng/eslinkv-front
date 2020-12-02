<template>
	<div class="widget-part" :style="styles" v-if="data">
    <img :src="config.config.icon">
    <div class="gas-main">
      <div class="gas-info">
        <div class="gas-title">{{ config.config.title }}</div>
        <div class="gas-num font-num"><em>{{ data.value / 10000 | toThousand }}</em> {{ config.config.unit }}</div>
      </div>
      <div class="gas-progress">
        <div class="progress" :style="{width: data.percent + '%'}"></div>
      </div>
    </div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput, getSelect} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
        unit: getInput('unit', '单位'),
        icon: getSelect('icon', 'icon', ['/static/images/home/gas-use1.svg', '/static/images/home/gas-use2.svg', '/static/images/home/gas-use3.svg']),
			}
		}
	}
	const config = {
		animation: true,
		config: {
      title: true,
      unit: true,
      icon: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
        value: 1233556,
        percent: 60
      })
		},
		config: {
      title: '居民户',
			icon: '/static/images/home/gas-use1.svg',
			unit: '万m³',
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
    display: flex;
    align-items: center;
    > img {
      width: 56px;
      height: 56px;
      margin-right: 16px;
    }

    .gas-main {
      flex: 1;
    }

    .gas-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .gas-title {
        font-size: 24px;
        line-height: 24px;
        color: #fff;
      }

      .gas-num {
        font-size: 18px;
        line-height: 24px;
        color: #FFFFFF;

        em {
          font-weight: bold;
          font-size: 32px;
          line-height: 32px;
          font-style: normal;
        }
      }
    }
	}

  .gas-progress {
    height: 16px;
    background: #0057A9;
    padding: 4px 4px;
    margin-top: 10px;

    .progress {
      width: 260px;
      height: 8px;
      background: #00FFCF;
    }
  }
</style>

