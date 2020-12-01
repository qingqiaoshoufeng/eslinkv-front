<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-9">
			<p class="pos-r text-left">{{config.config&&config.config.title}}</p>
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
	.h-title-9 {
		background: linear-gradient(90deg, rgba(0, 87, 169, 0.4) 0%, rgba(0, 87, 169, 0) 100%);;
		height: 100%;

		p {
			font-weight: 600;
			font-size: 20px;
			line-height: 40px;
			color: #FFFFFF;
			padding-left: 12px;

			&:before {
				content: '';
				position: absolute;
				width: 4px;
				height: 40px;
				left: 0;
				top: 0;
				background: #00DDFF;
			}
		}
	}

</style>

