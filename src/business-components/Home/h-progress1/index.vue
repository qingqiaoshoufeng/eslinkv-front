<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="fn-flex flex-row h-progress-1">
			<div class="fn-flex flex-column">
				<h2>{{config.config.title}}</h2>
				<h3>{{data.value | toThousand }}<span class="unit">{{config.config.unit}}</span></h3>
			</div>
			<p class="font-num">{{data.percent}}%</p>
			<div class="pos-a h-progress-1-ratio">
				<i class="pos-a" :style="{width:`${data.percent}%`}"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
        unit: getInput('unit', '单位'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			title: true,
      unit: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
				value: 2345,
        percent: 88
			})
		},
		config: {
			title: '标题',
      unit: '单',
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
<style lang="scss">
	.h-progress-1-ratio {
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		left: 0;
		bottom: 0;
		width: 100%;

		i {
			height: 4px;
			top: 0;
			left: 0;


			&:before {
				content: '';
				position: absolute;
				width: 100%;
				height: 4px;
				top: 0;
				left: 0;
				background: linear-gradient(270deg, #00DDFF 1.23%, rgba(0, 221, 255, 0.2) 100%);
			}
		}
	}

	.h-progress-1 {
		padding-bottom: 8px;

    h2 {
      font-size: 18px;
      line-height: 24px;
      color: #00DDFF;
      text-align: left;
      word-wrap: break-word;
      white-space: nowrap;
    }

		h3 {
      font-family: font-num;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      color: #FFFFFF;
			margin-top: 4px;
      text-align: left;
      word-wrap: break-word;
      white-space: nowrap;
      .unit {
        font-family: inherit;
        font-size: 16px;
        line-height: 16px;
        color: rgba(255, 255, 255, 0.75);
      }
		}

		p {
			color: #fff;
			font-weight: bold;
			font-size: 48px;
			line-height: 48px;
			margin-left: auto;
		}
	}

</style>

