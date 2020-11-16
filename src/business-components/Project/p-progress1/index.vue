<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-curve-1" :id="id" />
		<!-- <div class="pos-a h-curve-1-title">{{data&&data.title}}</div> -->
	</div>
</template>
<script>
import mixins from '../../mixins';
import options from './options';

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			value: [
				{
					name: '公建户工程',
					itemStyle: {
						color: '#fc853e',
					},
				},
				{
					name: '改管工程',
					itemStyle: {
						color: '#fc853e',
					},
				},
				{
					name: '民用户工程',
					itemStyle: {
						color: '#fc853e',
					},
				},
				{
					name: '干线工程',
					itemStyle: {
						color: '#fc853e',
					},
				},
				{
					name: '场站工程',
					itemStyle: {
						color: '#fc853e',
					},
				},
				{
					name: 'a1',
				},
				{
					name: 'a2',
				},
				{
					name: 'b1',
				},
				{
					name: 'c',
				},
			],
			links: [
				{
					source: '公建户工程',
					target: 'b1',
					value: 1,
					lineStyle: {
						color: "'#314656'",
					},
				},
				{
					source: '改管工程',
					target: 'b1',
					value: 1,
					lineStyle: {
						color: "'#314656'",
					},
				},
				{
					source: '民用户工程',
					target: 'b1',
					value: 1,
					lineStyle: {
						color: "'#314656'",
					},
				},
				{
					source: '干线工程',
					target: 'b1',
					value: 1,
					lineStyle: {
						color: "'#314656'",
					},
				},
				{
					source: '场站工程',
					target: 'b1',
					value: 1,
					lineStyle: {
						color: "'#314636'",
					},
				},
				{
					source: 'b1',
					target: 'a2',
					value: 1,
				},
				{
					source: 'b',
					target: 'b1',
					value: 1,
					lineStyle: {
						color: "'#332156'",
					},
				},
				{
					source: 'b1',
					target: 'a1',
					value: 1,
					lineStyle: {
						color: "'#344656'",
					},
				},
				{
					source: 'b1',
					target: 'c',
					value: 1,
					lineStyle: {
						color: "'#317656'",
					},
				},
			],
		}),
	},
};
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			options.series.data = data.value;
			options.series.links = data.links;
			this.instance && this.instance.setOption(options);
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val };
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption(data);
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
<style lang="scss">
.h-curve-1 {
	height: 100%;
}

.h-curve-1-title {
	font-size: 16px;
	color: #fff;
	line-height: 16px;
	top: 0;
	left: 0;
}
</style>

