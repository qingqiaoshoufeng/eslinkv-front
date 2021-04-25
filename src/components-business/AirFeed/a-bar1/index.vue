<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="a-legend-box">
			<div class="unit">{{ title && title }}</div>
			<div class="legend">
				<div class="legend1">
					<div
						class="bgc1"
						:style="`backgroundColor:${colorList[0]};}`"
					></div>
					<div class="desc1">{{ descList[0] }}</div>
				</div>
				<div class="legend2">
					<div
						class="bgc2"
						:style="`backgroundColor:${colorList[1]};}`"
					></div>
					<div class="desc2">{{ descList[1] }}</div>
				</div>
			</div>
		</div>
		<div class="a-bar1" :id="id" />
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import getOption from './options'
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	computed: {
		colorList() {
			if (!this.data) return ['#00DDFF', 'rgba(1,253,210,1)']
			return [this.config.config.color1, this.config.config.color2]
		},
		descList() {
			if (!this.data) return ['第三方破坏', '同比']
			return [this.config.config.desc1, this.config.config.desc2]
		},
		title() {
			if (!this.data) return ''
			return this.config.config.title
		},
	},
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(data))
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val }
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id),
						)
						this.setOption(data)
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss" scoped>
.a-bar1 {
	height: 100%;
}

.a-legend-box {
	position: absolute;
	top: 10px;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 20px;

	.unit {
		width: 30px;
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

		.bgc2 {
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
