<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-10 fn-flex flex-row">
			<h2>{{config.config&&config.config.title}}</h2>
			<p class="font-num">{{data&&data.value|toThousand}}</p>
			<span>{{config.config&&config.config.suffix}}</span>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from '../../../../lib'

	const config = {
		animation: true,
		config: {
			suffix: true,
			title: true
		}
	}

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
				suffix: getInput('suffix', '后缀'),
			}
		},
	}

	const value = {
		config: {
			title: '昨日用气量：',
			suffix: 'm³',
		},
		api: {
			data: JSON.stringify({
				value: 3320
			})
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
	.h-title-10 {
		height: 100%;
		align-items: center;

		h2 {
			font-size: 24px;
			line-height: 24px;
			color: #00DDFF;
			font-weight: normal;
		}

		p {
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
			margin-left: 8px;
			margin-right: 4px;
		}

		span {
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
		}
	}

</style>

