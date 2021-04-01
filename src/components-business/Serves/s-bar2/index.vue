<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="legend-box2">
			<div class="unit">{{ config.config.title }}</div>
			<div class="legend">
				<div class="legend1">
					<div class="bgc1" :style="`backgroundColor:${config.config.color1};}`"></div>
					<div class="desc1">{{ config.config.desc1 }}</div>
				</div>
				<div class="legend2">
					<div class="bgc2" :style="`backgroundColor:${config.config.color2};}`"></div>
					<div class="desc2">{{ config.config.desc2 }}</div>
				</div>
			</div>
		</div>
		<div class="h-line-1" :id="id" />
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import getOption from './options'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [widgetMixin],
		methods: {
			setOption (data) {
				this.instance && this.instance.setOption(getOption(this.data, this.config.config))
			}
		},
		watch: {
			data: {
				handler (val) {
					if (this.id) {
						const data = { ...val }
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							)
							this.setOption(data)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
.h-line-1 {
	height: 100%;
}

.legend-box2 {
	position: absolute;
	top: 10px;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 20px;

	.unit {
		width: 30px;
		//styleName: 文字/16;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px;
		color: #fff;
		text-align: right;
		letter-spacing: 0;
	}

	.legend {
		position: absolute;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

		.legend1,
		.legend2 {
			display: flex;
			align-items: center;
			margin-left: 20px;
		}

		.bgc1,
		.bgc2,
		.bgc3 {
			width: 16px;
			height: 8px;
		}

		.bgc3 {
			height: 2px;
		}

		.desc1,
		.desc2,
		.desc3 {
			margin-left: 5px;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 16px;
			color: #fff;
			letter-spacing: 0;
		}
	}
}
</style>

