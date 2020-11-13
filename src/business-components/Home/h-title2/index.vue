<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-column h-title-2">
			<h2>{{data&&data.value}}</h2>
			<p>{{config.config&&config.config.title}}</p>
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
			}
		}
	}
	const config = {
		animation: true,
		config: {
			title: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
				value: 0
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
	.h-title-2 {
		background-image: url('/static/icons/h-title2-1.svg');
		background-size: 100%;
		background-repeat: no-repeat;
		height: 100%;
		align-items: center;
		justify-content: center;

		h2 {
			font-weight: bold;
			font-size: 40px;
			line-height: 40px;
			color: #fff;
			text-shadow: 0 0 6px #00DDFF;
		}

		p {
			color: #fff;
			font-size: 16px;
			line-height: 16px;
			margin-top: 12.4px;
		}
	}

</style>

