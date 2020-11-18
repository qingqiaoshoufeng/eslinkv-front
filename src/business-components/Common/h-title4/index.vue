<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-4 text-center">
			<h2 class="font-num">{{data&&data.value.toLocaleString()}}</h2>
			<p>{{config.config&&config.config.title}}</p>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "@lib"

	const config = {
		animation: true,
		config: {
			title: true
		}
	}

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
			}
		},
	}

	const value = {
		api: {
			data: JSON.stringify({
				value: 99999
			})
		},
		config: {
			title: '标题'
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
	.h-title-4 {
		h2 {
			font-size: 40px;
			line-height: 48px;
			color: #FFFFFF;
		}

		p {
			font-size: 18px;
			line-height: 24px;
			color: #00DDFF;
		}
	}

</style>

