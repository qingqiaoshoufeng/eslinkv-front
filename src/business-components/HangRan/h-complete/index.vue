<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-complete">
			<div class="fn-flex flex-column">
				<h2>{{data&&data.title}}</h2>
				<h3>{{data&&data.subTitle}}</h3>
			</div>
			<p>{{data&&data.sum}}%</p>
			<div class="pos-a h-complete-ratio"></div>
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
			this.configValue = this.parseConfigValue({api: true}, {
				api: {
					data: {title: '标题', subTitle: '副标题', sum: 10}
				}
			})
		}
	}
</script>
<style lang="scss">
	.h-complete-ratio {
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		left: 0;
		bottom: 0;
	}

	.h-complete {
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);

		h2, h3 {
			font-size: 18px;
			color: rgba(255, 255, 255, 0.75);
			font-weight: normal;
			line-height: 18px;
		}

		h3 {
			margin-top: 12px;
		}

		p {
			color: #fff;
			font-weight: bold;
			font-size: 48px;
			line-height: 48px;
			margin-left: 56px;
		}
	}

</style>

