<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-title">
			<div class="h-title-icon"/>
			<h2>{{data}}</h2>
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
			this.configValue = this.parseConfigValue({api: true}, {api: {data: '标题'}})
		}
	}
</script>
<style lang="scss">
	.h-title-icon {
		background-image: url('/static/icons/d-title-1.png');
		height: 34px;
		width: 34px;
		margin-right: 9px;
	}

	.h-title {
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);

		h2 {
			font-weight: 600;
			font-size: 24px;
			color: #fff;
		}
	}

</style>

