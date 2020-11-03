<template>
	<div class="h-tab-list" :style="styles">
		<h-tabs-base
			:source="tabSource"
			@tabClickEvt="tabClickEvt" />
		<h-list-base
			:source="listSource"
			@itemSelectedEvt="itemSelectedEvt" />
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import HTabsBase from './h-tabs-base';
	import HListBase from './h-list-base';
	import mixins from '../../mixins';
	const config = {};
	const value = {
		api: {
			data: JSONStringify({
				tabSource:{
					list: [
						{ name: '告警信息' },
						{ name: '点位列表' },
					],
					actived: 0
				},
				listSource: {
					list: [
						[
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
						],
						[
							{
								status: 1,
								alarmName: '撒打算撒啊色情饿请问请问',
								alarmNameType: '事件',
								alarmLocation: '三墩镇三墩街100号',
								time: '11-03  08:32:15',
								statusDesc: '已处理',
							},
							{
								status: 2,
								alarmName: '请问请问请问请问请问请问去',
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
						]
					],
					selected: 0
				},
			})
		}
	};
	export default {
		components: {
			HTabsBase,
			HListBase
		},
		mixins: [mixins],
		data(){
			return {
				listSource: {},
				tabSource: {}
			}
		},
		methods: {
			initData(){
				const data = this.data || {};
				const tabSource = data.tabSource || {};
				const listSource = data.listSource || {};
				const list = listSource.list || [];
				this.listSource = {
					list: list[tabSource && tabSource.actived] || [],
					selected: listSource && listSource.selected || 0
				}
				this.tabSource = tabSource;
			},
			tabClickEvt(args){
				const { index = '' } = args;
				const data = this.data;
				const listSource = data && data.listSource && data.listSource.list || [];
				this.listSource = {
					list: listSource[index] || [],
					selected: ''
				}
				this.tabSource.actived = index;
			},
			itemSelectedEvt(itemData = {}){
				const { index = '' } = itemData;
				this.listSource.selected = index;
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);

		},
		watch: {
			data: {
				handler() {
					this.initData();
				},
				deep: true,
				immediate: true
			}
		},

	}
</script>
<style lang="scss">
	.h-tab-list{

	}
</style>

