<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-column h-hexagon">
			<h2>{{data&&data.value}}</h2>
			<p>{{data&&data.title}}</p>
		</div>
	</div>
</template>

<script>
	import {styleParser, widgetMixin} from '../../../../lib'

	export default {
		mixins: [widgetMixin],
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout)
			},
			mergedConfig() {
				if (!this.config.config) return false
				return {...this.config.config}
			}
		},
		created() {
			this.configSource = this.parseConfigSource({api: true})
			this.configValue = this.parseConfigValue({api: true}, {api: {data: {title: '标题', value: 0}}})
		}
	}
</script>
<style lang="scss">
	.h-hexagon {
		background-image: url('/static/icons/h-hexagon-1.png');
		background-size: 100%;
		background-repeat: no-repeat;
		height: 100%;
		align-items: center;
		justify-content: center;

		h2 {
			font-weight: bold;
			font-size: 40px;
			color: #fff;
			text-shadow: 0 0 6px #00DDFF;
		}

		p {
			color: #fff;
			font-size: 16px;
			margin-top: 12.4px;
		}
	}

</style>

