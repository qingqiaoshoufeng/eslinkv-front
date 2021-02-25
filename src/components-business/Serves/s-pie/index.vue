<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
		<div class="dot"></div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins';
	import getOption from './options';
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				const total = Number(this.data.value1) + Number(this.data.value2)
				const percent1 = ~~(this.data.value1 * 100 / total)
				const percent2 = 100-percent1
				this.instance && this.instance.setOption(getOption(this.data.value1, this.data.value2, this.config.config,percent1,percent2))
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption()
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configValue = this.parseConfigValue(value, customConfig);
		},
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
		background: url('/static/icons/ellipse-dashed.svg') no-repeat center;
		background-size: 128px 128px;
		position: relative;
	}

	.dot {
		width: 24px;
		height: 24px;
		background: #687692;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border-radius: 50%;
		z-index: 1;
	}

</style>

