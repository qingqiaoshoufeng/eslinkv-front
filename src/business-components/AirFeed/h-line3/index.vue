<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';

	const config = {
		animation: true
	};
	const value = {
		api: {
			data: JSON.stringify([
        {
          x: '13:00',
          y1: 3.16,
          y2: 0.345,
        },
        {
          x: '14:00',
          y1: 3.12,
          y2: 0.335,
        },
        {
          x: '15:00',
          y1: 3.15,
          y2: 0.330,
        },
        {
          x: '16:00',
          y1: 3.17,
          y2: 0.325
        },
        {
          x: '17:00',
          y1: 3.16,
          y2: 0.329,
        },
        {
          x: '18:00',
          y1: 3.2,
          y2: 0.336,
        },
        {
          x: '19:00',
          y1: 3.14,
          y2: 0.35,
        },
        {
          x: '20:00',
          y1: 3.16,
          y2: 0.34,
        }
      ])
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data))
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
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>

