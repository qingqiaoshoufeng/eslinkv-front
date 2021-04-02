<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-line-1" :id="id" />
		<div class="pos-a h-line-1-title">
			{{ config.config && config.config.title }}
		</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import options from './options'
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	methods: {
		setOption(data) {
			options.series[0].data = data.value
			this.instance && this.instance.setOption(options)
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
<style lang="scss">
.h-line-1 {
	height: 100%;
}

.h-line-1-title {
	top: 0;
	left: 0;
	font-size: 16px;
	line-height: 16px;
	color: #fff;
}
</style>
