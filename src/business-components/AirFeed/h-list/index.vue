<template>
	<div class="h-list" :style="styles">
		<h-list-item
			v-for="(source, index) in (data && data.list || [])"
			:key="index"
			:data="source"
			:selected="data.selected === index"
			@click.native="() => clickItemEvt(index, source)"></h-list-item>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	import HListItem from './HListItem';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				list: [
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 2,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				}
			],
				selected: 1
			})
		}
	}
	export default {
		components: {
			HListItem
		},
		mixins: [mixins],
		props: {
			source: {
				type: Object,
				default: () => ({
					list: [],
					selected: 0
				})
			}
		},
		methods: {
			clickItemEvt(index, data = {}){
				this.data.selected = index;
				this.$emit('itemSelectedEvt', { index, data })
			}
		},
		data(){
			return {
				seletedIndex: config.defaultSelected
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);

		},
	}
</script>
<style lang="scss">

</style>

